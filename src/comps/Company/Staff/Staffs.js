import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import stylo from '../../../assets/design/stylez'
import { Edit } from './Edit'
import { Staff } from './Staff'

export const Staffs = props => {

    const [page, setPage] = useState('')

    const id = props.company.id

    const List = () => {

        const [staffs, setStaffs] = useState('')
        const [item, setItem] = useState('')

        useEffect(() => {
            const fetchStaffs = () => {
                Axios.get(`http://localhost:5000/company/${id}/staffs`)
                .then(result => {
                    setStaffs(result.data)
                })
                .catch(error => {
                    console.log(error)
                })
            }
    
            fetchStaffs()
        }, [])

        const enterInfo = data => {
            setItem(data)
        }

        if(item) {
            return <Staff setItem={setItem} staffInfo={item} />
        }
        return (
            <div>
                <div className="bg-green-500 text-white rounded p-4 mb-4">
                    <svg onClick={() => setPage('add')} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                {
                    staffs.length === 0 ?
                    <h3>Ажилчин байхгүй байна</h3>
                    :
                    <div className="grid grid-cols-3 gap-x-4">
                        {
                            staffs.map(stf => (
                                <div className="bg-green-500 text-white font-bold rounded p-4 bg-white shadow mb-4" key={stf.id}>
                                    <div>{stf.fathername.substring(0, 1)}.{stf.givenname}</div>
                                    <div className="text-sm py-2 border-b border-gray-200">{stf.description}</div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs py-1">{stf.email}</div>
                                            <div className="text-xs">{stf.phone}</div>
                                        </div>
                                        <svg onClick={() => enterInfo(stf)} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        )
    }

    const Add = () => {

        const [errormsg, setErrorMsg] = useState('')
        const [staff, setStaff] = useState({
            fathername: "",
            givenname: "",
            email: "",
            phone: "",
            address: "",
            description: "",
            password: ""
        })
    
        const handleChange = (evt) => {
            const value = evt.target.value;
            setStaff({
              ...staff,
              [evt.target.name]: value
            });
        }
    
        const storage = localStorage.getItem('company')
        const parsed = JSON.parse(storage)
        const { id } = parsed.company
    
        const sendData = e => {
            e.preventDefault()
            
            if(staff["fathername"] === "" || staff["fathername"] < 2) {
                return setErrorMsg('Эцгийн нэрийг бүрэн оруулна уу')
            }
            if(staff["givenname"] === "" || staff["givenname"] < 2) {
                return setErrorMsg('Өөрийн нэрийг бүрэн оруулна уу')
            }
            if(staff["email"] === "" || staff["email"] < 2) {
                return setErrorMsg('Имэйлийг бүрэн оруулна уу')
            }
            if(staff["phone"] === "" || staff["phone"] < 8) {
                return setErrorMsg('Утасны дугаарыг бүрэн оруулна уу')
            }
            if(staff["address"] === "") {
                return setErrorMsg('Хаягийг бүрэн оруулна уу')
            }
            if(staff["description"] === "" || staff["description"] < 3) {
                return setErrorMsg('Цол, тайлбарыг бүрэн оруулна уу')
            }
            if(staff["password"] === "" || staff["password"] < 8) {
                return setErrorMsg('Нууц үгийг бүрэн оруулна уу')
            }
    
            Axios.post(`http://localhost:5000/company/${id}/create-staff`, staff)
            .then(result => {
                setPage('list')
            })
            .catch(error => {
                console.log(error)
            })
        }
    
        return (
            <div>
                <div className="bg-green-500 text-white rounded p-4 mb-4">
                    <svg onClick={() => setPage('list')} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                </div>
                {
                    errormsg ?
                    <div className="fixed flex flex-col items-center justify-center bg-black bg-opacity-50 top-0 left-0 bottom-0 right-0">
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div>
                                {errormsg}
                            </div>
                            <div className="mt-6">
                                <button className={stylo.button.small} onClick={() => setErrorMsg('')}>
                                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-green-500 text-2xl mb-4">Ажилтан бүртгэх</h3>
                    <form onSubmit={sendData} className="flex flex-col w-80">
                        <input className={stylo.input} onChange={handleChange} value={staff["fathername"]} name="fathername" placeholder="Эцэг(эх)-ийн нэр" />
                        <input className={stylo.input} onChange={handleChange} value={staff["givenname"]} name="givenname" placeholder="Өөрийн нэр" />
                        <input className={stylo.input} onChange={handleChange} value={staff["email"]} name="email" placeholder="Имэйл хаяг" />
                        <input className={stylo.input} onChange={handleChange} value={staff["phone"]} name="phone" placeholder="Утасны дугаар" />
                        <input className={stylo.input} onChange={handleChange} value={staff["address"]} name="address" placeholder="Хаяг" />
                        <input className={stylo.input} onChange={handleChange} value={staff["description"]} name="description" placeholder="Цол, тайлбар" />
                        <input className={stylo.input} onChange={handleChange} value={staff["password"]} name="password" placeholder="Нууц үг" />
                        <small className="text-xs">Нууц үг нь тоо болон үсгээс бүрдсэн 8 буюу түүнээс багагүй оронтой байна.</small>
                        <div className="text-center">
                            <input className={stylo.button.big} type="submit" value="НЭМЭХ" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const indicator = () => {

        if(page === '') {
            setPage('list')
        }

        switch(page) {
            case 'list':
                return <List />
            case 'add':
                return <Add />
            case 'edit':
                return <Edit />
            default: <List />
        }
    }

    return (
        <div>
            {
                indicator()
            }
        </div>
    )
}

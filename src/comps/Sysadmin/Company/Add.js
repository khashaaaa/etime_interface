import React from 'react'
import Axios from 'axios'
import stylo from '../../../assets/design/stylez'

export const Add = props => {

    let formdata = {
        reg: "",
        name: "",
        email: "",
        address: "",
        phone: "",
        password: ""
    }

    let creds = localStorage.getItem('systems_admin')
    let parsed = JSON.parse(creds)
    let sysadminID = parsed.sysadmin.id

    const postData = e => {
        e.preventDefault()
        Axios.post(`http://localhost:5000/sysadmin/${sysadminID}/create-company`, formdata)
        .then(result => {
            props.setLoad(true)
            props.setComp('list')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className="flex justify-center p-4 bg-gray-800">
                <svg onClick={() => props.setComp('list')} className="mr-4 stroke-current w-8 h-8 text-green-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <svg className="stroke-current w-8 h-8 text-green-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
            </div>

            <form onSubmit={postData} className="flex flex-col items-center justify-center text-center p-4">
                <div className="grid grid-cols-2 gap-x-4 mt-4">
                    <input className={stylo.input} placeholder="РД" onChange={e => formdata["reg"] = e.target.value} />
                    <input className={stylo.input} placeholder="нэр" onChange={e => formdata["name"] = e.target.value} />
                    <input className={stylo.input} placeholder="имэйл" onChange={e => formdata["email"] = e.target.value} />
                    <input className={stylo.input} placeholder="хаяг" onChange={e => formdata["address"] = e.target.value} />
                    <input className={stylo.input} placeholder="утас" onChange={e => formdata["phone"] = e.target.value} />
                    <input className={stylo.input} placeholder="нууц үг" onChange={e => formdata["password"] = e.target.value} />
                </div>
                <button className={stylo.button.big} type="submit">НЭМЭХ</button>
            </form>
        </div>
    )
}

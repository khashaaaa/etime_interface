import React, { useState } from 'react'
import Axios from 'axios'
import './Company.scss'

import { Company } from './Company'
import { Add } from './Add'
import { Edit } from './Edit'

export const Companies = props => {

    const [comp, setComp] = useState('')
    const [load, setLoad] = useState(true)
    const [item, setItem] = useState([])
    const [id, setID] = useState('')

    let creds = localStorage.getItem('systems_admin')
    let parsed = JSON.parse(creds)
    let sysadminID = parsed.sysadmin.id

    if(comp === '') {
        setComp('list')
    }

    if(load === true) {
        Axios.get(`http://localhost:5000/sysadmin/${sysadminID}/companies`)
        .then(result => {
            let data = result.data
            props.setCompanies(data)
            setItem(data)
            setLoad(false)
        })
        .catch(error => {
            console.log(error)
            setLoad(false)
        })
        return setLoad(false)
    }

    const indicator = () => {
        switch(comp) {
            case 'list':
                return <List list={props} setComp={setComp} />
            case 'company':
                return <Company setComp={setComp} />
            case 'add':
                return <Add setLoad={setLoad} setComp={setComp} />
            case 'edit':
                return <Edit id={id} setLoad={setLoad} setComp={setComp} />
            default: 'list'
        }
    }

    const List = props => {

        const list = props.list.companies

        const removeItem = data => {
            Axios.delete(`http://localhost:5000/sysadmin/${sysadminID}/${data}/remove`)
            .then(result => {
                setLoad(true)
                props.list.setCompanies(item)
            }).catch(error => {
                console.log(error)
            })
        }

        return (
            <div>
                <div className="flex justify-center p-4 bg-gray-800">
                    <svg onClick={() => props.setComp('add')} className="mr-4 stroke-current w-8 h-8 text-green-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <svg className="stroke-current w-8 h-8 text-green-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                </div>
                {
                    list == 0 ?
                    <h1 className="text-center text-gray-500 my-8">Байгууллага байхгүй байна</h1>
                    :
                    list.map(co => (
                        <div key={co.id} className="company p-4 border-b-2 border-gray-200">
                            <div>{co.reg}</div>
                            <div>{co.name}</div>
                            <div>{co.email}</div>
                            <div>{co.address}</div>
                            <div>{co.phone}</div>
                            <div className="actions">
                                <svg onClick={() => (setID(co.id), setComp('edit'))} className="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <svg onClick={() => removeItem(co.id)} className="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div>
            {
                indicator()
            }
        </div>
    )
}

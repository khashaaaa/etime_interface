import React, { useState, useEffect } from 'react'
import { Add } from '../Service/Add'

export const Staff = props => {
    
    const [staff, setStaff] = useState('')
    const [page, setPage] = useState('')

    useEffect(() => {
        setStaff(props.staffInfo)
    }, [])

    let created = staff["created"]
    let datez = []
    for(var key in created) {
        datez.push(created[key])
    }

    if(page === 'addservice') {
        return <Add staff={staff} />
    }

    return (
        <div>
            <div className="bg-green-500 text-white rounded p-4 mb-4">
                <svg onClick={() => props.setItem('')} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
            </div>
            <div className="bg-green-500 text-white rounded p-4">
                <div className="text-center mb-4">
                    <div className="font-bold">{staff["fathername"]} овогтой {staff["givenname"]}</div>
                    <div className="text-sm">{staff["description"]}</div>
                </div>
                <div className="border-b border-gray-200 p-4 text-sm">
                    <div>Имэйл: {staff["email"]}</div>
                    <div>Утас: {staff["phone"]}</div>
                    <div>Хаяг: {staff["address"]}</div>
                    <div>Үүссэн: {datez[0]} оны {datez[1]} сарын {datez[3]}</div>
                </div>
                <div className="flex items-center justify-around p-4">
                    <svg onClick={() => setPage('addservice')} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <svg className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <svg className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './Profile.scss'
import { Home } from './Home'
import { Staffs } from '../Staff/Staffs'
import { Services } from '../Service/Services'

export const Profile = props => {

    const [company, setCompany] = useState('')
    const [page, setPage] = useState('')
    
    let data = localStorage.getItem('company')
    let parsed = JSON.parse(data)
    let { id } = parsed.company

    useEffect(() => {
        if(page === '') {
            setPage('staff')
        }
        const loadComp = () => {
            Axios.get(`http://localhost:5000/company/${id}/profile`)
            .then(result => {
                setCompany(result.data)
            })
        }

        if(data) {
            loadComp()
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('company')
        sessionStorage.removeItem('current_page')
        props.setComponent('login')
    }

    const indicator = () => {

        switch(page) {
            case 'home':
                return <Home />
            case 'staff':
                return <Staffs company={company} />
            case 'service':
                return <Services />
            default: <Home />
        }
    }

    return (
        <div className="profile">
            <div className="side h-screen bg-gray-800 text-white">
                <div className="top">
                    <div className="head p-4 flex justify-between items-center border-b-2 border-gray-600">
                        <h3 onClick={() => setPage('home')} className="cursor-pointer">{company["name"]}</h3>
                        <svg onClick={logout} className="w-6 h-6 stroke-current cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>

                    <div className="info border-b-2 border-gray-600">
                        <div className="flex justify-between items-center p-4">
                            <p>Бүртгэгдсэн</p>
                            <p>2020-11-20</p>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <p>Системд нэвтэрсэн</p>
                            <p>2020-11-25</p>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <p>Хуваарилсан үйлчилгээ</p>
                            <p>423</p>
                        </div>
                    </div>
                </div>
                <div className="mid">
                    <div className="flex items-center justify-between p-4 border-b border-gray-600">
                        <p>Ажилчин</p>
                        <div className="flex items-center justify-between w-20">
                            <span className="border-2 border-yellow-600 rounded bg-yellow-400 px-2">23</span>
                            <svg onClick={() => setPage('staff')} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border-b border-gray-600">
                        <p>Үйлчилгээ</p>
                        <div className="flex items-center justify-between w-20">
                            <span className="border-2 border-blue-600 rounded bg-blue-400 px-2">58</span>
                            <svg onClick={() => setPage('service')} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <p>Үйлчлүүлэгч</p>
                        <div className="flex items-center justify-between w-20">
                            <span className="border-2 border-purple-600 rounded bg-purple-400 px-2">42</span>
                            <svg onClick={() => setPage('client')} className="w-8 h-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="bot p-4 fixed bottom-0">

                </div>
            </div>

            <div className="main m-4">
                {
                    indicator()
                }
            </div>
        </div>
    )
}

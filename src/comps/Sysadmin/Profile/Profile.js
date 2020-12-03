import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Profile.scss'

import { Home } from './Home'
import { Companies } from '../Company/Companies'
import { Service } from '../Service/Service'
import { Staff } from '../Staff/Staff'
import { Client } from '../Client/Client'
import { Info } from './Info'

export const Profile = props => {

    const [comp, setComp] = useState('')
    const [data, setData] = useState('')
    const [companies, setCompanies] = useState([])

    if(comp === 'home') {
        sessionStorage.setItem('current_comp', comp)
    }
    if(comp === 'company') {
        sessionStorage.setItem('current_comp', comp)
    }
    if(comp === 'service') {
        sessionStorage.setItem('current_comp', comp)
    }
    if(comp === 'staff') {
        sessionStorage.setItem('current_comp', comp)
    }
    if(comp === 'client') {
        sessionStorage.setItem('current_comp', comp)
    }
    if(comp === 'info') {
        sessionStorage.setItem('current_comp', comp)
    }

    const sezzion = sessionStorage.getItem('current_comp')

    if(props.userdata) {
        let sysadmin = JSON.stringify(props.userdata)
        localStorage.setItem('systems_admin', sysadmin)
    }

    let creds = localStorage.getItem('systems_admin')
    let parsed = JSON.parse(creds)
    let sysadminID = parsed.sysadmin.id
    let load = true

    useEffect(() => {
        if(load === true) {
            Axios.get(`http://localhost:5000/sysadmin/${sysadminID}/profile`)
            .then(result => {
                let user = result.data
                setData(user)
                load = false
            })
            .catch(err => {
                console.log(err)
                load = false
            })
        }
        if(sezzion === null) {
            sessionStorage.setItem('current_comp', 'home')
        }

        return () => load = false
    }, [])

    const Logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        props.setPage('login')
    }

    const Nav = () => {

        return (
            <div className="profilepage">
                <div className="profile">
                    <div className="info">
                        <div className="pro">
                            <img onClick={() => setComp('info')} className="avatar" src="https://www.famousbirthdays.com/faces/graham-aubrey-image.jpg" alt="" />
                            <span className="badge"></span>
                        </div>
                        <div className="name">
                            <h3>{data.name}</h3>
                            <span>status</span>
                        </div>
                    </div>
                    <div className="action">
                        <svg onClick={Logout} className="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                </div>

                <div className="menu">
                    <div onClick={() => setComp('home')} className="item">Үзүүлэлт</div>
                    <div onClick={() => setComp('company')} className="item">Компани</div>
                    <div onClick={() => setComp('service')} className="item">Үйлчилгээ</div>
                    <div onClick={() => setComp('staff')} className="item">Ажилчин</div>
                    <div onClick={() => setComp('client')} className="item">Үйлчлүүлэгч</div>
                </div>
            </div>
        )
    }

    const checkpage = () => {

        switch(sezzion) {
            case 'company':
                return <Companies companies={companies} setCompanies={setCompanies} />
            case 'service':
                return <Service />
            case 'staff':
                return <Staff />
            case 'client':
                return <Client />
            case 'home':
                return <Home />
            case 'info':
                return <Info />
            default: <Home />
        }
    }

    return (
        <div>
            <Nav />
            {
                checkpage()
            }
        </div>
    )
}

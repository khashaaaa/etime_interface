import React, { useEffect, useState } from 'react'
import { Register } from './Auth/Register'
import { Login } from './Auth/Login'
import { Profile } from './Profile/Profile'

export const SysadminWrapper = () => {

    const [page, setPage] = useState('')
    const [user, setUser] = useState('')

    if(page === 'login') {
        sessionStorage.setItem('current_page', page)
    }
    if(page === 'register') {
        sessionStorage.setItem('current_page', page)
    }
    if(page === 'profile') {
        sessionStorage.setItem('current_page', page)
    }

    const current_page = sessionStorage.getItem('current_page')

    useEffect(() => {
        if(current_page === null) {
            sessionStorage.setItem('current_page', 'login')
        }
        setPage(current_page)
    }, [])

    const checkpage = () => {

        switch(current_page) {
            case 'register':
                return <Register setPage={setPage} />
            case 'login':
                return <Login setUser={setUser} setPage={setPage} />
            case 'profile':
                return <Profile userdata={user} setUser={setUser} setPage={setPage} />
            default: <Login setUser={setUser} setPage={setPage} />
        }
    }

    return (
        <div>
            {
                checkpage()
            }
        </div>
    )
}

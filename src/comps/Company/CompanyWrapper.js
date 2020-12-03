import React, { useState, useEffect } from 'react'
import { Profile } from './Profile/Profile'
import { Login } from './Auth/Login'

export const CompanyWrapper = () => {

    const [component, setComponent] = useState('')
    const [user, setUser] = useState('')

    if(user) {
        var cred = JSON.stringify(user)
        localStorage.setItem('company', cred)
    }

    if(component === 'login') {
        sessionStorage.setItem('current_page', component)
    }
    if(component === 'profile') {
        sessionStorage.setItem('current_page', component)
    }

    const current_page = sessionStorage.getItem('current_page')

    useEffect(() => {
        if(current_page === null) {
            sessionStorage.setItem('current_page', 'login')
        }
        setComponent(current_page)
    }, [])

    const pagehandler = () => {

        switch(current_page) {
            case 'login':
                return <Login setUser={setUser} setComponent={setComponent} />
            case 'profile':
                return <Profile setComponent={setComponent} />
            default: <Login setUser={setUser} setComponent={setComponent} />
        }
    }

    return (
        <div>
            {
                pagehandler()
            }
        </div>
    )
}
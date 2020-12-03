import React from 'react'
import Axios from 'axios'
import stylo from '../../../assets/design/stylez'

export const Login = props => {

    let formdata = {
        phone: "",
        password: ""
    }

    const submitData = e => {
        e.preventDefault()

        Axios.post('http://localhost:5000/sysadmin/login', formdata)
        .then(result => {
            let urdun = result.data
            props.setUser(urdun)
            props.setPage('profile')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={stylo.cont}>
            <div className={stylo.login.headings}>
                <h1 className={stylo.login.tophead}>ETIME</h1>
                <h3 className={stylo.login.bothead}>HealtCare Service</h3>
            </div>
            <form onSubmit={submitData} className={stylo.login.form}>
                <input onChange={e => formdata.phone = e.target.value} className={stylo.input} placeholder="Утасны дугаар" />
                <input onChange={e => formdata.password = e.target.value} className={stylo.input} placeholder="Нууц үг" type="password" />
                <input className={stylo.button.big} type="submit" value="НЭВТРЭХ" />
            </form>
            <div className={stylo.login.action}>
                <p onClick={() => props.setPage('register')} className={stylo.login.toreg}>БҮРТГҮҮЛЭХ</p>
                <p className={stylo.login.forgot}>НУУЦ ҮГЭЭ МАРТСАН?</p>
            </div>
        </div>
    )
}

import React from 'react'
import Axios from 'axios'
import stylo from '../../../assets/design/stylez'

export const Register = props => {

    let formdata = {
        name: "",
        email: "",
        phone: "",
        password: ""
    }

    const submitData = e => {
        e.preventDefault()

        Axios.post('http://localhost:5000/sysadmin/register', formdata)
        .then(result => {
            props.setPage('login')
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
                <input onChange={e => formdata["name"] = e.target.value} className={stylo.input} placeholder="Нэр" />
                <input onChange={e => formdata["email"] = e.target.value} className={stylo.input} placeholder="Имэйл" />
                <input onChange={e => formdata["phone"] = e.target.value} className={stylo.input} placeholder="Утасны дугаар" />
                <input onChange={e => formdata["password"] = e.target.value} className={stylo.input}  placeholder="Нууц үг" type="password" />
                <button className={stylo.button.big} type="submit">БҮРТГҮҮЛЭХ</button>
            </form>
            <div className={stylo.login.action}>
                <p onClick={() => props.setPage('login')} className={stylo.login.toreg}>НЭВТРЭХ</p>
                <p className={stylo.login.forgot}>НУУЦ ҮГЭЭ МАРТСАН?</p>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import Axios from 'axios'
import stylo from '../../../assets/design/stylez'

export const Login = props => {

    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })

    const handleChange = (evt) => {
        const value = evt.target.value;
        setFormdata({
          ...formdata,
          [evt.target.name]: value
        });
    }

    const submitData = e => {
        e.preventDefault()

        Axios.post('http://localhost:5000/company/login', formdata)
        .then(result => {
            let urdun = result.data
            props.setUser(urdun)
            props.setComponent('profile')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={stylo.cont}>
            <div className={stylo.login.headings}>
                <h1 className={stylo.login.tophead}>ETIME</h1>
                <h3 className={stylo.login.bothead}>Таны Туслах</h3>
            </div>
            <form onSubmit={submitData} className={stylo.login.form}>
                <input className={stylo.input} placeholder="Имэйл" type="email" onChange={handleChange} value={formdata["email"]} name="email" />
                <input className={stylo.input} placeholder="Нууц үг" type="password" onChange={handleChange} value={formdata["password"]} name="password" />
                <input className={stylo.button.big} type="submit" value="НЭВТРЭХ" />
            </form>
            <div className={stylo.login.action}>
                <p className={stylo.login.toreg}>БҮРТГҮҮЛЭХ</p>
                <p className={stylo.login.forgot}>НУУЦ ҮГЭЭ МАРТСАН?</p>
            </div>
        </div>
    )
}

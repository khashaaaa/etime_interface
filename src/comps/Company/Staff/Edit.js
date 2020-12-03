import React from 'react'
import stylo from '../../../assets/design/stylez'

export const Edit = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h3 className="text-green-500 text-2xl mb-4">Ажилтны мэдээлэл засах</h3>
            <form className="flex flex-col">
                <input className={stylo.input} onChange={e => formdata["fathername"] = e.target.value} placeholder="Эцэг(эх)-ийн нэр" />
                <input className={stylo.input} onChange={e => formdata["givenname"] = e.target.value} placeholder="Өөрийн нэр" />
                <input className={stylo.input} onChange={e => formdata["email"] = e.target.value} placeholder="Имэйл хаяг" />
                <input className={stylo.input} onChange={e => formdata["phone"] = e.target.value} placeholder="Утасны дугаар" />
                <input className={stylo.input} onChange={e => formdata["address"] = e.target.value} placeholder="Хаяг" />
                <input className={stylo.input} onChange={e => formdata["description"] = e.target.value} placeholder="Цол, тайлбар" />
                <input className={stylo.input} onChange={e => formdata["password"] = e.target.value} placeholder="Нууц үг" />
                <div className="text-center">
                    <input className={stylo.button.big} type="submit" value="ЗАСАХ" />
                </div>
            </form>
        </div>
    )
}

import React, { useState } from 'react'
import Calendar from 'react-calendar'
import './calendar.scss'

export const Add = () => {

    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())

    console.log(day)

    return (
        <div>
            <Calendar onChange={setDay} value={day} />
        </div>
    )
}

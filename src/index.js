import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './assets/design/index.scss'

import { MainWrap } from './MainWrap'

render(
    <BrowserRouter>
        <MainWrap />
    </BrowserRouter>
    , document.getElementById("root"))
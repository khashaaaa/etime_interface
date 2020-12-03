import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SysadminWrapper } from './comps/Sysadmin/SysadminWrapper'
import { CompanyWrapper } from './comps/Company/CompanyWrapper'
import { ClientWrapper } from './comps/Client/ClientWrapper'

export const MainWrap = () => {
    return (
        <Switch>
            <Route exact path="/systems" component={SysadminWrapper} />
            <Route exact path="/company" component={CompanyWrapper} />
            <Route exact path="/client" component={ClientWrapper} />
        </Switch>
    )
}

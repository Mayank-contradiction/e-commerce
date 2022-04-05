import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {getAccessToken} from '../../services/localStorage';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <>
            {
                <Route
                    {...rest}
                    render = {props => {
                        if(!getAccessToken()){
                            return <Redirect to='/' />
                        }
                        return <Component {...props} />
                    }}
                />
            }
        </>
    )
}

export default ProtectedRoute

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const localToken = window.localStorage.getItem('token');
        const dispatch = useDispatch();

        useEffect(() => {

            // dispatch(auth()).then(response => {
            //     if (!response.payload.isAuth) {
            //         if (reload) {
            //             props.history.push('/login')
            //         }
            //     } else {
            //         if (adminRoute && !response.payload.isAdmin) {
            //             props.history.push('/')
            //         }
            //         else {
            //             if (reload === false) {
            //                 props.history.push('/')
            //             }
            //         }
            //     }
            // })
            console.log('in auth', user);
            console.log('local token', localToken);
            if (!localToken) {
                props.history.push('/login')
            }
            
        }, [])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}



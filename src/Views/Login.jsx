import React, { useState } from 'react'
import LoginForm from '../Components/LoginForm'
import axios from 'axios'
import {navigate} from '@reach/router'
import {useCookies} from 'react-cookie'

const Login = props => {
    const [form, setForm] = useState({
        email: "",
        pwd: "",
        isAdmin: false,
    })

    const [error, setError] = useState()

    const [cookie,setCookie] = useCookies([])

    const onSubmitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/v1/signin', form)
            .then(res => {                
                if(res.data.error){
                    setError(res.data.error.errors)
                    console.log("Error Login!", res.data.error.errors)
                } else {
                    console.log("Successful login!", res)
                    props.setLogged(res.data)
                    setForm({
                        email: "",
                        pwd: "",
                        isAdmin: false,
                    })
                    setCookie("loggedFirstname",res.data.firstName, {path: '/'})
                    setCookie("loggedLastname",res.data.lastName, {path: '/'})
                    setCookie("loggedID",res.data.id, {path: '/'})
                    setCookie("loggedRole",res.data.role, {path: '/'})
                    setCookie("loggedAdmin",form.isAdmin, {path: '/'})
                    navigate("/dashboard")
                }
                
            })
    }

    const onChangeHandler = e => {
        console.log(e)
        setForm({...form, [e.target.id]:e.target.value})
    }

    const isAdminHandler = e => {
        setForm({...form,[e.target.id]:!form.isAdmin})        
    }

    return (
        <div>
            <h2>Login page</h2>
            <LoginForm 
                onSubmitHandler = {onSubmitHandler}
                onChangeHandler = {onChangeHandler}
                isAdminHandler = {isAdminHandler}
                form = {form}
                error = {error}
                >

            </LoginForm>
        </div>
    )
}

export default Login;
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import StoryForm from '../Components/StoryForm'
import {Link, navigate} from '@reach/router'
import StoryTable from '../Components/StoryTable'
import {useCookies} from 'react-cookie'

const Main = props => {
    const {testStory} = props
    
    const [cookie, removeCookie] = useCookies([])
    
    const [form, setForm] = useState({
        id:0,
        createdBy: "",
        summary: "",
        description: "",
        type: "",
        complexity: "",
        estimatedHrs: "",
        cost: 0,
        status:"Pending"
    })

    const [stories, setStories] = useState(null)

    const [reload, setReload] = useState(false)

    const [errors, setError] = useState(null)
    
    const logoutHandler = e => {
        console.log(cookie)
        for (const key in cookie) {
            removeCookie(key)        
            }
        sessionStorage.removeItem("userToken")
        navigate('/')
    }

    // useEffect(()=>{
    //     axios.get('http://localhost:3000/api/v1/stories', {
    //         headers: {
    //             'Authorization': `${sessionStorage.getItem('userToken')}`}})
    //         .then(res => setStories(res.data))
    //         .catch(err => console.log("Error getting all stories", err.response))
    // },[reload])

    const onChangeHandler = e => {
        setForm({...form,[e.target.id]:e.target.value})
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/v1/stories', form, {
            headers: {
                'Authorization': `${sessionStorage.getItem('userToken')}`}})
            
            .then(res => {                
                setReload(!reload)
                setForm({
                    id:0,
                    createdBy: "",
                    summary: "",
                    description: "",
                    type: "",
                    complexity: "",
                    estimatedHrs: "",
                    cost: 0,
                    status:"Pending"                    
                })
            })
            
            .catch(err => {
                console.log("Error adding new story!!", err.response.data)
                setError(err.response.data.error)
            })
            
            navigate("/dashboard")
    }

    return (
        
        <div>
            {
                sessionStorage.getItem("userToken")? <>
                            <h2>Welcome {cookie.loggedFirstname} {cookie.loggedLastname}</h2>
                            <button onClick = {logoutHandler} class="btn btn-secondary mb-5">Logout</button>
                            {
                            cookie.loggedAdmin === "false" &&
                                <StoryForm onSubmitHandler = {onSubmitHandler} onChangeHandler = {onChangeHandler} form={form} errors = {errors}></StoryForm>
                            }
                            <StoryTable isAdmin = {cookie.loggedAdmin} testStory = {testStory}/>
                        </>
                : <>
                    <p>Please login</p> 
                    <Link to="/">Return home</Link>
                </>
            
            }
            
          
        </div>
    )
}

export default Main;
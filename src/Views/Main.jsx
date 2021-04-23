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
        createdBy: cookie.loggedID,
        summary: "",
        description: "",
        type: "",
        complexity: "",
        estimatedHrs: "",
        cost: 0,
        status:"Pending"
    })

    const [stories, setStories] = useState(null)
    
    const logoutHandler = e => {
        console.log(cookie)
        for (const key in cookie) {
            removeCookie(key)        
            }
        navigate('/')
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/stories')
            .then(res => setStories(res.data))
            .catch(err => console.log("Error getting all stories", err))
    },[stories])

    const onChangeHandler = e => {
        setForm({...form,[e.target.id]:e.target.value})
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/v1/stories', form)
            .then(res => {                
                if(res.data.error){
                    console.log("Error adding new story", res.data.error.errors)
                } else {
                    setForm({
                        createdBy: cookie.loggedID,
                        summary: "",
                        description: "",
                        type: "",
                        complexity: "",
                        estimatedHrs: "",
                        cost: 0,
                        status:"Pending"                    
                    })
                    navigate("/dashboard")
                }
            })
    }

    return (
        
        <div>
            {
                cookie.loggedID? <>
                            <h2>Welcome {cookie.loggedRole}, {cookie.loggedFirstname} {cookie.loggedLastname}</h2>
                            <button onClick = {logoutHandler} class="btn btn-secondary mb-5">Logout</button>
                            <StoryForm onSubmitHandler = {onSubmitHandler} onChangeHandler = {onChangeHandler} form={form}></StoryForm>
                            <StoryTable stories = {stories} isAdmin = {cookie.loggedAdmin} testStory = {testStory}/>
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
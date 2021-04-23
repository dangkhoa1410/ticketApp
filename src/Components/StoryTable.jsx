import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'

const StoryTable = props => {
    const {isAdmin} = props
    
    const [storyID, setStoryID] = useState("")

    const [updatedStory, setUpdatedStory] = useState({
        id: 0,
        createdBy: "",
        summary: "",
        description: "",
        type: "",
        complexity: "",
        estimatedHrs: "",
        cost: 0,
        status:"Pending"
    })

    const [allStories,setStories] = useState(null)

    const [reload, setReload] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/stories', {
            headers: {
                'Authorization': `${sessionStorage.getItem('userToken')}`}})
            .then(res => setStories(res.data))
            .catch(err => console.log("Error getting all stories", err.response))
    },[reload])


    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/stories/${storyID}`,{
            headers: {
                'Authorization': `${sessionStorage.getItem('userToken')}`}})
            .then(res => 
                {
                    setUpdatedStory(res.data)
                    console.log("Updating this story",updatedStory)
                })
            .catch(err => console.log("Error getting a story", err))
    },[storyID])

    const acceptHandler = e => {
        setStoryID(e.target.id)
        axios.put(`http://localhost:3000/api/v1/stories/${e.target.id}/accepted`, updatedStory,{
            headers: {
                'Authorization': `${sessionStorage.getItem('userToken')}`}})
        .then(res => {
            console.log("Accepted", updatedStory)            
            setReload(!reload)
            setUpdatedStory({
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
            navigate('/dashboard')
            
        .catch(err => {
            console.log("Error accepting a story!!", err.response)
            // setError(err.response.data.error)
        })
            
    }

    const rejectHandler = e => {
        setStoryID(e.target.id)
        axios.put(`http://localhost:3000/api/v1/stories/${e.target.id}/rejected`, updatedStory,{
            headers: {
                'Authorization': `${sessionStorage.getItem('userToken')}`}})
        .then(res => {
            console.log("Rejected!!", res)
            setReload(!reload)
            setUpdatedStory({
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
                console.log("Error rejecting a story!!", err.response)
                // setError(err.response.data.error)
            })
        
        navigate('/dashboard')
    }
    
    const typeSort = e => {
        e.preventDefault()
        allStories.sort((a,b) => {
            if(a.type.toLowerCase() < b.type.toLowerCase()) {
                return -1
            }
            if(a.type.toLowerCase() > b.type.toLowerCase()) {
                return 1
            }
        return 0
            
        })
        setStories(allStories)
        navigate('/dashboard')
        }
    
    const complexitySort = e => {
        e.preventDefault()
        allStories.sort((a,b) => {
            var aComplex, bComplex
            if(a.complexity.toLowerCase() === "low") {
                aComplex = 0
            }
            if(a.complexity.toLowerCase() === "mid") {
                aComplex = 1
            }
            if(a.complexity.toLowerCase() === "high") {
                aComplex = 2
            }

            if(b.complexity.toLowerCase() === "low") {
                bComplex = 0
            }
            if(b.complexity.toLowerCase() === "mid") {
                bComplex = 1
            }
            if(b.complexity.toLowerCase() === "high") {
                bComplex = 2
            }

            if(aComplex < bComplex) {
                return -1
            }
            if(aComplex > bComplex) {
                return 1
            }
            if(aComplex > bComplex) {
                return 0
            }
        })
        setStories(allStories)
        navigate('/dashboard')
        }
    
    const sortByID = e => {
        e.preventDefault()
        allStories.sort((a,b) => parseInt(a.id) - parseInt(b.id))
        setStories(allStories)
        navigate('/dashboard')
    }
    
    // const rejectHandlerTest = e => {
    //     const key = parseInt(e.target.id)
    //     const thisStory = testObj[key]
    //     thisStory.status = "rejected"
    //     setTestObj([...testObj.slice(0,key),thisStory,...testObj.slice(key+1)])
    // }

    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">
                        Story ID 
                        <span> <a onClick = {sortByID} href="https://">&#8681; </a></span>
                    </th>
                    <th scope="col">Summary</th>
                    <th scope="col">Description</th>
                    <th scope="col">
                        Type 
                        <span> <a onClick = {typeSort} href="https://">&#8681; </a></span>
                    </th>
                    <th scope="col">
                        Complexity 
                        <span> <a onClick = {complexitySort} href="https://">&#8681; </a></span>
                    </th>
                    <th scope="col">Estimated time</th>
                    <th scope="col">Cost</th>
                    {
                        isAdmin === "true" ? <th scope="col">Action</th> : ""
                    }
                    </tr>
                </thead>
                <tbody>
                                        
                    {/* Loop through the whole stories list */}
                    
                        
                    {
                        allStories ? allStories.map((story,key) => {
                            return (
                                <tr class={story.status === "accepted"? "table-success" 
                                : story.status === "rejected"? "table-danger"
                                    :"table-light"}>
                                    <th scope="row">{story.id}</th>
                                    <td>{story.summary}</td>
                                    <td>{story.description}</td>
                                    <td>{story.type}</td>
                                    <td>{story.complexity}</td>
                                    <td>{story.estimatedHrs}</td>
                                    <td>{story.cost}</td>
                                    {
                                        isAdmin === "true" ? <td>
                                                    <button class="btn btn-success" id={story.id} onClick = {acceptHandler} >Accept</button>
                                                    <button class="btn btn-danger" id={story.id} onClick = {rejectHandler} >Reject</button>
                                                </td>
                                        : ""
                                    }
                                </tr>
                            )
                        })
                        : ""
                    }
                </tbody>
            </table>
        </>
    )
}

export default StoryTable;
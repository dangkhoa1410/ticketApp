import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { navigate } from '@reach/router'

const StoryTable = props => {
    const {stories, isAdmin, testStory} = props
    
    const [storyID, setStoryID] = useState("")

    const [updatedStory, setUpdatedStory] = useState({
        createdBy: "",
        summary: "",
        description: "",
        type: "",
        complexity: "",
        estimatedHrs: "",
        cost: 0,
        status:"Pending"
    })

    const [allStories,setAll] = useState(null)

    const [testObj, setTestObj] = useState(null)

    // Demo for Admin role
    useEffect (() => {
        setTestObj(testStory)
    }, [testStory])

    useEffect (() => {
        setAll(stories)
    }, [stories])

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/stories/${storyID}`)
            .then(res => setUpdatedStory(res.data))
            .catch(err => console.log("Error getting a story", err))
    },[storyID])

    const acceptHandler = e => {
        setStoryID(e.target.id)
        axios.put(`http://localhost:3000/api/v1/stories/${e.target.id}/accepted`, updatedStory)
        .then(res => {
            if(res.data.error){
                console.log("Error accepting story!", res.data.error)
            } else {
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
                }
            })
    }

    const rejectHandler = e => {
        setStoryID(e.target.id)
        axios.put(`http://localhost:3000/api/v1/stories/${e.target.id}/rejected`, updatedStory)
        .then(res => {
            if(res.data.error){
                console.log("Error accepting story!", res.data.error)
            } else {
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
                }
            })
    }
    // Examples of sorting
    // Can apply to actual data retrieved back from API  -- allStories
    const typeSort = e => {
        e.preventDefault()
        testStory.sort((a,b) => {
            if(a.type.toLowerCase() < b.type.toLowerCase()) {
                return -1
            }
            if(a.type.toLowerCase() > b.type.toLowerCase()) {
                return 1
            }
           return 0
            
        })
        setTestObj(testStory)
        navigate('/dashboard')
        }
    
    const complexitySort = e => {
        e.preventDefault()
        testStory.sort((a,b) => {
            var aComplex, bComplex
            if(a.complexity.toLowerCase() === "low") {
                aComplex = 0
            }
            if(a.complexity.toLowerCase() === "medium") {
                aComplex = 1
            }
            if(a.complexity.toLowerCase() === "high") {
                aComplex = 2
            }

            if(b.complexity.toLowerCase() === "low") {
                bComplex = 0
            }
            if(b.complexity.toLowerCase() === "medium") {
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
            return 0
        })
        setTestObj(testStory)
        navigate('/dashboard')
        }
    
    const sortByID = e => {
        e.preventDefault()
        testStory.sort((a,b) => parseInt(a.id) - parseInt(b.id))
        setTestObj(testStory)
        navigate('/dashboard')
    }
    
    //Accept & Reject function sample for Admin
    //If we have backend, actual object will be updated and rerender
    const acceptHandlerTest = e => {
        e.preventDefault()
        const key = parseInt(e.target.id)
        const thisStory = testObj[key]
        thisStory.status = "accepted"
        setTestObj([...testObj.slice(0,key),thisStory,...testObj.slice(key+1)])
        console.log(testObj)
        navigate('/dashboard')
    }
    const rejectHandlerTest = e => {
        const key = parseInt(e.target.id)
        const thisStory = testObj[key]
        thisStory.status = "rejected"
        setTestObj([...testObj.slice(0,key),thisStory,...testObj.slice(key+1)])
    }

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
                    {/* Demo info */}
                    {
                        testObj ? testObj.map((story,key) => {
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
                                                    <button class="btn btn-success" id={key} onClick = {acceptHandlerTest} >Accept</button>
                                                    <button class="btn btn-danger" id={key} onClick = {rejectHandlerTest} >Reject</button>
                                                </td>
                                        : ""
                                    }
                                </tr>
                            )
                        })
                        : ""
                    }
                    
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
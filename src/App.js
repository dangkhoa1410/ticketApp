import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Router} from '@reach/router'
import Login from './Views/Login';
import Main from './Views/Main';
import {useState } from 'react';

function App() {
  const [logged, setLogged] = useState(null)

  const testStory = [
    { 
      id: 1,
      createdBy: 1,
      summary: "Login Error",
      description: "Cannot login to Windows",
      type: "Bugfix",
      complexity: "Low",
      estimatedHrs: "0.5 Hour",
      cost: 10,
      status:"Pending"
    },
    {
      id: 2,
      createdBy: 1,
      summary: "React project",
      description: "New React project",
      type: "Development",
      complexity: "High",
      estimatedHrs: "24 hours",
      cost: 1000,
      status:"accepted"
    },
    {
      id: 3,
      createdBy: 2,
      summary: "Test story",
      description: "This is a test",
      type: "QA",
      complexity: "Medium",
      estimatedHrs: "2 hours",
      cost: 50,
      status:"rejected"
    },
    {
      id: 4,
      createdBy: 3,
      summary: "E-commerce site payment error",
      description: "API doesn't return JSON ",
      type: "Bugfix",
      complexity: "High",
      estimatedHrs: "2 hours",
      cost: 500,
      status:"accepted"
    }
  ]

  return (    
    <div className="container-fluid App">
        <div className="jumbotron">
          <h1>Story APP Demo</h1>         
          
        </div>
        
        <Router>
          <Login path="/" setLogged={setLogged} />
          <Main path="/dashboard" logged={logged} testStory = {testStory}/>
        </Router>

    </div>
  );
}

export default App;

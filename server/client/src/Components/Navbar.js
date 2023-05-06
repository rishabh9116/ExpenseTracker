import React,{useState, useContext, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import logo from "../images/expenseManager-Logo.png"
import Nav from 'react-bootstrap/Nav'
import { UserContext } from "../App";
import "../App.css";
import axios from 'axios';
const sgMail = require('@sendgrid/mail');


const Navbar = () => {
  const {state,dispatch} = useContext(UserContext);
  console.log("currently in navbar");
  const [items, setItems] = useState([]);
  useEffect(() =>{
    // dispatch({type:"USER",payload : true});
    axios.get(`/api/users/get/${localStorage.getItem('userID')}`)
    .then((res) => {
      var loan = res.data.loan;
      var recEmail = res.data.email;
      // console.log(loan[0]) 
      setItems(res.data.loan);
      
      console.log(items[0]);
      for(var i = 0; i < loan.length; i++){
        var dueDate = new Date(loan[i][2]);
        console.log(dueDate)
        console.log(recEmail);

        for(var j = 5; j > 0; j--){
        
          const schedule = require('node-schedule');
          const date = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate(), 12, 0, 0);
          
          const job = schedule.scheduleJob(date, async function(){
            console.log('Functin executed in schedule job.');

            const msg={
                recipient: recEmail,
                sender: 'ankitkushawaha1000@gmail.com',
                subject: 'Bill Payment reminder',
                text: 'tell me if you got this msg',
                html: <h1>Due date of your personal loan is approaching</h1>
            }
            try {
                await axios.post("http://localhost:4000/send_mail", msg)
                console.log("success")
            } catch (error) {
                console.error(error)
            }

          });
                
          dueDate.setDate(dueDate.getDate() - 1);
          console.log(dueDate);

        }

      }
  


    })
    .catch( (error) => {
      console.log(error);
    })
    

  }, [])

  // console.log(items[0]);
  // var loan = items;
  // console.log(loan)
  //   window.setInterval(function(){ // Set interval for checking
  //     var date = new Date(); // Create a Date object to find out what time it is
  //     if(date.getHours() === 19 ){ // Check the time
  //         // Do stuff
  //         console.log("hellow");
  //         console.log("current time is the golden time");
  //     }
  // }, 15000); // Repeat every 3600000 milliseconds (1 hr)
  const RenderMenu = () => {
    if(state)
    {
      return (
        <>
          <li className="nav-item">
              <NavLink className="nav-link" to="/Home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/DashBoard">DashBoard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/DailyTransaction">Daily Transaction</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/PlanBudget">Plan Budget</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/About">About developers</NavLink>
          </li>
        </>
      )
    }else{
     return (
       <>
        
              <li className="nav-item">
                <NavLink className="nav-link" to="/Login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Signup">Registration</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/About">About developers</NavLink>
              </li>
              
       </>
     )
   }
  }

    return (
        <>
          <Nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark nav-pills">
          
          <h4 width="50" height="50">
            <img src={logo} width="40" height="40" class="d-inline-block align-center homeIcon" alt="logo"/>
            Expense Tracker
          </h4>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <RenderMenu/>
            </ul>
          
          </div>
        </Nav>

        </>
    )
}

export default Navbar

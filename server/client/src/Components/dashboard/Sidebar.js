import React, {useState,useContext, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Dashboard.css'
import {Link, useHistory} from "react-router-dom";
// import profileIcon from "..\\..\\images\\img.png"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../App";
import axios from 'axios';


const Sidebar = (props) => {

  const UpdateFood = e =>{
      e.preventDefault();

      var today = new Date();
      var month = today.getMonth() + 1;
      var fullDate = today.getDate() + '/' + month + '/' + today.getFullYear();

      if(expenseData.monthlyExpenses[fullDate] === undefined){
          expenseData.monthlyExpenses[fullDate] = user.food;
      }else{
          expenseData.monthlyExpenses[fullDate] += user.food;
      }
      // console.log(expenseData.food + " " +user.food);
      axios.put(`/api/accounts/update/${localStorage.getItem('accountID')}`, {
          food: expenseData.food + user.food,
          totalExpenses: expenseData.totalExpenses + user.food,
          monthlyExpenses: expenseData.monthlyExpenses
      })
      .then(res => {
        //   alert("Data Updated Successfully");
        console.log("Data Updated Successfully");
        setZero({
          food:'',
        })
        setUser({
          food:0,
        })

        window.location.reload(false);
      })
      .catch(error =>{
          console.log(error);
      })

   }
  const UpdateDailyAccessories = e =>{
      e.preventDefault();

      var today = new Date();
      var month = today.getMonth() + 1;
      var fullDate = today.getDate() + '/' + month + '/' + today.getFullYear();

      if(expenseData.monthlyExpenses[fullDate] === undefined){
          expenseData.monthlyExpenses[fullDate] = user.dailyAccessories;
      }else{
          expenseData.monthlyExpenses[fullDate] += user.dailyAccessories;
      }
      // console.log(expenseData.food + " " +user.food);
      axios.put(`/api/accounts/update/${localStorage.getItem('accountID')}`, {
          dailyAccessories: expenseData.dailyAccessories + user.dailyAccessories,
          totalExpenses: expenseData.totalExpenses+ user.dailyAccessories,
          monthlyExpenses: expenseData.monthlyExpenses
      })
      .then(res => {
        //   alert("Data Updated Successfully");
        console.log("Data Updated Successfully");
        setZero({
          dailyAccessories:'',
        })
        setUser({
          dailyAccessories:0,
        })

        window.location.reload(false);

      })
      .catch(error =>{
          console.log(error);
      })

   }

  const {state,dispatch} = useContext(UserContext);
  useEffect(() =>{
    dispatch({type:"USER",payload : true});
    // console.log(state);
  }, [])

  var [user,setUser] = useState({
      food:0,
      clothing:0,
      travel:0,
      dailyAccessories:0, 
      extraExpenses:0, 
      bonusReceived:0
  });
  
  var[userProfilePicture,setUserProfilePicture] = useState();
  var [expenseData,setExpenseData] = useState({});
  const [Zero, setZero] = useState({
      food:'',
      clothing:'',
      travel:'',
      dailyAccessories:'', 
      extraExpenses:'', 
      bonusReceived:''
  })
  const history =useHistory();

  useEffect(() => {
    //   console.log(user);
      axios.get(`/api/accounts/get/${localStorage.getItem('accountID')}`)
      .then((res) => {
          setExpenseData(res.data);
          
      })
      .catch( (error) => {
          console.log(error);
      })
      axios.get(`/api/users/get/${localStorage.getItem('userID')}`)
      .then((res) => {
          setUserProfilePicture(res.data.profilePicture);
          
      })
      .catch( (error) => {
          console.log(error);
      })
    //   console.log(user);
  }, [user, UpdateFood, UpdateDailyAccessories])

  const handleInputs = event =>{
     // console.log(e);
      const { value, name } = event.target;
      setUser({...user,[name]:parseInt(value, 10)});
      setZero({...Zero, [name]: value});
      // console.log(user);
  }

  const logOut = (event) =>{
    event.preventDefault();

    dispatch({type:"USER",payload : false});
    // alert("Logout Successful");
    console.log("Logout Successful");
    localStorage.removeItem('userID');
    localStorage.removeItem('accountID');
    localStorage.removeItem("isAuth");
    history.push('/',{replace:true });
    window.location.reload(false);

  }
  return (
    <ul class="nav flex-column">
        <div> <Image className="sidebar-img" src={userProfilePicture} alt="new" roundedCircle/></div>
        <h4 style={{color: "rgb(179, 77, 9)", margin:'.4em'}}>{expenseData.name}</h4>
        <li>
        <Link style={{margin:'1em'}} class="nav-link" to="MyProfile" type="button" class="btn btn-outline-secondary btn-sm">My Profile</Link>
        </li>
        <div style={{color: "rgb(179, 77, 9)"}} className="blackLine-profile"></div>
        <li class="sidebar-items">
        <h3>Food</h3>
        <input 
            type="number" 
            style={{color:'white'}} 
            name="food" 
            value={Zero.food} 
            onChange={handleInputs} 
            placeholder = "enter food" 
            min="0" 
            onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
                }
            }}
        />
        <Button as="input" variant="success" size="sm" type="submit" value="+" onClick={UpdateFood}/>{' '}

        <h3>Daily Accessories</h3>
        <input 
            type="number" 
            style={{color:'white'}} 
            name="dailyAccessories" 
            value={Zero.dailyAccessories} 
            onChange={handleInputs} 
            placeholder = "enter Daily Accessories" 
            min="0" 
            onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
                }
            }}
        />
        <Button as="input" variant="success" size="sm" type="submit" value="+" onClick={UpdateDailyAccessories}/>{' '}
        
        <h3></h3>
        <Link to="/DailyTransaction">more...</Link>
      </li>
      <div style={{color: "rgb(179, 77, 9)"}} className="blackLine-profile"></div>
      <button style={{margin:'2em', diplay:'baseline'}} class="btn btn-outline-danger btn-lg" onClick={logOut}>LOG OUT</button>{' '}
    </ul>
  )
}
export default Sidebar
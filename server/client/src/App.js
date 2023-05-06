import React, { createContext, useReducer } from 'react'
import { Route,Redirect, Switch } from "react-router-dom";
import "./App.css";
import Navbar from './Components/Navbar';
import Sidebar from './Components/dashboard/Sidebar';
import Home from './Components/Home';
import Dashboard from './Components/dashboard/Dashboard';
import MyProfile from './Components/myProfile/myProfile';
import PlanBudget from './Components/PlanBudget';
import DailyTransaction from './Components/DailyTransaction';
import Login from './Components/Login';
import Signup from './Components/Signup';
import About from './Components/About';

import {initialState,reducer} from "./reducer/UseReducer"

export const UserContext = createContext();
// const {state,dispatch} = useContext(UserContext);
//working on this file this will be key

// const ProtectedRoute 
//   = ({ isAllowed, component: Component, ...props }) => 
//   <Route
//   {...props}
//   render={(props) =>
//     isAllowed ? <Component {...props} /> : <Redirect to="/Login" />, dispatch({type:"USER",payload : true})
//   }
// />
// ;
const isUser = localStorage.getItem("userID");
var isAuth = false;
if(isUser){
  isAuth = true;
}
const Routing = () =>{
  return (
    <Switch>
      <Route exact path="/">
      {isAuth? <Home value={true}/> : <Home value={false}/> }
      </Route>

      <Route path="/Home">
      {isAuth? <Home value={true}/> : <Home value={false}/> }
      </Route>

      <Route path="/DailyTransaction">
      {isAuth? <DailyTransaction/> : <Home value={false}/> }
      </Route>

      <Route path="/Dashboard">
      {isAuth? <Sidebar/>: <Home value={false}/> }
      {isAuth? <Dashboard/>: <Home value={false}/> }
      </Route>

      <Route path="/PlanBudget">
      {isAuth? <PlanBudget value={true}/> : <Home value={false}/> }  
      </Route>
      
      <Route path="/About">
      {isAuth? <About value={true}/> : <About value={false}/> }      
      </Route>

      <Route path="/Login">
      {isAuth? <Home value={true}/> : <Login value={false}/> } 
      </Route>

      <Route path="/Signup">
      {isAuth? <Home value={true}/> : <Signup value={false}/> } 
      </Route>

      <Route path="/MyProfile">
      {isAuth? <MyProfile 
        color = "rgb(79, 3, 102)" /> : <Home value={false}/> }
      
      </Route>
    </Switch>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    
    <div className= "dark-mode">
    <UserContext.Provider value={{state, dispatch}}>
    <Navbar />
    <Routing />
    </UserContext.Provider>
    </div>
  );
}

export default App;

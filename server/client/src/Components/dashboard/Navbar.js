import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Dashboard.css'
import {Link} from "react-router-dom";
import logo from "..\\..\\images\\expenseManager-Logo.png"
import Image from 'react-bootstrap/Image'

const navbar = () => {
  return (
      <nav className = 'navbar'>
        <div> <Image className="navbar-img" src={logo} /> <p className = "navbar-title"> Dashboard </p></div>
        <ul class="topnav-right">
          <Link className = "navbar-items" to="/">Home</Link>
          <Link className = "navbar-items" to="/Dashboard">Dashboard</Link>
          <Link className = "navbar-items" to="/ExpenseCategories">Expense Category</Link>
          <Link className = "navbar-items" to="/PlanBudget" >Plan Budget</Link> 
        </ul>
      </nav>
  )
}
export default navbar

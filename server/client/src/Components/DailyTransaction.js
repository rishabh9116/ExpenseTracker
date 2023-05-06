import React,{useState,useContext, useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import ReactDOM from "react-dom";

import PieChartSatvik from "../Components/PieChartSatvik"
import styled from 'styled-components';
import axios from 'axios';
import "../App.css";
import { UserContext } from "../App";

export default function DailyTransaction(props) {


    const UpdateData = e =>{
        e.preventDefault();

        var today = new Date();
        var month = today.getMonth() + 1;
        var fullDate = today.getDate() + '/' + month + '/' + today.getFullYear();  
        var totalExp = user.food + user.clothing + user.travel + user.dailyAccessories + user.extraExpenses;

        if(expenseData.monthlyExpenses[fullDate] === undefined){
            expenseData.monthlyExpenses[fullDate] = totalExp;
        }else{
            expenseData.monthlyExpenses[fullDate] += totalExp;
        }

        console.log(expenseData.monthlyExpenses);
        console.log(user.food);
        console.log(user.clothing);

        console.log(expenseData.food + " " +user.food);
        axios.put(`/api/accounts/update/${localStorage.getItem('accountID')}`, {
            food: expenseData.food + user.food,
            clothing: expenseData.clothing + user.clothing,
            travel: expenseData.travel + user.travel,
            dailyAccessories: expenseData.dailyAccessories + user.dailyAccessories,
            extraExpenses: expenseData.extraExpenses + user.extraExpenses,
            bonusReceived: expenseData.bonusReceived + user.bonusReceived,
            totalExpenses: expenseData.totalExpenses + totalExp,
            totalIncome: expenseData.totalIncome + user.bonusReceived,
            monthlyExpenses: expenseData.monthlyExpenses
        })
        .then(res => {
            console.log("Data Updated Successfully");
            setUser({
                
                food:0,
                clothing:0,
                travel:0,
                dailyAccessories:0, 
                extraExpenses:0, 
                bonusReceived:0
            })
            setZero({
                food:'',
                clothing:'',
                travel:'',
                dailyAccessories:'', 
                extraExpenses:'', 
                bonusReceived:''
            })
            totalExp = 0;

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
        // console.log(user);
        axios.get(`/api/accounts/get/${localStorage.getItem('accountID')}`)
        .then((res) => {
            setExpenseData(res.data);
    
        })
        .catch( (error) => {
            console.log(error);
        })
        // console.log(user);
    }, [user, UpdateData])

    const handleInputs = event =>{
       // console.log(e);
        const { value, name } = event.target;
        setUser({...user,[name]:parseInt(value, 10)});
        setZero({...Zero, [name]: value});
        // console.log(user);
    }


    


    return (
        <div className= "mainContainer">
            <h3 className="WelcomeText-profile">
                Visualisation of Balance through PieChart
                <div className="firstBox">
                    <PieChartSatvik ID={localStorage.getItem('accountID')}
                    accData = {expenseData} />
                </div>
            </h3>
            
            <form class="form-inline center_div">
                <div>
                    <h3>Enter Expense of following Categories</h3>
                </div>
                <div className="firstBox">
                    <div class="col-6">
                        <input 
                        type="number" 
                        name="food" 
                        value={Zero.food} 
                        onChange={handleInputs} 
                        placeholder="Food"
                        min="0" 
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                    />
                        <input 
                            type="number" 
                            name="clothing" 
                            value={Zero.clothing} 
                            onChange={handleInputs} 
                            placeholder="Clothing"
                            min="0" 
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                            />
                        <input 
                            type="number" 
                            name="travel" 
                            value={Zero.travel} 
                            onChange={handleInputs} 
                            placeholder="Travel"
                            min="0" 
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                            />
                        <input 
                            type="number" 
                            name="dailyAccessories" 
                            value={Zero.dailyAccessories} 
                            onChange={handleInputs} 
                            placeholder="Daily Accessories"
                            min="0" 
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                            />
                        <input 
                            type="number" 
                            name="extraExpenses" 
                            value={Zero.extraExpenses} 
                            onChange={handleInputs} 
                            placeholder="Extra Expenses"
                            min="0" 
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                            />
                        <input 
                            type="number" 
                            name="bonusReceived"  
                            value={Zero.bonusReceived} 
                            onChange={handleInputs}
                            placeholder="Bonus Received"
                            min="0" 
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                            />
                    </div>
                </div>

                <div>
                    <button type="submit" name="submit" id="submit" value="submit"  onClick={UpdateData} class="btn btn-success my-1">Submit</button>
                </div>
            </form>
          
        </div>
    )
}

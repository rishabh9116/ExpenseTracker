import React from 'react'
import { UserContext } from "../App";
import { useContext,useState, useEffect } from "react";

import axios from 'axios';
import { BlackLine } from './Barchart/styles';

export const PlanBudget = () => {

    const {state,dispatch} = useContext(UserContext);
    const [accData, setAccData] = useState({});

    useEffect(() => {
        // console.log(accData);
        dispatch({type:"USER",payload : true});
        console.log("dashboard randored");
        axios.get(`/api/accounts/get/${localStorage.getItem('accountID')}`)
        .then((res) => {
            setAccData(res.data);
        })
        .catch( (error) => {
            console.log(error);
        })
        // console.log(accData);
    }, [])

    return (
        <div className = "mainAbout">
            <div className="boxPlanBudget">
                <h1 style={{color: "purple"}}>Spending Plan</h1>
                <div className="blackLine-profile"></div>
                <h4>Food :- {accData.food * (accData.totalIncome) * 0.2 / (accData.food + accData.dailyAccessories)}</h4>
                <h4>Daily Accessories :- {accData.dailyAccessories * (accData.totalIncome) * 0.2 / (accData.food + accData.dailyAccessories)}</h4>
                <h4>Clothing :- {accData.clothing * (accData.totalIncome) * 0.3 / (accData.totalExpenses - accData.food - accData.dailyAccessories)}</h4>
                <h4>Travel :- {accData.travel * (accData.totalIncome) * 0.3 / (accData.totalExpenses - accData.food - accData.dailyAccessories)}</h4>
                <h4>Extra Expenses :- {accData.extraExpenses * (accData.totalIncome) * 0.3 / (accData.totalExpenses - accData.food - accData.dailyAccessories)}</h4>
                <h4>Savings :- {(accData.totalIncome) * 0.2}</h4>
                <h4>Rent/Debts Repayment :- {(accData.totalIncome) * 0.3}</h4>
            </div>
            <div className="boxPlanBudget">
                <iframe width="100%" height="98%" src="https://www.youtube.com/embed/j1Vwth0B8I8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    )
}
export default PlanBudget;
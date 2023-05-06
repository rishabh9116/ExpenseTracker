import React from 'react'
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

export const Home = (props) => {
    const {state,dispatch} = useContext(UserContext);
    useEffect(() =>{
        if(props.value){
           dispatch({type:"USER",payload : true}); 
        } 
    }, [])
    return (
        <section className="homepage">
            <div className="homepage-1"></div>
            <div className="homepage-2"></div>
            <div className="homepage-3"></div>
        </section>
        
    )
}
export default Home
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import React,{useState, useEffect} from "react";




function newfun(props){
  console.log(props);

  return {
    labels: ['Food','Clothing','Travel','Daily Accessories','Extra Expenses'],
    datasets: [
      {
        label: 'Expenses',
        backgroundColor: [
          '#1d36a8',
          '#7b20a8',
          '#B21F00',
          '#714511',
          '#2FDE00',
        ],
        hoverBackgroundColor: [
          '#010e4a',
          '#33014d',
          '#501800',
          '#4a2800',
          '#175000',
        ],
        data: [
          props.accData.food,
          props.accData.clothing,
          props.accData.travel,
          props.accData.dailyAccessories,
          props.accData.extraExpenses,
        ]
      }
    ]
  }

}
export default class App extends React.Component {
  constructor(props){
    super(props);
    newfun(props);
  }
  render() {
    return (
      <div style={{width: "100%",maxWidth:"30%",
        overflow: "auto"}}>
        <Pie
          data={newfun(this.props)}
          options={{
            title:{
              display:true,
              text:'Expenses in a month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}
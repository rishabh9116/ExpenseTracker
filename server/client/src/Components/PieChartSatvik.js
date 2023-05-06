import {Pie} from 'react-chartjs-2';
import axios from 'axios';
import React,{useState, useEffect} from "react";




function newfun(props){
  // console.log(props);

  return {
    labels: ['Income','Expenses','Balance'],
    datasets: [
      {
        label: 'Expenses',
        backgroundColor: [
          
          '#1d36a8',
          '#714511',
          '#7b20a8',
        ],
        hoverBackgroundColor: [
          
          '#010e4a',
          '#4a2800',
          '#33014d',
        ],
        data: [
          props.accData.totalIncome,
          props.accData.totalExpenses,
          props.accData.totalIncome - props.accData.totalExpenses,
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
        overflow: "hidden"}}>
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
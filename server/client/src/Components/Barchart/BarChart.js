import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

import { expenseData} from "./expenseData";
import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  WeekDay,
  BlackLine,
  MakeBar,
  WeekName
} from "./styles";

export default function BarChart(props) {
  console.log(props.expenseData);
  var maxHeight = 0;

  for (const [key, value] of Object.entries(props.expenseData)) {
    maxHeight = Math.max(maxHeight, value.height);
  }
  console.log(maxHeight);

  return (
    <Container>
      <MainContainer>
        {props.expenseData.map(({ height, colors }, i) => {
          return (
            <BarChartContainer key={i}>
              <Number color={colors[1]}>${height}</Number>
              <MakeBar height={height / maxHeight * 90 } colors={colors} />
            </BarChartContainer>
          );
        })}
      </MainContainer>
      <BlackLine />
      <WeekName>
        {props.expenseData.map(({ colors, day }, i) => {
          return (
            <BarChartContainer key={i}>
              <WeekDay color={colors[0]}>{day}</WeekDay>
            </BarChartContainer>
          );
        })}
      </WeekName>
      <h2 style={{color: "#7b20a8"}}>{props.monthName}</h2>
    </Container>
  );
}


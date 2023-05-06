import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0px auto;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color:black;
  padding: 2em;
  margin:  auto;
  overflow: auto;
  box-shadow: 1px 1px #000000; 
  border-radius: 20px;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1000%;
  margin:  auto;
  overflow: hidden;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
`;

export const Chart = css`
  margin-top: 10px;
  margin:3px;
  width: 86px;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 420px) {
    width: 34px;
  }
`;

export const Number = styled.span`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.color};
`;

export const WeekDay = styled.span`
  font-size: 1.5rem;
  text-align: center;
  margin:3px;
  width: 86px;
  color: ${(props) => props.color};
  overflow: hidden;
`;


export const WeekName = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const MakeBar = styled.div`
  height: ${(props) => props.height}%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.colors[0]},
    ${(props) => props.colors[1]}
  );
  ${Chart};
`;

export const BlackLine = styled.div`
  width: 100%;
  height: 5px;

  background-color: grey;
`;

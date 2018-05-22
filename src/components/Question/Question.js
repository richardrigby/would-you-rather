import React from "react";
import styled from "styled-components";
import Button from "@atlaskit/button";

const style = {
  or: {
    margin: "0.6em"
  },
  qdetails: {
    marginLeft: "0.6em",
    marginRight: "0.6em"
  },
  option: {
    width: 200
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export default function Question(props) {
  const { question } = props;
  const optionOne = question.optionOne;
  const optionTwo = question.optionTwo;
  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercent =
    totalVotes > 0 ? optionOneVotes / totalVotes * 100 : 0;
  const optionTwoPercent =
    totalVotes > 0 ? optionTwoVotes / totalVotes * 100 : 0;
  return (
    <Container>
      <div className="container">
        <Button style={style.option}>{optionOne.text}</Button>
        <span style={style.qdetails}>{optionOnePercent}%</span>
        <span className="right" style={style.qdetails}>
          {optionOneVotes}
        </span>
      </div>
      <div style={style.or} className="center">
        OR
      </div>
      <div className="container">
        <Button style={style.option}>{optionTwo.text}</Button>
        <span className="right" style={style.qdetails}>
          {optionTwoPercent}%
        </span>
        <span style={style.qdetails}>{optionTwoVotes}</span>
      </div>
    </Container>
  );
}

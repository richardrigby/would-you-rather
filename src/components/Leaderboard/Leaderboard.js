import React, { Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Title = styled.h2``;

function Leaderboard({ users }) {
  console.log("users:", users);
  return (
    <Fragment>
      <Title>Leaderboard</Title>
      {!users
        ? null
        : users.map(user => {
            return (
              <p key={user.id}>
                {user.name} Total Votes:{user.totalVotes}, Total Question:{
                  user.totalQuestions
                }
              </p>
            );
          })}
    </Fragment>
  );
}

function mapStateToProps({ users }) {
  let userArray = Object.values(users).map(user => {
    const totalVotes = Object.values(user.answers).length;
    const totalQuestions = user.questions.length;
    const grandTotal = totalVotes + totalQuestions;
    return {
      ...user,
      totalVotes,
      totalQuestions,
      grandTotal
    };
  });
  userArray.sort((a, b) => b.grandTotal - a.grandTotal);
  return { users: userArray };
}

export default connect(mapStateToProps)(Leaderboard);

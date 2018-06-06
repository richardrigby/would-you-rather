import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Title = styled.h2`
  text-align: center;
`;
const Container = styled.div`
  margin: 2em;
`;
function Leaderboard({ users }) {
  return (
    <Container className="center">
      <Title>Leaderboard</Title>
      <table width="90%">
        <tbody>
          <tr>
            <th align="left">Name</th>
            <th># Votes</th>
            <th># Questions</th>
            <th>Total</th>
          </tr>
          {!users
            ? null
            : users.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td align="left">
                      {index + 1}. {user.name}
                    </td>
                    <td>{user.totalVotes}</td>
                    <td>{user.totalQuestions}</td>
                    <td>{user.grandTotal}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </Container>
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

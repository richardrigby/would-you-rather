import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Title = styled.h2`
  text-align: center;
`;
const Container = styled.div`
  margin: 2em;
`;
const Avatar = styled.img`
  margin-bottom: -18px;
`;
function Leaderboard({ users }) {
  return (
    <Container className="center">
      <Title>Leaderboard</Title>
      <table width="80%" border="1px solid black">
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
                      <div style={{ minHeight: "60px" }}>
                        <span>{index + 1}.</span>

                        <Avatar
                          src={user.avatarURL}
                          className="avatar"
                          alt={`Avatar of ${user.name}`}
                        />
                        <span> {user.name}</span>
                      </div>
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

import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Question from "../Question";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 2em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

function QuestionPage(props) {
  const { question, user } = props;
  return (
    <Container>
      <Page>
        <div className="center">
          <img
            src={user.avatarURL}
            className="avatar"
            alt={`Avatar of ${user.name}`}
          />
        </div>
        <h3 className="center">Would you Rather?</h3>
        <Question question={question} />
      </Page>
    </Container>
  );
}

function mapStateToProps(state, props) {
  const { questions, users } = state;
  const { id } = props.match.params;
  return {
    question: questions[id],
    user: users[questions[id].author]
  };
}

export default connect(mapStateToProps)(QuestionPage);

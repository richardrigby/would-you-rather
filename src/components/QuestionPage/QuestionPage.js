import React from "react";
import { connect } from "react-redux";
import Question from "../Question";

function QuestionPage({ question, user }) {
  return (
    <div style={{ margin: "2em" }}>
      <div className="center">
        <img
          src={user.avatarURL}
          className="avatar"
          alt={`Avatar of ${user.name}`}
        />
      </div>
      <h3 className="center">Would you Rather?</h3>
      <Question question={question} />
    </div>
  );
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  return {
    question: questions[id],
    user: users[questions[id].author]
  };
}

export default connect(mapStateToProps)(QuestionPage);

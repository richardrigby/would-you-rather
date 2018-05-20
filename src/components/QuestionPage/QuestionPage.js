import React, { Component } from "react";
import { connect } from "react-redux";

function QuestionPage({ question, user }) {
  return (
    <div>
      <h3>Would you Rather?</h3>
      <img src={user.avatarURL} className="avatar" />
      <p>
        {question.optionOne.text} OR {question.optionTwo.text}
      </p>
    </div>
  );
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  return {
    question: questions[id],
    user: users[authedUser]
  };
}

export default connect(mapStateToProps)(QuestionPage);

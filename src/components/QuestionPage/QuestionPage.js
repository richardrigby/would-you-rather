import React from "react";
import { connect } from "react-redux";
import Question from "../Question";

function QuestionPage(props) {
  const { question, user } = props;
  console.log("props in:", props);
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

function mapStateToProps(state, props) {
  const { questions, users } = state;
  const { id } = props.match.params;
  return {
    question: questions[id],
    user: users[questions[id].author]
  };
}

export default connect(mapStateToProps)(QuestionPage);

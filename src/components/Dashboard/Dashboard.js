import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Button from "@atlaskit/button";
import { formatDate } from "../../utils/helpers";
import Question from "../Question";
import styled from "styled-components";

const ContentControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px 12px;
`;

const Title = styled.h2``;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  margin: 2em;
`;

class Dashboard extends Component {
  state = {
    isShowAnswered: false
  };

  toggleIsShowAnswered = () => {
    this.setState((prevState, props) => {
      return { isShowAnswered: !prevState.isShowAnswered };
    });
  };

  render() {
    const {
      props: { answered, unanswered },
      state: { isShowAnswered }
    } = this;

    return (
      <div>
        <ContentControl>
          {isShowAnswered ? (
            <Fragment>
              <div />
              <Title>Anwsered Questions</Title>
              <Button onClick={this.toggleIsShowAnswered}>Unanwsered</Button>
            </Fragment>
          ) : (
            <Fragment>
              <div />
              <Title>Unanwsered Questions</Title>
              <Button onClick={this.toggleIsShowAnswered}>Anwsered</Button>
            </Fragment>
          )}
        </ContentControl>

        {isShowAnswered ? (
          answered === undefined ? null : (
            <QuestionContainer>
              {answered.map(question => (
                <Question key={question.id} question={question} />
              ))}
            </QuestionContainer>
          )
        ) : unanswered === undefined ? null : (
          <QuestionContainer>
            {unanswered.map(question => {
              return (
                <Fragment key={question.id}>
                  <Link to={`/question/${question.id}`}>
                    <div className="center">
                      <Button>{question.optionOne.text}</Button>
                      <span style={{ margin: "2em" }}>OR</span>
                      <Button>{question.optionTwo.text}</Button>
                      <div className="right">
                        {formatDate(question.timestamp)}
                      </div>
                    </div>
                  </Link>
                </Fragment>
              );
            })}
          </QuestionContainer>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  const qs = Object.values(questions);
  const answered = qs.filter(
    q =>
      q.optionOne.votes.includes(authedUser) ||
      q.optionTwo.votes.includes(authedUser)
  );
  const unanswered = qs.filter(q => !answered.includes(q));

  return {
    answered: answered.sort((a, b) => b.timestamp - a.timestamp),
    unanswered: unanswered.sort((a, b) => b.timestamp - a.timestamp)
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));

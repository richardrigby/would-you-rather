import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Button from "@atlaskit/button";
import { formatDate } from "../../utils/helpers";
import Question from "../Question";

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
    const { answered, unanswered } = this.props;

    console.log("answered:", answered);
    console.log("unanwsered:", unanswered);

    const { isShowAnswered } = this.state;

    return (
      <div style={{ margin: 12 }}>
        {isShowAnswered ? (
          <Button className="right" onClick={this.toggleIsShowAnswered}>
            Unanwsered
          </Button>
        ) : (
          <Button className="right" onClick={this.toggleIsShowAnswered}>
            Anwsered
          </Button>
        )}

        {isShowAnswered ? (
          answered === undefined ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "100%",
                overflowY: "scroll"
              }}
            >
              {unanswered.map(question => <Question question={question} />)}
            </div>
          )
        ) : unanswered === undefined ? null : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "100%",
              overflowY: "scroll"
            }}
          >
            {unanswered.map(question => {
              return (
                <Fragment key={question.id}>
                  <Link to={`/question/${question.id}`}>
                    <div>
                      <div className="center">
                        <Button>{question.optionOne.text}</Button>
                        <span style={{ margin: "2em" }}>OR</span>
                        <Button>{question.optionTwo.text}</Button>
                        <div className="right">
                          {formatDate(question.timestamp)}
                        </div>
                      </div>
                      {/* <hr /> */}
                    </div>
                  </Link>
                </Fragment>
              );
            })}
          </div>
        )}

        <br />
        <br />
        <hr />
        <br />
        <br />
        <ul>
          <li>Toggle between his/her answered and unanswered polls.</li>
          <li>The unanswered questions should be shown by default.</li>
          <li>Each polling question should link to the details of that poll</li>
          <li>
            The details of each poll should be available at
            questions/:question_id.
          </li>
          <li>
            <span>
              When a poll is clicked on the home page, the following is shown:
            </span>
            <ol>
              <li>Text “Would You Rather”;</li>
              <li>Avatar of the user who posted the polling question; and</li>
              <li>Two Options</li>
            </ol>
          </li>

          <li>
            <span>
              For answered polls, each of the two options contains the
              following:
            </span>
            <ol>
              <li>Text of the option;</li>
              <li>Number of people who voted for that option; and</li>
              <li>Percentage of people who voted for that option.</li>
            </ol>
          </li>

          <li>
            The option selected by the logged-in user should be clearly marked.
          </li>
          <li />
          <li />
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
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

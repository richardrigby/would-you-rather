import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Tabs from "@atlaskit/tabs";

class Dashboard extends Component {
  render() {
    const { anwsered, unanswered } = this.props;

    const UnansweredContent = ({ unanswered }) => {
      return unanswered === undefined ? null : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            overflowY: "scroll"
          }}
        >
          {unanswered.map(element => {
            return (
              <Fragment key={element.id}>
                <Link to={`/question/${element.id}`}>
                  <div>
                    <h3>Would you rather?</h3>
                    <p>
                      {element.optionOne.text} OR {element.optionTwo.text}
                    </p>
                    <hr />
                  </div>
                </Link>
              </Fragment>
            );
          })}
        </div>
      );
    };

    const tabs = [
      {
        label: "Unanwsered",
        content: <UnansweredContent unanswered={unanswered} />
      },
      { label: "Anwsered", content: <p>Two</p> }
    ];

    return (
      <div>
        <h3 className="center">Would you Rather?</h3>
        <Tabs
          tabs={tabs}
          onSelect={(tab, index) => console.log("Selected Tab", index + 1)}
        />
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
  console.log("anwsered:", answered);
  console.log("unanwsered:", unanswered);
  return {
    answered,
    unanswered
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));

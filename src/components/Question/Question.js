import React, { Fragment } from "react";
import styled from "styled-components";
import Button from "@atlaskit/button";
import { connect } from "react-redux";
import { handleAddQuestionVotes } from "../../actions/questions";

const style = {
  or: {
    margin: "0.6em"
  },
  qdetails: {
    marginLeft: "0.6em",
    marginRight: "0.6em"
  },
  option: {
    minwidth: 200,
    height: 100
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  margin: 1em auto;
  border: 2px solid grey;
  border-radius: 4px;
  padding: 1em;
  padding-bottom: 2.5em;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const OptionButton = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
`;

const handleOptionSelection = (e, text, question, dispatch) => {
  e.preventDefault();
  const optionOne = question.optionOne;
  const optionTwo = question.optionTwo;

  let option = "";
  if (text === optionOne.text) {
    option = "optionOne";
  } else if (text === optionTwo.text) {
    option = "optionTwo";
  }
  dispatch(handleAddQuestionVotes(question, option));
};

const Option = ({ text, question, dispatch }) => {
  return (
    <Fragment>
      <Button
        style={style.option}
        onClick={e => handleOptionSelection(e, text, question, dispatch)}
        appearance="primary"
      >
        <OptionButton>
          <div>{text}</div>
        </OptionButton>
      </Button>
    </Fragment>
  );
};

const OptionStats = ({
  option,
  text,
  numVotes,
  totalVotes,
  question,
  answered,
  dispatch
}) => {
  const percent = totalVotes > 0 ? numVotes / totalVotes * 100 : 0;
  return (
    <Fragment>
      <Button
        style={style.option}
        appearance={option === answered ? "warning" : "default"}
        onClick={
          answered
            ? null
            : e => handleOptionSelection(e, text, question, dispatch)
        }
      >
        <OptionButton answered={answered}>
          <div>{text}</div>
          <div>
            ({numVotes} {numVotes === 1 ? "Vote" : "Votes"} /{" "}
            {percent.toFixed(0)}% of total)
          </div>
        </OptionButton>
      </Button>
    </Fragment>
  );
};

function Question(props) {
  const { question, authedUser, dispatch } = props;
  const optionOne = question.optionOne;
  const optionTwo = question.optionTwo;
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;

  let answered = null;
  if (optionOne.votes.includes(authedUser)) {
    answered = "optionOne";
  } else if (optionTwo.votes.includes(authedUser)) {
    answered = "optionTwo";
  }

  return (
    <Container>
      {totalVotes > 0 ? (
        <OptionStats
          option="optionOne"
          text={optionOne.text}
          numVotes={optionOne.votes.length}
          totalVotes={totalVotes}
          question={question}
          answered={answered}
          dispatch={dispatch}
        />
      ) : (
        <Option text={optionOne.text} question={question} dispatch={dispatch} />
      )}

      <div style={style.or} className="center">
        OR
      </div>
      {totalVotes > 0 ? (
        <OptionStats
          option="optionTwo"
          text={optionTwo.text}
          numVotes={optionTwo.votes.length}
          totalVotes={totalVotes}
          question={question}
          answered={answered}
          dispatch={dispatch}
        />
      ) : (
        <Option text={optionTwo.text} question={question} dispatch={dispatch} />
      )}
    </Container>
  );
}

function mapStatetoProps(state, props) {
  const { authedUser } = state;
  return {
    authedUser
  };
}

export default connect(mapStatetoProps)(Question);

import { showLoading, hideLoading } from "react-redux-loading";
import { updateUserQuestions, updateUserVotes } from "../actions/users";
import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestion(question, author) {
  return {
    type: ADD_QUESTION,
    payload: {
      question,
      author
    }
  };
}

export function addQuestionAnswer(question, user, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    payload: {
      question,
      user,
      answer
    }
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { users, authedUser } = getState();

    const author = users[authedUser];
    dispatch(showLoading());

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then(question => {
        dispatch(addQuestion(question, author));
        dispatch(updateUserQuestions(question, author));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestionVotes(question, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return _saveQuestionAnswer({ authedUser, qid: question.id, answer })
      .then(() => {
        dispatch(addQuestionAnswer(question, authedUser, answer));
        dispatch(updateUserVotes(question.id, authedUser, answer));
      })
      .then(() => dispatch(hideLoading()));
  };
}

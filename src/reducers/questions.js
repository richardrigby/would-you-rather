import {
  ADD_QUESTION,
  ADD_QUESTION_ANSWER,
  RECEIVE_QUESTIONS
} from "../actions/questions.actionsTypes";

export default function questions(state = {}, action) {
  const { user, answer, question } = action.payload;
  const votes = question[answer].votes.concat([user]);
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION: {
      return {
        ...state,
        [question.id]: question
      };
    }
    case ADD_QUESTION_ANSWER: {
      return {
        ...state,
        [question.id]: {
          ...question,
          [answer]: {
            ...question[answer],
            votes
          }
        }
      };
    }
    default:
      return state;
  }
}

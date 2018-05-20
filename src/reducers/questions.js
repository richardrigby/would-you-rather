import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_QUESTION } from "../actions/questions";
// import { ADD_QUESTION_ANSWER } from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [action.question.id]: action.question
      };
    // case ADD_QUESTION_ANSWER:
    // const {id, user, option} = action;
    //   return {
    //     ...state,
    //     state.questions[id][option].votes.push(user)
    //   };
    default:
      return state;
  }
}

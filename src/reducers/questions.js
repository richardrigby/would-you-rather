import { RECEIVE_QUESTIONS } from "../actions/questions";
import { ADD_QUESTION } from "../actions/questions";
import { ADD_QUESTION_ANSWER } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION: {
      const { question } = action.payload;
      return {
        ...state,
        [question.id]: question
      };
    }
    case ADD_QUESTION_ANSWER: {
      const { user, answer, question } = action.payload;
      const votes = question[answer].votes.concat([user]);
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

/*
author.questions.push(question.id);
      console.log("author:", author);
[question.author]: {
  ...author
}
*/

import {
  RECEIVE_USERS,
  UPDATE_USER_QUESTIONS,
  UPDATE_USER_VOTES
} from "../actions/users.actionsTypes";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.payload.users
      };
    case UPDATE_USER_QUESTIONS:
      let { question, author } = action.payload;
      author.questions.push(question.id);

      return {
        ...state,
        [author.id]: {
          ...author
        }
      };

    case UPDATE_USER_VOTES:
      const { qid, user, vote } = action.payload;
      return {
        ...state,
        [user]: {
          ...state[user],
          answers: {
            ...state[user].answers,
            [qid]: vote
          }
        }
      };
    default:
      return state;
  }
}

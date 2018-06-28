import {
  RECEIVE_USERS,
  UPDATE_USER_QUESTIONS,
  UPDATE_USER_VOTES
} from "./users.actionsTypes";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    payload: {
      users
    }
  };
}

export function updateUserQuestions(question, user) {
  return {
    type: UPDATE_USER_QUESTIONS,
    payload: {
      author: user,
      question
    }
  };
}

export function updateUserVotes(qid, user, vote) {
  return {
    type: UPDATE_USER_VOTES,
    payload: {
      user,
      qid,
      vote
    }
  };
}

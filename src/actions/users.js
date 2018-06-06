export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USERS_QUESTIONS = "RECEIVE_USERS_QUESTIONS";
export const UPDATE_USER_QUESTIONS = "UPDATE_USER_QUESTIONS";
export const UPDATE_USER_VOTES = "UPDATE_USER_ANSWERS";

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

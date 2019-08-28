import { RECEIVE_TWEETS, LIKE_TWEET } from '../actions/tweets';


export default function tweets (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case LIKE_TWEET:
      return {
        ...state,
        [action.tweet.id]: action.tweet
      }
    default:
      return state;
  }
}
import {
  RECEIVE_TWEETS,
  LIKE_TWEET,
  ADD_TWEET,
  REPLY_TWEET,
} from '../actions/tweets';


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
    case ADD_TWEET:
      return {
        ...state,
        [action.tweet.id]: action.tweet
      }
    case REPLY_TWEET:
      return {
        ...state,
        [action.tweet.id]: action.tweet
      }
    default:
      return state;
  }
}
import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const LIKE_TWEET = 'LIKE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';
export const REPLY_TWEET = 'REPLY_TWEET';

function likeTweet (tweet) {
  return {
    type: LIKE_TWEET,
    tweet
  }
}

function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

function replyTweet (tweet) {
  return {
    type: REPLY_TWEET,
    tweet
  }
}

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

export function handleLikeTweet (tweet) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveLikeToggle({
      authedUser,
      id: tweet.id,
      hasLiked: tweet.likes && tweet.likes.includes(authedUser)
    })
      .then(() => {
        const newTweet = {
          ...tweet,
          likes: tweet.likes && tweet.likes.includes(authedUser)
            ? tweet.likes.filter((uid) => uid !== authedUser)
            : tweet.likes.concat([authedUser])
        };

        dispatch(likeTweet(newTweet));
      })
      .catch(() => {
        alert('An error occured.  Try again.');
      })

  };
}

export function handleAddTweet ({ text, replyingTo }) {
  return (dispatch, getState) => {
    const { authedUser, tweets } = getState();
    dispatch(showLoading());

    return saveTweet({
        text,
        author: authedUser,
        replyingTo
    })
      .then((tweet) => {

        dispatch(addTweet(tweet));

        if (replyingTo) {
          let updateTweet = {
            ...tweets[replyingTo],
            replies: tweets[replyingTo].replies.concat([tweet.id])
          };

          dispatch(replyTweet(updateTweet));
        }

        dispatch(hideLoading());
      })
      .catch(() => {
        alert('An error occured. Try again.');
      });
  }
}



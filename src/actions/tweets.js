import { saveLikeToggle } from '../utils/api';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const LIKE_TWEET = 'LIKE_TWEET';

function likeTweet (tweet) {
  return {
    type: LIKE_TWEET,
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
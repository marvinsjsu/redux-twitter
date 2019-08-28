import React from 'react';
import { connect } from 'react-redux';

import Tweet from './Tweet';

function Tweets ({ tweetIds }) {
  return (
    <div>
      <h4 className='label txt-align-center'>Your Timeline</h4>
      <ul>
        {tweetIds && tweetIds.map((tweetId) => (
          <li key={tweetId}>
            <Tweet tweetId={tweetId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps ({ authedUser, tweets }) {

  if (!tweets) {
    return {
      tweetIds: null
    }
  }

  const sortedTweets = Object.values(tweets)
    .sort((a, b) => b.timestamp - a.timestamp);

  const tweetIds = sortedTweets
    .map((tweet) => tweet.id);

  return {
    tweetIds
  }
}

export default connect(mapStateToProps)(Tweets);
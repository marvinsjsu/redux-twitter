import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tweet from './Tweet';

class Tweets extends Component {

  render () {
    const { tweetIds } = this.props;

    return (
      <div>
        <ul>
          {tweetIds && tweetIds.map((tweetId) => (
            <li className='tweet-container' key={tweetId}>
              <Tweet tweetId={tweetId} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
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
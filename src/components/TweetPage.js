import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import ComposeTweet from './ComposeTweet';

function TweetPage ({ id, replies }) {
  return (
    <Fragment>
      <Tweet tweetId={id} />
      <ComposeTweet replyingTo={id}/>
      <ul>
        {replies.map((reply) => (
          <li key={reply.id}>
            <Tweet tweetId={reply.id} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

function mapStateToProps ({ tweets }, { match }) {
  const { id } = match.params;
  const replies = tweets[id].replies
    .map((tid) => tweets[tid])
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    id,
    replies
  }
}

export default connect(mapStateToProps)(TweetPage);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { TiHeartOutline, TiArrowBackOutline } from 'react-icons/ti';

class Tweet extends Component {

  handleLike = () => {
    console.log('handleLike');
  };

  handleRetweet = () => {
    console.log('handleRetweet');
  };

  render () {
    const { tweet, user, replyTo } = this.props;
    const created = moment(tweet.timestamp);

    return (
      <div className='tweet'>
        <img className='user-pic' src={user.avatarURL} alt='User avatar'/>
        <div className='tweet-content'>
          <h4 className='user-name'>{user.name}</h4>
          <h4 className='date-time'>{created.format('LT | M/D/YYYY')}</h4>
          {replyTo && (
            <h4 className='reply-to'>Replying to @{replyTo.author}</h4>
          )}
          <p className='text'>{tweet.text}</p>
          <div className='actions'>
            <TiArrowBackOutline
              onClick={this.handleRetweet}
              size={30}
              className='action-icon'
            />
            <TiHeartOutline
              onClick={this.handleLike}
              size={30}
              className='action-icon'
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ tweets, users }, { tweetId }) {
  const tweet = tweets[tweetId];
  const user = users[tweet.author];
  const replyTo = tweets[tweet.replyingTo];

  return {
    tweet,
    user,
    replyTo
  }
}

export default connect(mapStateToProps)(Tweet);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { TiHeartOutline, TiArrowBackOutline, TiHeartFullOutline } from 'react-icons/ti';

import { handleLikeTweet } from '../actions/tweets';

class Tweet extends Component {

  state = {
    liked: false
  };

  componentDidMount () {
    const { tweet, authedUser } = this.props;

    this.setState({
      liked: tweet.likes && tweet.likes.includes(authedUser)
    });
  }

  handleLike = () => {
    const { tweet, dispatch } = this.props;

    this.setState((currState) => ({
      liked: !currState.liked
    }));

    dispatch(handleLikeTweet(tweet));
  };

  handleRetweet = () => {
    console.log('handleRetweet');
  };

  render () {
    const { liked } = this.state;
    const { tweet, user, replyTo, authedUser } = this.props;
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
            {liked
              ? (
                  <TiHeartFullOutline
                    onClick={this.handleLike}
                    size={30}
                    className='action-icon'
                  />
                )
              : (
                  <TiHeartOutline
                    onClick={this.handleLike}
                    size={30}
                    className='action-icon'
                  />
                )
            }
            {tweet.likes && tweet.likes.length > 0 && tweet.likes.length}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ tweets, users, authedUser }, { tweetId }) {
  const tweet = tweets[tweetId];
  const user = users[tweet.author];
  const replyTo = tweets[tweet.replyingTo];

  return {
    tweet,
    user,
    replyTo,
    authedUser
  }
}

export default connect(mapStateToProps)(Tweet);
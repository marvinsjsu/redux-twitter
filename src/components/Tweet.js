import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <Link
              className='reply-to'
              to={`/tweet/${replyTo.id}`}
            >
              Replying to @{replyTo.author}
            </Link>
          )}
          <p className='text'>{tweet.text}</p>
          <div className='actions'>
            <Link to={`/tweet/${tweet.id}`}>
              <TiArrowBackOutline
                onClick={this.handleReply}
                size={30}
                className='action-icon'
              />
            </Link>

            {tweet.replies && tweet.replies.length > 0 && tweet.replies.length}
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
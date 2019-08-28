import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class ComposeTweet extends Component {
  state = {
    tweetBody: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { tweetBody } = this.state;
    const { replyingTo = false, dispatch } = this.props;

    dispatch(handleAddTweet({
      text: tweetBody,
      replyingTo: replyingTo
    }));

    this.setState({
      tweetBody: ''
    });
  };

  handleChange = (e) => {
    this.setState({
      tweetBody: e.target.value
    });
  }

  render () {
    const { tweetBody } = this.state;
    return (
      <div className='compose-tweet-container'>
        <form onSubmit={this.onSubmit}>
          <h4 className='label'>Compose new Tweet</h4>
          <textarea
            className='tweet-body'
            value={tweetBody}
            placeholder={`What's happening?`}
            onChange={this.handleChange}
          />
          <button
            className='btn submit'
            type='submit'
            disabled={tweetBody === ''}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(ComposeTweet);
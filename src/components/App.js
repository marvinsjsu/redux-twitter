import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

import Tweets from './Tweets';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }

  render() {

    console.log('this.props.loading: ', this.props.loading);
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <Tweets />
        }
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
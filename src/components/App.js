import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

import Tweets from './Tweets';
import ComposeTweet from './ComposeTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { match } = this.props;

    return (
      <Router>
        <Fragment>
        <LoadingBar />
        <div className='app-container'>
          <Nav />
          {this.props.loading === true
            ? null
            : <div>
                <Route path='/' exact component={Tweets}/>
                <Route path='/new' exact component={ComposeTweet}/>
                <Route path='/tweet/:id' exact component={TweetPage}/>
              </div>
          }
        </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
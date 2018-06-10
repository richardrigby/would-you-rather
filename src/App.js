import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard";
import QuestionPage from "./components/QuestionPage";
import NewQuestion from "./components/NewQuestion";
import LoadingBar from "react-redux-loading";
import Leaderboard from "./components/Leaderboard";
import Nav from "./components/Nav";
// import Button from "@atlaskit/button";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: "green", height: "5px" }} />
          <div className="container">
            <Nav />
            {!authedUser ? null : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/leaderboard" exact component={Leaderboard} />
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/add" exact component={NewQuestion} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const loading = users.length === 0;
  return { loading, authedUser };
}

export default connect(mapStateToProps)(App);

import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard";
import QuestionPage from "./components/QuestionPage";
import NewQuestion from "./components/NewQuestion";
import LoadingBar from "react-redux-loading";
import Leaderboard from "./components/Leaderboard";
import Nav from "./components/Nav";
import "./App.css";

const NotFound = function(props) {
  return (
    <h2 style={{ textAlign: "center", margin: "2em" }}>404 - page not found</h2>
  );
};

const qidExists = (props, questionIds) => {
  if (questionIds.includes(props.match.params.id)) {
    return true;
  } else {
    return false;
  }
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, questionIds } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: "green", height: "5px" }} />
          <div className="container">
            <Nav />
            {!authedUser ? (
              <h2 className="center login-help">
                Please login to get started.
              </h2>
            ) : (
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/leaderboard" exact component={Leaderboard} />
                <Route
                  path="/question/:id"
                  render={props =>
                    qidExists(props, questionIds) ? (
                      <QuestionPage {...props} />
                    ) : (
                      <NotFound />
                    )
                  }
                />
                <Route path="/add" exact component={NewQuestion} />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser, questions }) {
  const loading = users.length === 0;
  const questionIds = Object.values(questions).map(q => q.id);
  return { loading, authedUser, questionIds };
}

export default connect(mapStateToProps)(App);

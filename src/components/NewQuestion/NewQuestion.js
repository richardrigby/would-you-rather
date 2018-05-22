import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Button from "@atlaskit/button";
import { handleAddQuestion } from "../../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuetion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false
  };
  handleSubmit = e => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      text: "",
      toHome: true
    }));
  };

  handleOptionOneChange = e => {
    const text = e.target.value;
    this.setState(() => ({
      optionOneText: text
    }));
  };

  handleOptionTwoChange = e => {
    const text = e.target.value;
    this.setState(() => ({
      optionTwoText: text
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <h2>New Question</h2>
        <h3 className="center">Would you Rather?</h3>
        <form onSubmit={this.handleSubmit} className="center">
          <textarea
            placeholder="Option One"
            value={optionOneText}
            onChange={this.handleOptionOneChange}
            className="textarea"
            maxLength={150}
          />
          <br />
          <textarea
            placeholder="Option Two"
            value={optionTwoText}
            onChange={this.handleOptionTwoChange}
            className="textarea"
            maxLength={150}
          />
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </Fragment>
    );
  }
}

// function mapStateToProps({ users }) {

// }

export default connect()(NewQuetion);

import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

//this creates the tellAstory component
export default class TeleAStory extends GameComponent {
  constructor(props) {
    super(props);
    this.state = { textAreaVal: "", storyText: "" };
    this.getSessionDatabaseRef().update({
      text: "The Player's Story will display here"
    });
  }
  onSessionDataChanged(data) {
    console.log("Data changed!", data);
    this.setState({ storyText: data.text });
  }
  buttonHandler() {
    this.getSessionDatabaseRef().update({ text: this.state.textAreaVal });
  }
  textAreaChangeHandler(event) {
    console.log(event);
    this.setState({ textAreaVal: event.target.value });
  }
  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var creator = UserApi.getName(event => this.getSessionCreatorUserId(event));
    return (
      <div>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <ul>{users}</ul>
        <div>{this.state.storyText}</div>
        <textarea
          rows="4"
          cols="50"
          value={this.state.textAreaVal}
          onChange={e => this.textAreaChangeHandler(e)}
        >
          <br />
        </textarea>
        <button onClick={() => this.buttonHandler()}>cute little button</button>
      </div>
      // textAreaVal
    );
  }
}

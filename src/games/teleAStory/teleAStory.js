import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

//this creates the tellAstory component
export default class TeleAStory extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentText: " ",
      displayText: " "
    };
    this.getSessionDatabaseRef().set({
      current_player: UserApi.getName(this.getSessionCreatorUserId())
    });
  }

  onSessionDataChanged(data) {
    console.log("Data changed!", data);
    this.setState({ displayText: data.text });
  }
  handleButtonClick() {
    var component = this;
    this.getSessionDatabaseRef()
      .once("value")
      .then(function(snapshot) {
        var fullstory = "";
        if (snapshot.val() == null) {
          fullstory = component.state.currentText;
        } else {
          fullstory = snapshot.val().text + "\n" + component.state.currentText;
        }
        component.getSessionDatabaseRef().update({
          text: fullstory
        });
      });
  }

  // handleHostInit() {
  //   const element = (
  //     <div>
  //       <textarea
  //         rows="4"
  //         cols="50"
  //         onChange={event => this.handleChange(event)}
  //         value={this.state.currentText}
  //       />
  //       <button onClick={() => this.handleButtonClick()}>
  //         Click me, I'm a cute little button!
  //       </button>
  //     </div>
  //   );
  //   return element;
  // }
  handleChange(event) {
    this.setState({ currentText: event.target.value });
  }
  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());

    return (
      <div class="teleAStory">
        {/* <p>Session ID: {id}</p> */}
        <p class="teleAStoryText">Session creator: {creator}</p>
        <p class="teleAStoryText">Session users:</p>
        <ul class="teleAStoryText">{users}</ul>
        <div class="storyTimeArea">
          <textarea
            readOnly
            rows="10"
            cols="50"
            value={this.state.displayText}
          />
          <br />
          <textarea
            rows="4"
            cols="50"
            onChange={event => this.handleChange(event)}
            value={this.state.currentText}
          />
          {/* <button onClick={() => this.handlehostInit()}>Start game</button> */}
          <br />
          <button
            class="teleAStoryButton"
            onClick={() => this.handleButtonClick()}
          >
            Submit
            <br />
            your
            <br />
            sentence!
          </button>
        </div>
      </div>
    );
  }
}

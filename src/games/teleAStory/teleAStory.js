import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

//this creates the tellAstory component
export default class TeleAStory extends GameComponent {
  constructor(props) {
    super(props);
    this.getSessionDatabaseRef().set({});
  }
  onSessionDataChanged(data) {
    console.log("Data changed!", data);
  }
  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());
    return (
      <div>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <ul>{users}</ul>
        <textarea rows="4" cols="50">
          {" "}
        </textarea>
      </div>
    );
  }
}

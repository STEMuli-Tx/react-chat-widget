import React, { Component } from "react";
import {
  Widget,
  addResponseMessage,
  setQuickButtons,
  toggleMsgLoader
} from "../index";
import { List, Map } from "immutable";
import Message from "@messagesComponents/Message";
import CustomLauncher from "../src/components/Widget";
export default class App extends Component {
  state = { messageList: [] };

  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = newMessage => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === "fruits") {
        setQuickButtons([
          { label: "Apple", value: "apple" },
          { label: "Orange", value: "orange" },
          { label: "Pear", value: "pear" },
          { label: "Banana", value: "banana" }
        ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  };

  handleQuickButtonClicked = e => {
    addResponseMessage("Selected " + e);
    setQuickButtons([]);
  };

  render() {
    return (
      <Widget
        title="Bienvenido?!?!?!"
        messageList={this.state.messageList}
        subtitle="Asistente virtual"
        senderPlaceHolder="Escribe aquí ..."
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButtonClicked}
        badge={2}
        profileAvatar="https://stemuli.blob.core.windows.net/stemuli/SeagovillePhotos/staff/sibu.jpeg"
      />
    );
  }
}

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { List, Map } from "immutable";
import Message from "@messagesComponents/Message";
import { toggleChat, addUserMessage, loadChatList } from "@actions";

import WidgetLayout from "./layout";
import { throws } from "assert";
import { dropMessages } from "../../store/actions";

class Widget extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.fullScreenMode) {
      this.props.dispatch(toggleChat());
    }
  }
  componentDidMount() {
    this.props.dispatch(loadChatList(this.props.messageList));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messageList.length !== this.props.messageList.length) {
      this.props.dispatch(loadChatList(this.props.messageList));
    }
    if (prevProps.id !== this.props.id) {
      this.props.dispatch(dropMessages());
      this.props.dispatch(loadChatList(this.props.messageList));
    }
  }

  toggleConversation = () => {
    this.props.dispatch(toggleChat());
  };

  handleMessageSubmit = event => {
    event.preventDefault();
    const userInput = event.target.message.value;
    if (userInput.trim()) {
      this.props.dispatch(addUserMessage(userInput));
      this.props.handleNewUserMessage(userInput);
    }
    event.target.message.value = "";
  };

  handleQuickButtonClicked = (event, value) => {
    event.preventDefault();
    if (this.props.handleQuickButtonClicked) {
      this.props.handleQuickButtonClicked(value);
    }
  };

  render() {
    return (
      <WidgetLayout
        onToggleConversation={this.toggleConversation}
        onSendMessage={this.handleMessageSubmit}
        onQuickButtonClicked={this.handleQuickButtonClicked}
        title={this.props.title}
        titleAvatar={this.props.titleAvatar}
        subtitle={this.props.subtitle}
        senderPlaceHolder={this.props.senderPlaceHolder}
        profileAvatar={this.props.profileAvatar}
        showCloseButton={this.props.showCloseButton}
        fullScreenMode={this.props.fullScreenMode}
        badge={this.props.badge}
        autofocus={this.props.autofocus}
        customLauncher={this.props.customLauncher}
      />
    );
  }
}

Widget.propTypes = {
  messageList: PropTypes.array,
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  handleNewUserMessage: PropTypes.func.isRequired,
  handleQuickButtonClicked: PropTypes.func.isRequired,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  customLauncher: PropTypes.func
};

export default connect()(Widget);

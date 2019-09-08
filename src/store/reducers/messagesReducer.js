import { createReducer } from "@utils/store";
import {
  createNewMessage,
  createLinkSnippet,
  createComponentMessage
} from "@utils/messages";
import { MESSAGE_SENDER } from "@constants";
import { List, Map } from "immutable";
import Message from "@messagesComponents/Message";
import * as actionTypes from "../actions/actionTypes";

const initialState = List([]);

const messagesReducer = {
  [actionTypes.ADD_NEW_USER_MESSAGE]: (state, { text }) =>
    state.push(createNewMessage(text, MESSAGE_SENDER.CLIENT)),

  [actionTypes.ADD_NEW_RESPONSE_MESSAGE]: (state, { text }) =>
    state.push(createNewMessage(text, MESSAGE_SENDER.RESPONSE)),

  [actionTypes.LOAD_CHAT_LIST]: (state, { list }) => {
    state = List(
      list.map(item => {
        return Map({
          type: item.type,
          text: item.text,
          sender: item.sender,
          showAvatar: item.showAvatar,
          component: Message
        });
      })
    );

    return state;
  },

  [actionTypes.ADD_NEW_LINK_SNIPPET]: (state, { link }) =>
    state.push(createLinkSnippet(link, MESSAGE_SENDER.RESPONSE)),

  [actionTypes.ADD_COMPONENT_MESSAGE]: (
    state,
    { component, props, showAvatar }
  ) => state.push(createComponentMessage(component, props, showAvatar)),

  [actionTypes.DROP_MESSAGES]: () => List([]),

  [actionTypes.HIDE_AVATAR]: (state, { index }) =>
    state.update(index, message => message.set("showAvatar", false))
};

export default (state = initialState, action) =>
  createReducer(messagesReducer, state, action);

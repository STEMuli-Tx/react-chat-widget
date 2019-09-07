import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import openLauncher from "@assets/launcher_button.svg";
import close from "@assets/clear-button.svg";
import Badge from "./components/Badge";
import "./style.scss";

const Launcher = ({ toggle, profileAvatar, chatOpened, badge }) => (
  <button
    type="button"
    className={chatOpened ? "rcw-launcher rcw-hide-sm" : "rcw-launcher"}
    onClick={toggle}
  >
    <Badge badge={badge} />
    {chatOpened ? (
      <img src={close} className="rcw-close-launcher" alt="" />
    ) : (
      <img
        src={profileAvatar}
        style={{ height: 60, width: 60, borderRadius: "50%" }}
      />
    )}
  </button>
);

Launcher.propTypes = {
  toggle: PropTypes.func,
  chatOpened: PropTypes.bool,
  badge: PropTypes.number
};

export default connect(store => ({
  chatOpened: store.behavior.get("showChat")
}))(Launcher);

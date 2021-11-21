import React from "react";
import SidebarArchives from "./SidebarArchives";
import "../css/sidebarArchives.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-space"></div>
        <div className="sidebar-content">
          <SidebarArchives
            listOfArchives={this.props.listOfArchives}
            handleUnarchive={this.props.handleUnarchive}
            deleteNote={this.props.deleteNote}
            setIsShowArchive={this.props.setIsShowArchive}
            fadeAnimation={this.props.fadeAnimation}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;

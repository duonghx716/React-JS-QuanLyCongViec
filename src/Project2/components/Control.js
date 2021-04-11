import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";
class Control extends Component {
  render() {
    return (
      <div className="row" style={{ marginBottom: 15, marginTop: 15 }}>
        <Search keyWord={this.props.keyWord} />
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <Sort onSort={this.props.onSort} />
        </div>
      </div>
    );
  }
}
export default Control;

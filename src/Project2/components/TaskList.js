import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fillTerName: "",
      fillTerStatus: -1,
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFillTer(
      name == "fillTerName" ? value : this.state.fillTerName,
      name == "fillTerStatus" ? value : this.state.fillTerStatus
    );
    this.setState({
      [name]: value,
    });
    // console.log(this.state);
  };
  render() {
    var { tasks } = this.props;
    var { fillTerName, fillTerStatus } = this.state;
    var element = tasks.map((task, index) => {
      return (
        <TaskItem
          onChangeStatus={this.props.onChangeStatus}
          onDeleteItem={this.props.onDeleteItem}
          onUpdate={this.props.onUpdate}
          task={task}
          key={task.id}
          index={index}
        />
      );
    });
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="fillTerName"
                value={fillTerName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="fillTerStatus"
                value={fillTerStatus}
                onChange={this.onChange}
              >
                <option value="-1">Tất Cả</option>
                <option value="0">Ẩn</option>
                <option value="1">Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {element}
        </tbody>
      </table>
    );
  }
}
export default TaskList;

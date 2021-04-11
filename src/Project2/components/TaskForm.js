import React, { Component } from "react";
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: true,
    };
  }
  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
    // console.log("componentWillMount");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status,
      });
    } else if (!nextProps.task) {
      this.setState({
        id: "",
        name: "",
        status: true,
      });
    }
    console.log(nextProps);
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };
  // onHandleDisplayForm = () => {
  //   this.props.onHandleDisplayForm();
  // };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onHandleSubmit(this.state);
    this.onClearState();
    this.props.onCloseForm();
  };
  onClearState() {
    this.setState({
      name: "",
      status: true,
    });
  }
  onCloseForm = () => {
    this.props.onCloseForm();
    console.log("onCloseForm");
  };
  render() {
    var { id } = this.state;
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {id === "" ? "Thêm mới " : "Cập nhật "} Công Việc
              <span
                className="fa fa-times-circle text-right"
                style={{ marginLeft: 50 }}
                onClick={this.onCloseForm}
              ></span>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <label>Trạng Thái :</label>
              <select
                className="form-control"
                required="required"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
              >
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  {id === "" ? "Thêm mới " : "Cập nhật "}
                </button>
                &nbsp;
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={this.onCloseForm}
                >
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default TaskForm;

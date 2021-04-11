import React, { Component } from "react";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      fillTer: {
        fillTerName: "",
        fillTerStatus: -1,
      },
      keyWord: "",
      sort: {
        name: "name",
        value: 1,
      },
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }
  // onAddData = () => {
  //   let tasks = [
  //     {
  //       id: this.generateID(),
  //       name: "học lập trình",
  //       status: true,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "đi bơi",
  //       status: false,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "đi học bắn súng",
  //       status: true,
  //     },
  //   ];
  //   this.setState({
  //     tasks: tasks,
  //   });
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  }
  onHandleDisplayForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        taskEditing: null,
        isDisplayForm: !this.state.isDisplayForm,
      });
    }

    // this.onShowForm();
  };

  onHandleSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index].name = data.name;
      tasks[index].status = data.status;
    }
    this.setState({
      task: tasks,
      taskEditing: null,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  onChangeStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };
  onDeleteItem = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.onCloseForm();
    }
  };
  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      this.setState({
        taskEditing: tasks[index],
      });
    }
    this.onShowForm();
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };
  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };
  onFillTer = (fillTerName, fillTerStatus) => {
    this.setState({
      fillTer: {
        fillTerName: fillTerName.toLowerCase(), // chuyen sang ky tu thuong
        fillTerStatus: (fillTerStatus = parseInt(fillTerStatus)), // parse string to number
      },
    });
    // console.log(" onFillRer: " + fillTerName + " - " + typeof fillTerStatus);
  };
  keyWord = (keyWord) => {
    this.setState({
      keyWord: keyWord.toLowerCase(),
    });
  };
  onSort = (name, value) => {
    this.setState({
      sort: {
        name: name,
        value: value,
      },
    });
    console.log(this.state.sort);
  };
  render() {
    var {
      tasks,
      isDisplayForm,
      taskEditing,
      fillTer,
      keyWord,
      sort,
    } = this.state;
    if (fillTer) {
      if (fillTer.fillTerName) {
        tasks = tasks.filter((task) => {
          // console.log(
          //   "task.name.toLowerCase(): " + task.name + " _ " + task.status
          // );
          return task.name.toLowerCase().indexOf(fillTer.fillTerName) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (fillTer.fillTerStatus === -1) {
          return task;
        } else {
          console.log(
            " fillterStatus: " + task.status ===
              (fillTer.fillTerStatus === 1 ? true : false)
          );
          return task.status === (fillTer.fillTerStatus === 1 ? true : false); // khong hieu
        }
      });
    }
    if (keyWord) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyWord) !== -1;
      });
    }
    if (sort.name === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return sort.value;
        else if (a.status < b.status) return -sort.value;
        else return 0;
      });
    }
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          {isDisplayForm && (
            <TaskForm
              onCloseForm={this.onCloseForm}
              onHandleSubmit={this.onHandleSubmit}
              task={taskEditing}
            />
          )}
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onHandleDisplayForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={this.onAddData}
            > */}
            {/* <span className="fa"></span>
              ADD Data
            </button> */}
            <Control keyWord={this.keyWord} onSort={this.onSort} />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onChangeStatus={this.onChangeStatus}
                  onDeleteItem={this.onDeleteItem}
                  onUpdate={this.onUpdate}
                  onFillTer={this.onFillTer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;

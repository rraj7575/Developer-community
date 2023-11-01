import React, { Component } from "react";
// import io from 'socket.io-client'
import jwt_decode from "jwt-decode";
import store from "../../store/store";
// import PrivateRoute from "../../App";
import { connect } from "react-redux";
// const socketUrl = 'http://localhost:6000'
// const socket = io(socketUrl)

class Chat extends Component {
  constructor(props) {
    super(props);
    console.log("auth", props.auth);
    this.state = {
      data: [],
      msg: "",
    };
  }

  componentDidMount() {
    // this.initSocket()
    // const self = this
    // socket.emit('previousChat',{
    //   user: self.getCurrentUser()
    // })
  }

  componentDidUpdate() {
    // this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  // initSocket = () => {
  //   const self = this
  //   socket.on('connect', ()=> {
  //     console.log('Socket connected')
  //   })
  //
  //   socket.on('output', function (curData) {
  //     if (curData) {
  //       const data = [...self.state.data, ...curData]
  //       self.setState({data})
  //     }
  //   })
  // }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ msg: value });
  };

  getCurrentUser = () => jwt_decode(localStorage.jwtToken).name;

  submit = () => {
    const self = this;
    const { msg } = this.state;
    this.setState({ msg: "" });
    // socket.emit('input',{
    //   msg,
    //   user: self.getCurrentUser()
    // })
  };

  getChat = (data) => {
    const style = {
      padding: "5px",
      margin: "5px",
      textAlign: "center",
      background: "green",
      color: "white",
    };
    return data.map((val) => (
      <div key={val._id} style={style}>
        {" "}
        {val.user}: {val.message}{" "}
      </div>
    ));
  };

  render() {
    const { msg, data } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-sm-12">
            <h1 className="text-center">Chat</h1>
            <div className="status"></div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name..."
              />
              <br />
              <div className="card" style={{ height: "300px" }}>
                <div
                  className="card-block"
                  style={{
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {data.length > 0 && this.getChat(data)}
                  <div
                    style={{ float: "left", clear: "both" }}
                    ref={(el) => {
                      this.messagesEnd = el;
                    }}
                  ></div>
                </div>
              </div>
              <br />
              <textarea
                className="form-control"
                placeholder="Enter message.."
                value={msg}
                onChange={this.onChange}
              ></textarea>
              <br />
              <button
                className="btn btn-success"
                style={{ width: "528px" }}
                onClick={this.submit}
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Chat);

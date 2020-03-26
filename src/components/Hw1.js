import React, { Component } from "react";

export default class Hw1 extends Component {
  state = {
    username: "",
    password: "",
    list: [],
    disabled: true
  };
  id = 1;
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleInsert = () => {
    const { list, username, password } = this.state;
    this.setState({
      list: list.concat({
        username,
        password,
        id: this.id
      }),
      username: "",
      password: ""
    });
    this.id++;
  };
  render() {
    const { username, password, list, disabled } = this.state;
    return (
      <div>
        <input name="username" value={username} onChange={this.handleChange} />
        <input name="password" value={password} onChange={this.handleChange} />
        <button onClick={this.handleInsert} disabled={disabled}>
          추가하기
        </button>
        <ul>
          {list.map(item => {
            return (
              <li key={item.id}>
                {item.username}의 패스워드는 {item.password}입니다.
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

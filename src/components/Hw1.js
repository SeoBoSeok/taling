import React, { Component, Fragment } from "react";

import "./Hw1.css";

export default class Hw1 extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    list: [],
    disabled: true
  };
  id = 1;
  handleChange = e => {
    const { name, value } = e.target;
    const { username, email, password } = this.state;
    let disabledValue = this.isSafe(username, email, password);
    this.setState({
      [name]: value,
      disabled: disabledValue
    });
  };
  handleInsert = () => {
    const { list, username, email, password } = this.state;
    this.setState({
      list: list.concat({
        username,
        password,
        email,
        id: this.id
      }),
      username: "",
      email: "",
      password: ""
    });
    this.id++;
  };
  isSafe = (name, email, password) => {
    // 조건1. length 6이상
    if (password && password.length >= 6) {
      // 조건2. username을 포함하고 있지 않음
      if (!password.includes(name)) {
        // 조건3. 알파벳 대소문자 각각 하나 이상
        if (new RegExp("(?=.*[a-z])(?=.*[A-Z])").test(password)) {
          // email check 추가
          if (
            new RegExp("^[a-z0-9_+.-]+@([a-z0-9-]+.)+[a-z0-9]{2,4}$").test(
              email
            )
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };
  render() {
    const { username, password, email, list, disabled } = this.state;
    return (
      <Fragment>
        <form>
          <label htmlFor="userName">이름</label>
          <input
            name="username"
            type="text"
            id="userName"
            value={username}
            onChange={this.handleChange}
            placeholder="enter your name"
            required
          />
          <label htmlFor="userEmail">이메일</label>
          <input
            name="email"
            type="email"
            id="userEmail"
            value={email}
            onChange={this.handleChange}
            placeholder="enter your email"
            required
          />
          <label htmlFor="userPassword">비밀번호</label>
          <input
            name="password"
            type="password"
            id="userPassword"
            value={password}
            onChange={this.handleChange}
            placeholder="******"
            required
          />
          <button
            onClick={this.handleInsert}
            disabled={disabled}
            className={disabled ? "" : "active"}
          >
            추가하기
          </button>
        </form>
        <div className="list">
          <ul>
            {list.map(item => {
              return (
                <li key={item.id}>
                  {item.username}의 이메일은 {item.email}이고 패스워드는{" "}
                  {item.password}입니다.
                </li>
              );
            })}
          </ul>
        </div>
      </Fragment>
    );
  }
}

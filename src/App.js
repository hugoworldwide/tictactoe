import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'
import FacebookLogin from 'react-facebook-login'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      moves: [],
      isLogin: false,
      username: '',
      avatar: '',
      score: 0,
      topscore: []
    }
  }

  highScore = async (duration) => {
    let data = new URLSearchParams();
    data.append("player", this.state.username);
    data.append("score", duration);
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString(),
      json: true
    });
    console.log(response)
  }
  //fetch top scorer from database

  getTopScore = async () => {
    let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`
    let data = await fetch(url)
    let result = await data.json()
    console.log(result)
    this.setState({
      topscore: result.items
    })
  }


  componentDidMount() {
    this.getTopScore()
  }

  responseFacebook = (response) => {
    console.log(response);

    this.setState({
      isLogin: true, username: response.name, avatar: response.picture.data.url
    })
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  render() {

    return (
      <>
        <div className="App">
          {this.state.isLogin ? <div>Login</div> :
            <FacebookLogin
              autoLoad={true}
              appId="272280600848337"
              fields="name,email,picture"
              callback={this.responseFacebook}
            />
          }
        </div>
        <div>
          <img src={this.state.avatar}></img>

          {this.state.username}
          {this.state.score}
        </div>
        <div>
          <h1>
            Top Scorer
          </h1>
          <div>

            <ul>
              {this.state.topscore.map(item => {
                return <li><div>
                  Player:{item.player}Score: {item.score}</div></li>
              })}
            </ul>


          </div>
        </div>
        <div>
          <Board {...this.state} setTheState={this.setTheState} moves={this.state.moves} highScore={this.highScore} />
        </div>
      </>
    )
  }


}

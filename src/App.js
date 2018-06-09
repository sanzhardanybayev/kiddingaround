import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
        users: []
    }

    this.loadUsers = this.loadUsers.bind(this)
    this.loadMale= this.loadMale.bind(this)
    this.loadFemale= this.loadFemale.bind(this)
  }

  loadMale(){
    axios.get('http://localhost:3000/gender/Male').then((users) => {
      const { data } = users;
      const usersArray = data.users;
      this.setState({
        users: usersArray
      })
    })
  }

  loadFemale(){
    axios.get('http://localhost:3000/gender/Female').then((users) => {
      const { data } = users;
      const usersArray = data.users;
      this.setState({
        users: usersArray
      })
    })
  }

  loadUsers(){

    axios.get('http://localhost:3000/users').then((users) => {
      const { data } = users;
      const usersArray = data.users;
      this.setState({
        users: usersArray
      })
    })

    toast.success("Hello", {}) // add type: 'success' to options
  }

  render() {
    return (
      <div className={'container'}>
        <div className="row justify-content-between">
          <button onClick={this.loadUsers} className={'col-md-3 btn btn-primary'}>All Users</button>
          <button onClick={this.loadMale} className={'col-md-3 btn btn-primary'}>Male Users</button>
          <button onClick={this.loadFemale} className={'col-md-3 btn btn-primary'}>Female Users</button>
        </div>

        <div className={'row'}>
          <ol>
            { this.state.users.map( user => {
              return <li className={'col-xs-12'}>
                <p> {user.first_name} </p>
                <p> {user.last_name}</p>
                <a href={`mailto:${user.email}`}> {user.email}</a>
              </li>
            }) }
          </ol>

        </div>
        <ToastContainer autoClose={8000} />
      </div>

    );
  }
}

export default App;

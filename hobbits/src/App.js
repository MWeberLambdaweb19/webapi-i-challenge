import React from 'react';
import axios from 'axios';
import './App.css';
import HobbitList from './components/HobbitList';
import AddHobbitForm from './components/AddHobbitForm';
import {Route, Link} from 'react-router-dom';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      hobbits: [],
      message: "",
    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/api/users')
    .then(res => {
      console.log(res.data);
      this.setState({
        hobbits: res.data,
        message: "User data was retrieved."
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        message: "Failed to retrieve the user data."
      })
    })
  }

  deleteItem = id => {
    axios.delete(`http://localhost:4000/api/users/${id}`)
    .then(res => {
      this.setState({
        hobbits: res.data,
        message: "A user was deleted",
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        message: "Failed to delete user from database."
      })
    })
  } 

  addItem (item){
    axios.post("http://localhost:4000/api/users", item)
    .then(res => {
      this.setState({
        hobbits: res.data
      })
      this.props.history.push('/')
    })
    .catch(err => {
      console.log(err)
      this.setState({
        message: "Failed to add User to database."
      })
    })
  }

  render(){
  return (
    <div className="App">
      <h1>Hobbits API</h1>
      <h4>{this.state.message}</h4>
      <Link to="/addHobbit">Click to add a Hobbit!</Link>
      <Route path="/addHobbit" render={
        props => (
          <AddHobbitForm
          {...props}
          addHobbitSubmit={this.addItem} 
          />)}
      />
      <Route exact path="/" render={
        props => (
          <HobbitList 
          {...props}
          hobbitProps={this.state.hobbits}
          deleteItem={this.deleteItem}
          />)}
      />
    </div>
  );
  }
}

export default App;

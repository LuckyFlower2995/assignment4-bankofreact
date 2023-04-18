/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }
  async componentDidMount() {
    let linkToCreditsAPI = 'https://johnnylaicode.github.io/api/credits.json';
    let linkToDebitsAPI = 'https://johnnylaicode.github.io/api/debits.json';
    try {
      let debitL = await axios.get(linkToDebitsAPI);
      //console.log(debitL);
      this.setState({debitList: debitL.data});

      let creditL = await axios.get(linkToCreditsAPI);
      //console.log(creditL);
      this.setState({creditList: creditL.data});
    }
    catch (error) {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    }
  }
  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Update state's debitList after "Add Debit" button is clicked
  addDebit = (debitInfo) => { //debitInfo is just random parameter
    debitInfo.preventDefault();
    const newDebit = 
    { "id": this.state.debitList.length + 1,
      "description": '',
      "amount": 0,
      "date": Date()
    } 
    
    newDebit.description = debitInfo.target[0].value;
    newDebit.amount = debitInfo.target[1].value;

    const newList = [...this.state.debitList];
    newList.push(newDebit);
    this.setState({debitList : newList})
  }


  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
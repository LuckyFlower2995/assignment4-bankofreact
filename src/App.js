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
  
  // Lifestyle method that includes API requests
  async componentDidMount() {
    let linkToCreditsAPI = 'https://johnnylaicode.github.io/api/credits.json';
    let linkToDebitsAPI = 'https://johnnylaicode.github.io/api/debits.json';
    try {
      let debitL = await axios.get(linkToDebitsAPI);
      this.setState({debitList: debitL.data});

      let creditL = await axios.get(linkToCreditsAPI);
      this.setState({creditList: creditL.data});

      // immediatedly sets new amount to accountBalance based on APIs  
      this.newBalance(0,0);
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

  // Update state's creditList after "Add Credit" button is clicked
  addCredit = (creditInfo) => { 
    creditInfo.preventDefault();
    const newCredit = 
    { "id": this.state.creditList.length + 1,
      "description": '',
      "amount": 0,
      "date": new Date()
    } 
    
    //edits input into new credit
    newCredit.description = creditInfo.target[0].value;
    newCredit.amount = creditInfo.target[1].value;
    newCredit.date = newCredit.date.toISOString();

    const newList = [...this.state.creditList];
    newList.push(newCredit);
    this.setState({creditList : newList})
    
    this.newBalance(Number(newCredit.amount),0);
  }

  // Update state's debitList after "Add Debit" button is clicked
  addDebit = (debitInfo) => { 
    debitInfo.preventDefault();
    const newDebit = 
    { "id": this.state.debitList.length + 1,
      "description": '',
      "amount": 0,
      "date": new Date()
    } 
    
    //edits input into new debit
    newDebit.description = debitInfo.target[0].value;
    newDebit.amount = debitInfo.target[1].value;
    newDebit.date = newDebit.date.toISOString();

    const newList = [...this.state.debitList];
    newList.push(newDebit);
    this.setState({debitList : newList})

    this.newBalance(0, Number(newDebit.amount));
  }

  // Gets new accountBalance once Credit/Debit item is added
  // (new item is not included in current state list, so item must be included in parameter)
  newBalance = (newCreditAmount, newDebitAmount) => { 
    let newAmount = this.state.accountBalance;

    var amountCredit = newCreditAmount;
    for(let x = 0; x < (this.state.creditList.length); x++){  
      amountCredit = amountCredit + Number(this.state.creditList[x].amount);
      //console.log(x);
    }
    var amountDebit = newDebitAmount;
    for(let x = 0; x < (this.state.debitList.length); x++){  
      amountDebit = amountDebit + Number(this.state.debitList[x].amount);
    }
    
    newAmount = amountCredit - amountDebit;
    this.setState({accountBalance: newAmount.toFixed(2)});
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} debits={this.state.debitList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} credits={this.state.creditList} addDebit={this.addDebit} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment4-bankofreact">
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
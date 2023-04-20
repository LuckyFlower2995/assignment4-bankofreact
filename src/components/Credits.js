/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {
  // Create the list of Credit items
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }
  
  // Displays total amount of Credit items
  let totalCredit = () => {
    var amountCredit = 0;
    for(let x = 0; x < (props.credits.length); x++){
      amountCredit = amountCredit + Number(props.credits[x].amount);
    }
    return amountCredit.toFixed(2);
  }

  // Displays total amount of Debit items
  let totalDebit = () => {
    var amountDebit = 0;
    for(let x = 0; x < (props.debits.length); x++){
      amountDebit = amountDebit + Number(props.debits[x].amount);
    }
    return amountDebit.toFixed(2);
  }

  // Render the list of Credit items and a form to input new Credit item
  return (
    <div>
      <br/>
      <Link to="/userProfile">User Profile</Link> <></>
      <Link to="/Login">Login</Link> <></>
      <Link to="/Credits">Credit</Link> <></>
      <Link to="/Debits">Debit</Link> <></>
      <br/>
      <h1>Credits</h1>
      
      {creditsView()}
      <br/>
      <form onSubmit={props.addCredit}>
        <div>
          <label>Description: </label>
          <input type="text" name="description" />
    
          <label>Amount: </label>
          <input type="number" name="amount" />
        </div>
        <button type="submit">Add Credit</button>
      </form>
      <br/><br/>
      <div>
        Total Credits: {totalCredit()}
      </div>
      <div>
        Total Debits: {totalDebit()}
      </div>
      <div>
        Account Balance: {props.accountBalance}
      </div>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;
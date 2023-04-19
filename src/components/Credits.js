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
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }

  let totalCredit = () => {
    var amountCredit = 0;
    const { credits } = props;
    credits.map((credit) => {  
      amountCredit = amountCredit + Number(credit.amount);
    });
    return amountCredit.toFixed(2);
  }

  return (
    <div>
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
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;
/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

  // Displays total amount of Debit items
  let totalDebit = () => {
    var amountDebit = 0;
    for(let x = 0; x < (props.debits.length); x++){
      amountDebit = amountDebit + Number(props.debits[x].amount);
    }
    return amountDebit.toFixed(2);
  }
  
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}
      <br/>
      <form onSubmit={props.addDebit}>
        <div>
          <label>Description: </label>
          <input type="text" name="description" />
    
          <label>Amount: </label>
          <input type="number" name="amount" />
        </div>
        <button type="submit">Add Debit</button>
      </form>
      <br/><br/>
      <div>
        Total Debits: {totalDebit()}
      </div>
      <div>
        Total Credits:
      </div>
      <div>
        Account Balance: {props.accountBalance}
      </div>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
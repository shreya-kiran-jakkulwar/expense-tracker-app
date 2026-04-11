import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const addTransaction = () => {
    if (text === "" || amount === "") {
      alert("Please enter all fields");
      return;
    }

    const newTransaction = {
      text: text,
      amount: amount
    };

    setTransactions([...transactions, newTransaction]);

    setText("");
    setAmount("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Expense Tracker</h1>

      <h3>Balance: ₹0</h3>

      <input
        type="text"
        placeholder="Enter description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={addTransaction}>Add Transaction</button>

      <h2>Transactions</h2>

      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.text} - ₹{t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
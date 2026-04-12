import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  // load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("transactions");

    if (savedData) {
      setTransactions(JSON.parse(savedData));
    }
  }, []);

  // save data to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (text === "" || amount === "") {
      alert("Enter all fields");
      return;
    }

    const newItem = {
      text: text,
      amount: Number(amount),
    };

    setTransactions([...transactions, newItem]);

    setText("");
    setAmount("");
  };

  const deleteTransaction = (index) => {
    const updatedList = transactions.filter((item, i) => i !== index);
    setTransactions(updatedList);
  };

  // calculations
  let balance = 0;
  let income = 0;
  let expense = 0;

  for (let i = 0; i < transactions.length; i++) {
    balance = balance + transactions[i].amount;

    if (transactions[i].amount > 0) {
      income = income + transactions[i].amount;
    } else {
      expense = expense + transactions[i].amount;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#92cee2",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Expense Tracker</h1>

        <h3>Income: ₹{income}</h3>
        <h3>Expense: ₹{expense}</h3>
        <h3>Balance: ₹{balance}</h3>

        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          onClick={addTransaction}
          style={{
            padding: "8px 15px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>

        <h2>Transactions</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.map((item, i) => {
            return (
              <li
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "8px 0",
                  padding: "5px",
                  borderBottom: "1px solid #ddd",
                  color: item.amount < 0 ? "red" : "green",
                }}
              >
                <span>
                  {item.text} - ₹{item.amount}
                </span>

                <button onClick={() => deleteTransaction(i)}>X</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
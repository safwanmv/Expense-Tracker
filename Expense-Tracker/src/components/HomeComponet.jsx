import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverViewComponent";
import TransactionComponent from "./TransactionComponent";

const Container = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  width: 360px;
`;
const Header = styled.span`
  color: black;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
`;

function HomeComponent(props) {
  const [transaction, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  const addTransaction = (payload) => {
    const transactionArray = [...transaction];
    transactionArray.push(payload);
    updateTransaction(transactionArray);
  };

  const deleteTransaction = (indexToDelete) => {
    const newTransactions = transaction.filter(
      (_, index) => index !== indexToDelete
    );
    updateTransaction(newTransactions);
  };

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transaction.map((payload) => {
      payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount);
    });
    updateExpense(exp);
    updateIncome(inc);
  };

  useEffect(() => calculateBalance(), [transaction]);

  useEffect(() => {
    const saved = localStorage.getItem("transaction");
    try {
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("Loaded from localStorage:", parsed);
        updateTransaction(parsed);
        calculateBalance(); // ✅ Trigger balance update manually
      } else {
        console.log("No transactions found in localStorage.");
      }
    } catch (e) {
      console.error("Error parsing localStorage data:", e.message);
    }
  }, []);

  useEffect(() => {
    if (transaction.length > 0) {
      localStorage.setItem("transaction", JSON.stringify(transaction));
      calculateBalance();
    }
  }, [transaction]);

  return (
    <Container>
      <Header>Expense Tracker</Header>
      <OverViewComponent
        addTransaction={addTransaction}
        expense={expense}
        income={income}
      />
      
      <TransactionComponent
        transaction={transaction}
        onDelete={deleteTransaction}
      />
    </Container>
  );
}

export default HomeComponent;

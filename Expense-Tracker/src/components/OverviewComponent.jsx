import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: Montserrat;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  margin-bottom: 0;
  width: 100%;
  padding-bottom: 0px;
`;

const BalanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
`;
const AddTranscationSubmit = styled.button`
  background-color: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  font-size: 15px;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
const AddTranscation = styled.div`
  background-color: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  font-size: 15px;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
const AddTranscationContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e8e9;
  gap: 10px;
  padding: 10px;
  margin-top: 10px;
  width: 100%;

  box-sizing: border-box;
  & input {
    padding: 10px 20px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const AnimatedBox = styled.div`
  width: 100%; /* Full width */
  max-width: 600px; /* Optional: max width to avoid stretching too wide */
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 0.5s ease, transform 0.5s ease;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
  margin-bottom:6px;
`;

function AddTranscationView(props) {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");

  const addTransaction = (e) => {
    e.preventDefault();
    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });
    props.toggleAddTxn();
  };
  return (
    <form onSubmit={addTransaction}>
      <AddTranscationContainer>
        <input
          type="number"
          placeholder="Amount"
          min="0"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          required
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          required
        />

        <RadioBox>
          <input
            type="radio"
            id="expense"
            name="type"
            value="EXPENSE"
            checked={type === "EXPENSE"}
            required
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="expense">Expense</label>
          <input
            type="radio"
            name="type"
            id="income"
            value="INCOME"
            checked={type === "INCOME"}
            required
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="income">Income</label>
        </RadioBox>

        <AddTranscationSubmit type="submit">
          Add Transaction
        </AddTranscationSubmit>
      </AddTranscationContainer>
    </form>
  );
}
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;
const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  padding: 15px 20px;
  width: 135px;
  font-size: 14px;

  & span {
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => (props.$isIncome ? "green" : "red")};
  }
`;


function OverViewComponent(props) {
  const [isAddTxnVisible, toggleAddTxn] = useState(false);
  return (
    <Container>
      <BalanceBox>
        Balance:₹{props.income-props.expense}
        <AddTranscation onClick={() => toggleAddTxn(!isAddTxnVisible)}>
          {" "}
          {isAddTxnVisible ? "CANCEL " : "ADD"}{" "}
        </AddTranscation>
      </BalanceBox>
      <ExpenseContainer $isIncome={false}>
        <ExpenseBox>
          Expnese<span> ₹{props.expense} </span>
        </ExpenseBox>

        <ExpenseBox $isIncome={true}>
          Income<span>₹{props.income} </span>
        </ExpenseBox>
      </ExpenseContainer>
      <AnimatedBox $isVisible={isAddTxnVisible}>
        {/*  here when the isaddtxnvisible is assigned to visible so at first it is false  */}
        {isAddTxnVisible && (
          <AddTranscationView
            toggleAddTxn={toggleAddTxn}
            addTransaction={props.addTransaction}
          />
        )}
      </AnimatedBox>
    </Container>
  );
}

export default OverViewComponent;


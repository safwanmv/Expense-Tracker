import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";

const Container = styled.div`
  font-family: Montserrat;
  display: flex;
  align-items: cne;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  gap: 10px;
  & input {
    outline: none;
    padding: 10px 20px;
    border-radius: 12px;
    background: #e6e6e6;
    border: 1px solid #e6e6e6;
    width: 100%;
  }
  & p {
    color: #737373;
    font-size: medium;
    width: 100%;
    margin-left: 115px;

    font-weight: 500;
  }
`;
const Cell = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 28px;
  font-size: 15px;
  border-radius: 4px;
  align-items: center;
  font-weight: normal;
  border: 1px solid #e6e6e6;
  border-right: 4px solid ${(props) => (props.$isExpense ? "red" : "green")};
  box-sizing: border-box;

  & .desc {
    flex: 2;
    text-align: left;
  }

  & .amount {
    flex: 1;
    text-align: right;
    margin-right: 20px;
  }

  & button {
    flex-shrink: 0;
    background: none;
    cursor: pointer;
    font-size: 16px;
    border: none;
    transition: transform 0.5s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const TransactionCell = (props) => {
  return (
    <Cell $isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload.desc}</span>
      <span>₹{props.payload.amount} </span>
      <button onClick={() => props.onDelete(props.index)}>❌</button>
    </Cell>
  );
};



function TransactionComponent(props) {
  const [searchText,updateSearchText]=useState("")
  const [filteredTransaction,updateTxn]=useState(props.transaction)

  const filterData=(searchText)=>{
    

    let txn=[...props.transaction];
    txn=txn.filter((payload)=>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    )
    updateTxn(txn)
  }

useEffect(() => {
    updateTxn(props.transaction);
    filterData(searchText);
  }, [props.transaction]);

  return (
    <Container>
      Transaction
      <input type="text" placeholder="Search" onChange={(e)=>{updateSearchText(e.target.value); filterData(e.target.value) }} value={searchText}   />
      {filteredTransaction?.length > 0 ? (
        filteredTransaction.map((payload, index) => (
          <TransactionCell
            key={index}
            index={index}
            payload={payload}
            onDelete={props.onDelete}
          />
          
        ))
      ) : (
        <p>No Transaction Yet</p>
      )}
    </Container>

    
  );
}

export default TransactionComponent;

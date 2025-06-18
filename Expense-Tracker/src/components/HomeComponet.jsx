import React, { useState } from 'react'
import styled from 'styled-components';
import OverviewComponent from './OverviewComponent';
import TransactionComponent from './TransactionComponent';
const Container=styled.div`
    font-family: Montserrat;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0 10px;
    width: 360px;
`

function HomeComponet() {

    const [transaction,updateTransaction]=useState([]);
    const [expense,updateExpense]=useState(0);
    const [income,updateIncome]=useState(0);
  return (
    <Container>
      <OverviewComponent />
      <TransactionComponent/>
    </Container>
  )
}

export default HomeComponet

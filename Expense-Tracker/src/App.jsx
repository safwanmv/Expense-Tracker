import { useState } from 'react'
import styled from "styled-components"
import HomeComponet from './components/HomeComponet'

const Container=styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  font-family: Montserrat;
  margin: 0 10px;
`
function App() {


  return (
    <>
      <Container>
        <HomeComponet/>
      </Container>
    </>
  )
}

export default App

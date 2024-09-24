import GlobalStyle from "./styles/global"
import styled from "styled-components"
import Grid from "./components/grid.js"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import { useEffect,useState } from "react";
import Form from "./components/form.js";
import axios from "axios"



const Container = styled.div`
width: 100%;
max-width: 800px;
margin-top: 20px;
display:flex;
flex-direction:column;
align-items: center;
gap:10px;
`;

const Title = styled.h2 ``;



function App() {

  const [ users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  
  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : - 1)))
    } catch ( error){
      toast.error(error)
    }
  }

  useEffect(()=>{
    getUsers();
  }, [setUsers]);


const notify = () => toast ("Testando ne ");

  return (
    <>

    <Container>
      <Title>USUARIOS</Title>
      <Form getUsers={getUsers} onEdit={onEdit} setOnEdit={setOnEdit}>

      </Form>
      <Grid users={users} setUsers={setUsers}  setOnEdit={setOnEdit} > </Grid>
    </Container>

<ToastContainer autoClose={3000}/>
    <GlobalStyle />

    </>
  );
}

export default App;

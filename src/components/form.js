import React, { useState,useEffect, useRef } from "react"
import styled from "styled-components"
import {toast} from "react-toastify"
import axios from "axios"


const FormContainer = styled.form`
display:flex;
align-items:flex-center;
gap:10px;
flex-wrap:wrap;
background-color:#fff;
padding:40px;
box-shadow:0px 0px 5px #ccc;
border-radius:5px;

`;

const InputArea = styled.div`
display:flex;
flex-direction:column;
margin:0.5rem;

`;


const Input = styled.input` 
width:120px;
padding: 0 10px;
border: 1px solid #bbb;
border-radius: 5px;
heigth: 40px;
`;

const Label = styled.label``;

const Button= styled.button`
  padding:10px;
  cursor:pointer;
  border-radius:5px;
  border:none;
  background-color: #2c73d2;
  color:white;
  heigth:42px;

`;

const Form = ({onEdit, setOnEdit, getUsers}) =>{

  const ref = useRef();

  useEffect(() =>{
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email
      user.telefone.value = onEdit.telefone
      user.datanasc.value = onEdit.datanasc
    }
  }, [onEdit])

  const hadleSubmit = async (e) =>{
    e.preventDefault();
    const user = ref.current;

    if(
      !user.nome.value ||
      
      !user.email.value ||
      
      !user.telefone.value ||
      
      !user.datanasc.value 
    ){
      return toast.warn ("Preencha todos os campos")
    }

    if ( onEdit){
      await axios .put ("http://localhost:8800" + onEdit.id,{
        nome:user.nome.value,
        email:user.email.value,
        telefone:user.telefone.value,
        datanasc:user.datanasc.value,
      })

      .then(({data}) => toast.success(data))
      .catch(({data}) => toast.error(data))
    }
    else {   
      await axios .post ("http://localhost:8800" ,{
      nome:user.nome.value,
      email:user.email.value,
      telefone:user.telefone.value,
      datanasc:user.datanasc.value,
    })

    .then(({data}) => toast.success(data))
    .catch(({data}) => toast.error(data))
  }
user.nome.value = "";
user.email.value = "";
user.telefone.value = "";
user.datanasc.value = "";
  setOnEdit(null);
  getUsers();
  }

  return (

    <FormContainer ref={ref} onSubmit={  hadleSubmit}>
      <InputArea>
      <Label >
        nome
      </Label>
      <Input type="text"  name="nome"/>
      </InputArea> 

      <InputArea>
      <Label htmlFor="">E-mail</Label>
      <Input name="email" type="email"/>
      </InputArea>

      <InputArea>
      <Label htmlFor="">telefone</Label>
      <Input name="telefone"/>
      </InputArea>

      <InputArea>
      <Label></Label>
      <Label htmlFor="">Data Nascimento</Label>
      <Input type="date" name="datanasc"/>
      </InputArea>

      <Button   type="submit">Confirmar</Button>
    </FormContainer>
  )
}

export default Form;
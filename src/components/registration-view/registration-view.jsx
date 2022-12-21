import React, { useState } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import { Row, Col, Button, Container, Form } from 'react-bootstrap'

import './registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [nameErr, setNameErr] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');


  const validate = () => {
    let isReq = true;
    if (!name) {
      setNameErr('Name Required');
      isReq = false;
    }
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr('Username must be at least 3 characters long');
      isReq = false;
    }

    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 5) {
      setPassword('Password must be at least 5 characters long');
      isReq = false;
    }

    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmail('Email is invalid');   // Include more proper/robust email validation logic later. also, setEmail or setEmailErr?
      isReq = false;
    }

    return isReq
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://elt-myflix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful')
          window.open('/', '_self');
        })
        .catch(e => {
          console.error(e);
          alert('Unable to register');
        });
    };
  }


  return (

    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
        {nameErr && <p>{nameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
        {emailErr && <p>{emailErr}</p>}
      </Form.Group>

      <Button className="registrationButton" variant="success" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  )


}
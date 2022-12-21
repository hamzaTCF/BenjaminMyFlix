import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

// import Button from 'react-bootstrap/Button';
import { Button, Form } from 'react-bootstrap';

import './login-view.scss';



export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //From midway through 3.6 - below is me 'Declaring a hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false
    } else if (username.length < 3) {
      setUsernameErr('Username must be at least 3 characters long');
      isReq = false
    }

    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 5) {
      setPassword('Password must be at least 5 characters long');
      isReq = false;
    }

    return isReq
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://elt-myflix.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    };
  }

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
        {/*Code apparently added here for displaying validation error. or is that whats just below?*/}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {/*As before, code here for displaying validation error.*/}
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Button className="loginButton" variant="success" type="submit" onClick={handleSubmit}>
        Submit
      </Button>

      <Link to={`/register`}>
        <Button className="registrationButton" variant="success">
          Register
        </Button>
      </Link>

    </Form>
  )

}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};


import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Card, Form, Container } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './user-view.scss';

//user, movies, setUser, onBackClick

export function UserView(props) {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');

  const [nameErr, setNameErr] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const userFaves = props.user.FavoriteMovies?.map((movieId) =>
    props.movies.find((movie) => movie._id === movieId)
  );

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

    if (!birthday) {
      setBirthdayErr('Birthday Required');
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
    const token = localStorage.getItem("token");
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.put(
        `https://elt-myflix.herokuapp.com/users/${props.user.Username}`,
        {
          Username: username,
          Password: password,
          Birthday: birthday,
          Email: email
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Update successful')
          props.setUser(response.data)
        })
        .catch(e => {
          console.error(e);
          alert('Unable to update');
        });
    };
  }

  return (
    <>
      <div>
        <p>Name: {props.user.Username}</p>
        <p>Email: {props.user.Email}</p>
        <p>Birthday: {props.user.Birthday}</p>
      </div>
      <div>
        <p>Favorite Movies:</p>

        <ul>
          {userFaves?.map((fm) => (
            <li key={fm._id}>{fm.Title}</li>
          ))}
        </ul>

      </div>


      <Card>
        <h3>Update information</h3>
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

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            {birthdayErr && <p>{birthdayErr}</p>}
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>

          <Button className="registrationButton" variant="success" type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </Card>
    </>
  )

}

UserView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }).isRequired,
  movies: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
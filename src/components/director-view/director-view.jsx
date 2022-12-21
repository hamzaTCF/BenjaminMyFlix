import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Card, Container } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './director-view.scss';


export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, moviesDirected } = this.props;

    console.log(moviesDirected)

    return (
      <div>
        <h3>{director.Name}</h3>
        <p>Born: {director.Birth}</p>
        <p>Biography: {director.Bio}</p>

        <p>Movies directed by {director.Name}:</p>

        <ul>
          {moviesDirected?.map(m => (
            <div key={m._id}>{m.Title}</div>
          ))}
        </ul>


      </div>

    )

  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired,
  moviesDirected: PropTypes.array.isRequired,
  onBackClick: PropTypes.func.isRequired,

};
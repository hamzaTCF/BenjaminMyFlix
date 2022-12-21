import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <Card className="movie-cards">
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body className="test">
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movieData)} variant="success">Open</Button>
        </Card.Body>
      </Card>
    )

  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
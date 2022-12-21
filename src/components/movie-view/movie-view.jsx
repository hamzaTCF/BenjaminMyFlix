import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  isFaved(movie) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.FavoriteMovies.includes(movie._id);
  }

  addFaveMovie(e) {
    const { movieData, setUser } = this.props;
    const username = JSON.parse(localStorage.getItem("user")).Username;
    const token = localStorage.getItem("token");

    e.preventDefault();
    axios
      .post(
        `https://elt-myflix.herokuapp.com/users/${username}/movies/${movieData._id}`,
        {}, { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        setUser(response.data);
        alert("Movie added");
      })
      .catch((error) => console.error(error));
  }

  removeFaveMovie(e) {
    const { movieData, setUser } = this.props;
    const username = JSON.parse(localStorage.getItem("user")).Username;
    const token = localStorage.getItem("token");

    e.preventDefault();
    axios
      .delete(
        `https://elt-myflix.herokuapp.com/users/${username}/movies/${movieData._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        setUser(response.data);
        alert("Movie removed");
      })
      .catch((error) => console.error(error));
  }


  render() {
    const { movieData, onBackClick } = this.props;

    if (!movieData) return <></>;

    console.log(movieData);


    return (
      <Modal show={movieData} onHide={() => { onBackClick(null) }}>

        <Modal.Header>
          <Modal.Title>{movieData.Title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{movieData.Description}</p>

          <div class="links">
            <Link to={`/directors/${movieData.Director.Name}`}>
              <Button variant="link" className="director-button">{movieData.Director.Name}</Button>
            </Link>

            <Link to={`/genres/${movieData.Genre.Name}`}>
              <Button variant="link">{movieData.Genre.Name}</Button>
            </Link>
          </div>

          <div class="movie-poster"><img src={movieData.ImagePath} /></div>
        </Modal.Body>


        <Modal.Footer>
          {!this.isFaved(movieData) ? (
            <Button variant="success" onClick={(e) => this.addFaveMovie(e)}>
              {" "}
              Add to Favorites{" "}
            </Button>
          ) : (
            <Button variant="success" onClick={(e) => this.removeFaveMovie(e)}>
              {" "}
              Remove from Favorites{" "}
            </Button>
          )}
          <Button variant="success" onClick={() => { onBackClick(null); }}
          >
            Back
          </Button>
        </Modal.Footer>

      </Modal>
    )

  }
}


MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
    }),
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired
};

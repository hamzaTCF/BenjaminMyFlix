import React from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

import Container from 'react-bootstrap/Container';

import './index.scss';

//Main component (will eventually use all others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}



// For finding the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Create root out of root dom element
const root = createRoot(container)

console.log(123);

// Tells react to render your app in the root DOM element
root.render(<MyFlixApplication />)
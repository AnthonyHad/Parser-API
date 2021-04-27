import React, { Component } from 'react';

// Importing react-Sky package
import Sky from 'react-sky';

// Importing Images for background animations
import molecule1 from "../images/molecule1.png"
import molecule2 from "../images/molecule2.png"
import molecule3 from "../images/molecule3.png"

class Background extends Component {

  // Imposing that Background doesn't render on each app state change
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Sky
          images={{
            0: molecule1,
            1: molecule2,
            2: molecule3
          }}
          how={100}
          time={500}
          size={'120px'}
        />
      </div>
    );
  }
}

export default Background;

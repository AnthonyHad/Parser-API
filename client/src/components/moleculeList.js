import React from 'react';

import MoleculeDisplay from './moleculeDisplay'

const MoleculeList = (props) => {
  const object = props.molecule;

  if(typeof props.molecule === 'string') {
    return(<p>{props.molecule}</p>)
  } else {
    const items = Object.entries(object).map(([key, value]) =>
    <MoleculeDisplay key={key.toString()} element={key} count={value} />
    );

    return (
      <ul>
        {items}
      </ul>
    )
  }
}

export default MoleculeList;

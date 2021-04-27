import React from 'react';
import '../stylesheets/moleculeDisplay.css'

import { motion } from 'framer-motion'

//Font Awesome imports
import { faLongArrowAltRight  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MoleculeDisplay = (props) => {

  return <motion.li
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.5, duration: 1, type: 'tween', stiffness: 200}}
        > {props.element} <FontAwesomeIcon icon={ faLongArrowAltRight } /> {props.count}</motion.li>
};

export default MoleculeDisplay;

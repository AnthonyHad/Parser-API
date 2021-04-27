//Assumptions:

//1) Molecule delimiters should strictly be of the same type
//a user cannot input "(SO3]" should be either "(SO3), [SO3] or {SO3}"

//2) Elements should exist in the periodic table


const moleculeParser = (molecule) => {

    //Defining initial variables
    const chemicalElements = [,"H", "He","Li","Be","B","C","N","O","F","Ne","Na"
                              ,"Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti"
                              ,"V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge"
                              ,"As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru"
                              ,"Rh","Pd","Ag","Cd","In","Sn","Sb"
                              ,"Te","I","Xe","Cs","Ba","La","Ce","Pr"
                              ,"Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu"
                              ,"Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi"
                              ,"Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm"
                              ,"Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh"
                              ,"Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"];
    let delimiterMatch = {
      '(': ')',
      '[': ']',
      '{': '}'
    }

    let parsedMolecule = {};

    // Main loop on the inputed string
    for (let i = 0; i < molecule.length; i++) {

        //Check if molecule is just consisting of empty delimiters
        if(molecule.match(/\{\}|\[\]|\(\)/)) {
          return "your molecule cannot be void!"
        }
        //K2(NO2(SO3)2)4
        //Checks if a molecule starts with any delimiters
        if (molecule.charAt(i).match(/\(|\[|{/)) {
            let delimiter = molecule[i];
            let delimiterCounter = 0;

            // Returns an error message if the molecule starts and is only a special character
            if (i === molecule.length - 1)  {
                return "molecule cannot just start with a special character"
            }

            //Once an opening special character is identified the inside content
            //is concatenated to extract the elements present inside until opposing delimiter is matched
            let subMolecule = "";

            while (!(molecule[i + 1] === delimiterMatch[delimiter] && delimiterCounter === 0)) {
              //Accounting for the case where we have nested delimiters of the same type
              if(molecule[i+1] === delimiter) delimiterCounter++;
              if(molecule[i+1] === delimiterMatch[delimiter] && delimiterCounter > 0)  delimiterCounter--;
              subMolecule += molecule[i + 1];
              i++;

              // Returns an error message if the sub molecule ends with wrong delimiters
              if (i === molecule.length - 1) {
                return "molecule delimiters should be of the same type ex: (SO3) not (SO3]"
              }
            }
            i++;

            // We callback the parsed molecule function on the extracted sub molecule,
            // this time it will skip this if block and return a normal parsed molecule
            let subParsedMolecule = moleculeParser(subMolecule)

            // Checks if a single digit is present at the end of the delimiters
            if (molecule.charAt(i + 1).match(/\d/)) {
                let digit = molecule[i + 1];
                // Checks for more than one digit after the delimiters
                while(molecule.charAt(i + 2).match(/\d/)){
                  digit += molecule[i + 2]
                  i++
                }
                let multiplier = parseInt(digit);
                i++;

                for (let key of Object.keys(subParsedMolecule)) {
                    subParsedMolecule[key] *= multiplier;
                }
            }

            // Adds the subParsed molecule elements to the main parsed molecule while validating elements
            for (const [key, value] of Object.entries(subParsedMolecule)) {
              if(chemicalElements.includes(key)) {
                if (key in parsedMolecule) {
                  parsedMolecule[key] += value;
                } else {
                  parsedMolecule[key] = value;
                }
              } else {
                return "your molecule is not discovered yet! please enter a molecule from this planet"
              }
            }
          }
        //Checks if the first element starts with a capital letter
        else if (molecule[i].match(/[A-Z]/)) {
          let elem = molecule[i];
          let totalNumber = 1; // initializing element count to 1

          if (i !== molecule.length - 1) {
            //Checks for the presence of a downcased letter after the first upcased letter
            //and concatenates them into 1 element
            if (molecule.charAt(i + 1).match(/[a-z]/)) {
              elem += molecule[i + 1];
              i++;
            }
            // Checks for digit presence after element and adds it to the count
            if ((i !== molecule.length - 1) && molecule.charAt(i + 1).match(/\d/)) {
              let digit = molecule[i + 1];
                // Checks for the presence of more than one digit
                while(molecule.charAt(i + 2).match(/\d/)){
                  digit += molecule[i + 2]
                  i++
                }
              totalNumber = parseInt(digit);
              i++;
            }
          }

          // Checks if the elements present in the object are
          // chemical elements in the periodic table and then adds them to the main object
          if(chemicalElements.includes(elem)) {
            if (elem in parsedMolecule) {
              parsedMolecule[elem] += totalNumber;
            } else {
              parsedMolecule[elem] = totalNumber;
            }
          } else {
              return "your molecule is not discovered yet! please enter a molecule from this planet"
          }
        } else {
            return "your molecule is not discovered yet! please enter a molecule from this planet"
          }
    }
    return parsedMolecule;
  }
module.exports = moleculeParser;

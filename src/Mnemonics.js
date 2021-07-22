import React from 'react';

import { useEffect,useState } from 'react';



const  Mnemonics  = () => {


    const [mnemonics, setMnemonics] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8000/mnemonics')
            .then(response => response.json()) 
            .then(data => {
                 
                  setMnemonics(data)}
            );
      });
      

    return (<ul>{mnemonics.map((mnemonic) => (
        <li key={mnemonic}>{mnemonic}</li>
       ))}</ul>);

}

export default Mnemonics;
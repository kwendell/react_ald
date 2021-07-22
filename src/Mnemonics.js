import React from 'react';

import { useEffect,useState } from 'react';



const  Mnemonics  = () => {


    const [mnemonics, setMnemonics] = useState([]);

    const liStyle = {
	    fontSize: 14,
		fontFamily: "monospace",
		color: "#0080A8",
		
		backgroundColor: "#FFFFFF",
		
	   };


    useEffect(() => {
        fetch('http://localhost:8000/mnemonics')
            .then(response => response.json()) 
            .then(data => {
                data.sort(function (a, b) {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                });
                  setMnemonics(data)}
            );
      });
      

    return (<ul>{mnemonics.map((mnemonic) => (
        <li style={liStyle} key={mnemonic}>{mnemonic}</li>
       ))}</ul>);

}

export default Mnemonics;
import React from 'react';

import { useEffect,useState } from 'react';




const  Mnemonics  = () => {


    const [mnemonics, setMnemonics] = useState([]);

   
    const liStyle = {
	    fontSize: 14,
		fontFamily: "monospace",
		
      
      
		color: "#0080A8",
        backgroundColor: "#f1f1f1",
       
		
	   };
       const width_proportion = '20%';
       const float_value = 'left';
       const tableStyle = {
        width:width_proportion,
        float:float_value,
        backgroundColor: "#f1f1f1",
       };
       


   
      

    return (<table style={tableStyle}>{mnemonics.map((mnemonic) => (
        <tr><td style={liStyle} key={mnemonic}>{mnemonic}</td><td><button onClick={console.log("button click")} key={mnemonic+"btn"} id={mnemonic+"btn"} type="submit">+</button></td></tr>
       ))}</table>);

}

export default Mnemonics;
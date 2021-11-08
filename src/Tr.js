import React from 'react';
// <tr key={index} onDoubleClick={() => {gatherData(layout[2])}} ><td className="td-lg"  key={layout[0]} >{layout[0]}</td><td className="td-lg"  key={layout[2]} >{layout["tagType"]}</td><td className="td-lg"  key={layout[3]+index} >{layout[3]}</td></tr>
const Tr  = (props) => {
 {
  
  return (
    <tr  onDoubleClick={props.onDoubleClick}></tr>
  );
}
}

export default Tr;

import React from 'react';


import me from './images/meTransparent.png';
import nato from './images/NATO.png';
import pencil from './images/pencil.png';
//import projects from './images/meProjects.png';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  
    this.canvasRef = React.createRef();
    this.natoRef = React.createRef();
    this.meRef = React.createRef();
    this.pencilRef = React.createRef();
    
 
    this.semi_major_axis = this.props.semi_major_axis;
    
   
     const semi_minor_axis = this.semi_major_axis*this.props.eccentricity;
    
   
     this.c = Math.sqrt(this.semi_major_axis**2-semi_minor_axis**2);
    
     this.item_path=this.props.item_path;
    
   
     

  }
  
  componentDidUpdate() {

    const canvas = this.canvasRef.current;
     const natoImg = this.natoRef.current;
     const pencilImg = this.pencilRef.current;
     const me = this.meRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
   
    let x = this.props.r*Math.cos(this.props.angle);
       let y = this.props.r*Math.sin(this.props.angle);
  
   
   ctx.clearRect(0, 0, canvas.width, canvas.height);
 
   
  }
  
  render() {
    return <div><canvas width="1000" height="290"  ref={this.canvasRef} > 
    <img ref={this.natoRef} src={nato} className="hidden" />
    <img ref={this.pencilRef} src={pencil} className="hidden" />
    <img ref={this.meRef} src={me} className="hidden" />
    </canvas>
   
    </div>;
  }
}

export default Canvas
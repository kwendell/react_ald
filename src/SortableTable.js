
import React from 'react';
import { useEffect,useState } from 'react';
import { Table } from 'reactstrap';



const SortableTable  = () => {



var React = require('react');
var ReactDOM = require('react-dom');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

const [layouts, setLayouts] = useState([]);



useEffect(() => {
  fetch('http://localhost:8000/layouts')
      .then(response => response.json()) 
      .then(data => {
         
            setLayouts(data)}
      );
})

return(
  <BootstrapTable data={layouts} striped hover>
      <TableHeaderColumn isKey dataField='wdt_tag_type_str'>Tag Type</TableHeaderColumn>
      <TableHeaderColumn dataField='update_date'>Last Updated</TableHeaderColumn>
      <TableHeaderColumn dataField='pricing_scenario'>Pricing</TableHeaderColumn>
  </BootstrapTable>
 
);

}

export default SortableTable;
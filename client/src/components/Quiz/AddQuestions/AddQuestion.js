import React from 'react'
import Sidebar from '../../SideBarNav/SideBar'
import "../../Questions/InnerLayout.css"
import AddDescriptive from './AddDescriptive/AddDescriptive';
import AddMcq from './AddMcq/AddMcq';
import { Alert,Button,Modal ,Dropdown,DropdownButton} from "react-bootstrap";
import { useState } from 'react';

const AddQuestion = (props) => {
    const[type,setType] = useState();
    const [tableComponent,setTableComponent] = useState(false);
    const handleTypeSelect = (e) => {
        console.log(e);
        setType(e);
        if(e === "mcq"){
          setTableComponent(<AddMcq  credentials={props.credentials}/>)
        }
        else if(e === "descriptive"){
          setTableComponent(<AddDescriptive credentials={props.credentials}/>)
        }
      };
  return (
    <div>
        <Sidebar/>
        <div className='tableContainer'>
            <Button size="sm" variant="success" onClick={props.setViewForm}>Back</Button>
        <div className="m-1">
                  <DropdownButton
                  align="end"
                  title="Select the Question Type"
                  id="dropdown-menu-align-end"
                  onSelect={handleTypeSelect}
                >
                  <Dropdown.Item eventKey="mcq">Multiple Choice Type</Dropdown.Item>
                  <Dropdown.Item eventKey="descriptive">Descriptive Type</Dropdown.Item>
                  
                </DropdownButton>
                </div>

                {tableComponent}
        </div>
    </div>
  )
}

export default AddQuestion
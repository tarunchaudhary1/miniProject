import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle ,Table,DropdownButton,Dropdown} from "react-bootstrap";
import axios from "axios";

import "../../Questions/InnerLayout.css"
import Sidebar from "../../SideBarNav/SideBar";
import { useTheme } from "../../../Context";

const AllResultsList = () => {
  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
  const [categ, setCateg] = useState("");
  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    SetViewShow(false);
  };
  //FOr Edit Model
  const [ViewEdit, SetEditShow] = useState(false);
  const handleEditShow = () => {
    SetEditShow(true);
  };
  const hanldeEditClose = () => {
    SetEditShow(false);
  };
  //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false);
  const handleDeleteShow = () => {
    SetDeleteShow(true);
  };
  const hanldeDeleteClose = () => {
    SetDeleteShow(false);
  };
  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    SetPostShow(true);
  };
  const hanldePostClose = () => {
    SetPostShow(false);
    setcategory("")
    setquestion("")
    setanswer("")
  };

  //Define here local state that store the form Data
  const [category, setcategory] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const [error, setError] = useState("");

  const [Delete, setDelete] = useState(false);
  const[sortedData,setSortedData] = useState(Data)

  //Id for update record and Delete
  const [id, setId] = useState("");

    // For pagination 
const [currentPage, setCurrentPage] = useState(1)
const recordPerPage = 10; 
const lastIndex = currentPage * recordPerPage;
const firstIndex = lastIndex - recordPerPage;
const records = Data.slice(firstIndex, lastIndex);
const npages = Math.ceil(Data.length / recordPerPage)
const numbers = [...Array(npages + 1).keys()].slice(1)

function prePage(){
  if(currentPage !== firstIndex){
    setCurrentPage(currentPage - 1)
  }
}

function changeCPage(id) {
   setCurrentPage(id)
}

function nextPage() {
    if(currentPage !== lastIndex){
      setCurrentPage(currentPage + 1)
    }
}
/////
  const GetResultData = () => {
    //here we will get all employee data
    const url = "http://backend.healthynomad:8080/api/mcqResults";
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        //console.log(result);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          alert(message, status);
        } else {
          setData(data);
          setSortedData(data);
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    let sorted = [];
    
    if(e.target.value.trim().length !== 0){
      Data.map((element) => {
        if (element.username.includes(e.target.value)) {
          sorted.push(element);
        }
      });

      
      setSortedData((data) => {
        setSortedData(sorted);
        
      });
    }
    else{
      setSortedData(Data)
    }
    
  };
  //call this function in useEffect
  // console.log(ViewShow, RowData)
  useEffect(() => {
    GetResultData();
    setSortedData(Data);
  }, []);

  const theme = Boolean(useTheme());
	const themeClassName = theme ? "tableContainer_dark":"tableContainer";          
    
  const backCol = theme ? "#444444" : "	#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  return (
    <>
    <Sidebar/>
      <div className={themeClassName}>
        <h1>MCQ Result List</h1>
      <div className="mt-5 mb-4 display-row">
        <div className="m-1">
          <form className="d-flex" role="search">
            <input
             className={`${theme ? "search_bar_dark no-outline_dark" : "search_bar no-outline"}`}
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearch}
            />
          </form>
        </div>
      </div>
      <Table className={`table-hover table-bordered ${theme ? "table-dark table-striped" : "table table-striped"}`}>
            <thead>
              <tr>
                
                <th>Sl No.</th>
                <th>Username</th>
                <th>Quizname</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Percentage</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {sortedData !== undefined &&
                records.map((item, index) => {

               return ( <tr key={item._id} className="p-3">
                  
                      <td>{index + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.quizName}</td>
                      <td>{item.totalMarks}</td>
                      <td>{item.obtainedMarks}</td>
                      <td>{item.percentage}</td>
                      <td>{item.pass?"Pass":"Fail"}</td>
                </tr>)
})}
            </tbody>
          </Table>
          <nav>
            <ui className='pagination'>
              <li className='page-item'>
                <a href='#' className="page-link"
                onClick={prePage}>Prev</a>
              </li>
                {
                  numbers.map((n, i) =>(
                    <li className={`page-item ${currentPage === n ? 'active' : '' }`} key={i}>
                      <a href='#' className='page-link'
                      onClick={()=> changeCPage(n)}>{n}</a>

                    </li>
                  ))
                }
                <li className='page-item'>
                <a href='#' className="page-link"
                onClick={nextPage}>Next</a>
              </li>
            </ui>
          </nav>
     
    </div>
    
   
    </>
    
  );
};

export default AllResultsList;
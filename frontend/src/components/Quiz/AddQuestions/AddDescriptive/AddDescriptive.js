import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalTitle,
  Table,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "../../../Questions/InnerLayout.css";
import Sidebar from "../../../SideBarNav/SideBar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../Context";

const AddDescriptive = () => {
  const staticData = [
    {
      _id: 1,
      category: "1",
      question: "What is React?",
      answer: "React is a JavaScript library",
    },
    {
      _id: 2,
      category: "2",
      question: "Explain hooks",
      answer:
        "Hooks are functions that let you use state in functional components",
    },
    {
      _id: 3,
      category: "3",
      question: "What is JSX?",
      answer: "JSX is a syntax extension for JavaScript",
    },
  ];

  const [Data] = useState(staticData);
  const [sortedData, setSortedData] = useState(staticData);
  const [existingArray, setExistingArray] = useState([]);
  const [categ, setCateg] = useState("");
  const { id } = useParams();

  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const handleCategorySelect = (e) => {
    setCateg(e);
    if (Number(e)) {
      const sorted = Data.filter(
        (element) => Number(element.category) === Number(e)
      );
      setSortedData(sorted);
    } else {
      setSortedData(Data);
    }
  };

  const handleSearch = (e) => {
    if (e.target.value.trim().length !== 0) {
      const sorted = Data.filter((element) =>
        element.question.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSortedData(sorted);
    } else {
      setSortedData(Data);
    }
  };

  const handleAddQuestion = (item) => {
    setExistingArray((prev) => [...prev, item]);
  };

  const handleRemove = (item) => {
    setExistingArray((prev) => prev.filter((q) => q._id !== item._id));
  };

  useEffect(() => {
    setSortedData(Data);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="tableContainer">
        <h3 className={`header-top my-2 ${theme ? "text-white" : ""}`}>
          Add Comprehensive Questions
        </h3>

        <div className="container my-table">
          <div className="mt-5 mb-4 display-row">
            <div>
              <DropdownButton
                align="end"
                title="Sort By Question Category"
                id="dropdown-menu-align-end"
                onSelect={handleCategorySelect}
              >
                <Dropdown.Item eventKey="-">-----</Dropdown.Item>
                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                <Dropdown.Item eventKey="4">4</Dropdown.Item>
                <Dropdown.Item eventKey="5">5</Dropdown.Item>
              </DropdownButton>
            </div>
            <div>
              <form className="d-flex" role="search">
                <input
                  className={theme ? "search_bar_dark" : "search_bar"}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
            <div style={{ marginTop: "30px", marginLeft: "50px" }}>
              <Link
                to={`/quiz/addnewquiz/add_comp_user/${id}`}
                className={
                  theme ? "button_dark_success" : "button_light_success"
                }
              >
                Add Questions
              </Link>
            </div>
          </div>
          <Table
            className={`table-hover table-bordered ${
              theme ? "table-dark table-striped" : "table table-striped"
            }`}
          >
            <thead>
              <tr>
                <th>Select Questions</th>
                <th>Question No.</th>
                <th>Category</th>
                <th>Questions</th>
                <th>Sample Answer</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={existingArray.find((q) => q._id === item._id)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          handleAddQuestion(item);
                        } else {
                          handleRemove(item);
                        }
                      }}
                      id="flexCheckDefault"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AddDescriptive;

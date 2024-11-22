import React, { useState } from "react";
import {
  Modal,
  Table,
  Dropdown,
  DropdownButton,
  Badge,
} from "react-bootstrap";
import { useTheme } from "../../../../Context";

const MCQList = () => {
  const theme = Boolean(useTheme());
  const themeClassName = theme ? "tableContainer_dark" : "tableContainer";
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  // Static data
  const staticData = [
    {
      _id: "1",
      category: "1",
      question: "What is React?",
      option1: "A JavaScript library",
      option2: "A database",
      option3: "A programming language",
      option4: "An operating system",
      correct: "1"
    },
    {
      _id: "2",
      category: "2",
      question: "What is JSX?",
      option1: "JavaScript XML",
      option2: "Java Syntax Extension",
      option3: "JavaScript Extension",
      option4: "Java XML",
      correct: "1"
    }
  ];

  const [sortedData, setSortedData] = useState(staticData);
  const [ViewShow, SetViewShow] = useState(false);
  const [RowData, SetRowData] = useState({});
  const [ViewEdit, SetEditShow] = useState(false);
  const [ViewPost, SetPostShow] = useState(false);

  const handleViewShow = () => SetViewShow(true);
  const hanldeViewClose = () => SetViewShow(false);
  const handleEditShow = () => SetEditShow(true);
  const hanldeEditClose = () => SetEditShow(false);
  const hanldePostClose = () => SetPostShow(false);

  const handleCategorySelect = (e) => {
    if (Number(e)) {
      const filtered = staticData.filter(item => Number(item.category) === Number(e));
      setSortedData(filtered);
    } else {
      setSortedData(staticData);
    }
  };

  const handleSearch = (e) => {
    if (e.target.value.trim().length !== 0) {
      const filtered = staticData.filter(item => 
        item.question.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSortedData(filtered);
    } else {
      setSortedData(staticData);
    }
  };

  return (
    <div className={themeClassName}>
      <div className="mb-4 display-row">
        <div>
          <DropdownButton
            title="Sort By Question Category"
            id="dropdown-menu-align-end"
            onSelect={handleCategorySelect}
          >
            <Dropdown.Item eventKey="-">-----</Dropdown.Item>
            <Dropdown.Item eventKey="1">1</Dropdown.Item>
            <Dropdown.Item eventKey="2">2</Dropdown.Item>
          </DropdownButton>
        </div>
        <div>
          <input
            className={theme ? "search_bar_dark no-outline_dark" : "search_bar no-outline"}
            type="search"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="container my-table">
        <Table className={theme ? "table-dark table-striped" : "table table-striped"}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Questions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item._id}>
                <td>{item.category}</td>
                <td>{item.question}</td>
                <td style={{ minWidth: 190 }}>
                  <button
                    className={theme ? "button_dark_small" : "button_light_small"}
                    onClick={() => {
                      handleViewShow();
                      SetRowData(item);
                    }}
                  >
                    View
                  </button>
                  <button
                    className={theme ? "button_dark_small_warning" : "button_light_small_warning"}
                    onClick={() => {
                      handleEditShow();
                      SetRowData(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* View Modal */}
      <Modal show={ViewShow} onHide={hanldeViewClose}>
        <Modal.Header closeButton className={theme ? "custom_modal_dark" : "custom_modal"}>
          <Modal.Title>View Question</Modal.Title>
        </Modal.Header>
        <Modal.Body className={theme ? "custom_modal_dark" : "custom_modal"}>
          <div className="form-group">
            <label>Category</label>
            <input type="text" className="form-control" value={RowData.category} readOnly />
          </div>
          <div className="form-group mt-3">
            <label>Question</label>
            <input type="text" className="form-control" value={RowData.question} readOnly />
          </div>
          {/* Add other form fields as needed */}
        </Modal.Body>
        <Modal.Footer className={theme ? "custom_modal_dark" : "custom_modal"}>
          <button className={theme ? "button_dark" : "button_light"} onClick={hanldeViewClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MCQList;
import React, { useState } from "react";
import {
  Button,
  Modal,
  Table,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "../../InnerLayout.css";
import { useTheme } from "../../../../Context";

const DescriptiveList = () => {
  const theme = Boolean(useTheme());
  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  // Static data
  const staticData = [
    { _id: 1, category: "1", question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
    { _id: 2, category: "2", question: "Explain useState", answer: "useState is a React Hook that lets you add state to functional components." },
    { _id: 3, category: "3", question: "What is JSX?", answer: "JSX is a syntax extension for JavaScript, recommended for use with React." }
  ];

  const [sortedData, setSortedData] = useState(staticData);
  const [ViewShow, SetViewShow] = useState(false);
  const [RowData, SetRowData] = useState({});

  const handleViewShow = () => SetViewShow(true);
  const hanldeViewClose = () => SetViewShow(false);

  const handleCategorySelect = (e) => {
    if (e === "-") {
      setSortedData(staticData);
      return;
    }
    
    const sorted = staticData.filter(item => item.category === e);
    setSortedData(sorted);
  };

  const handleSearch = (e) => {
    if (e.target.value.trim().length === 0) {
      setSortedData(staticData);
      return;
    }
    
    const sorted = staticData.filter(item => 
      item.question.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSortedData(sorted);
  };

  return (
    <div className="my-body">
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
          </DropdownButton>
        </div>
        <div>
          <input
            className={theme ? "search_bar_dark no-outline_dark" : "search_bar no-outline"}
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="container my-table">
        <Table className={theme ? "table-dark table-striped" : "table table-striped"}>
          <thead>
            <tr>
              <th>Question No.</th>
              <th>Category</th>
              <th>Questions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.category}</td>
                <td>{item.question}</td>
                <td>
                  <button
                    className={theme ? "button_dark_small" : "button_light_small"}
                    onClick={() => {
                      SetRowData(item);
                      handleViewShow();
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* View Modal */}
      <Modal
        show={ViewShow}
        onHide={hanldeViewClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className={theme ? "custom_modal_dark" : "custom_modal"}>
          <Modal.Title>View Question</Modal.Title>
        </Modal.Header>
        <Modal.Body className={theme ? "custom_modal_dark" : "custom_modal"}>
          <div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                value={RowData.category || ''}
                readOnly
              />
            </div>
            <div className="form-group mt-3">
              <label>Question</label>
              <input
                type="text"
                className="form-control"
                value={RowData.question || ''}
                readOnly
              />
            </div>
            <div className="form-group mt-3">
              <label>Answer</label>
              <input
                type="text"
                className="form-control"
                value={RowData.answer || ''}
                readOnly
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={theme ? "custom_modal_dark" : "custom_modal"}>
          <Button variant="secondary" onClick={hanldeViewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DescriptiveList;
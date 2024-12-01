// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ExamPlatform {
    enum ExamType { MCQ, Descriptive }
    
    struct ExamRecord {
        string personName;
        string email;
        string examName;
        uint256 score;
        ExamType examType;
        uint256 timestamp;
    }
    
    mapping(string => ExamRecord[]) private examRecords;
    
    string[] private allEmails;
    
    event ExamRecordAdded(string personName, string email, string examName, uint256 score);
    
    function addExamRecord(
        string memory _personName,
        string memory _email,
        string memory _examName,
        uint256 _score,
        ExamType _examType
    ) public {
        ExamRecord memory newRecord = ExamRecord({
            personName: _personName,
            email: _email,
            examName: _examName,
            score: _score,
            examType: _examType,
            timestamp: block.timestamp
        });
        
        if(examRecords[_email].length == 0) {
            allEmails.push(_email);
        }
        
        examRecords[_email].push(newRecord);
        
        emit ExamRecordAdded(_personName, _email, _examName, _score);
    }
    
    function getExamRecordsByEmail(string memory _email) 
        public 
        view 
        returns (ExamRecord[] memory) 
    {
        return examRecords[_email];
    }
    
    function getTotalStudents() public view returns (uint256) {
        return allEmails.length;
    }
    
    function getExamCountForStudent(string memory _email) 
        public 
        view 
        returns (uint256) 
    {
        return examRecords[_email].length;
    }
}
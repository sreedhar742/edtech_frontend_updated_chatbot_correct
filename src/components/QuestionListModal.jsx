import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './QuestionListModal.css';

const QuestionListModal = ({ show, onHide, questionList = [], onQuestionClick }) => {
  const handleQuestionClick = (questionData, index) => {
    // Extract the necessary data from the question object
    const selectedQuestion = {
      question: questionData.question,
      image: questionData.question_image ? `data:image/png;base64,${questionData.question_image}` : null
    };
    
    // Call the onQuestionClick prop with the processed data
    onQuestionClick(selectedQuestion.question, index, selectedQuestion.image);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="question-modal">
      <Modal.Header closeButton>
        <Modal.Title>Question List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="question-list-container">
          {questionList && questionList.length > 0 ? (
            <ul className="question-list">
              {questionList.map((questionData, index) => (
                <li
                  key={index}
                  className="question-item"
                  onClick={() => handleQuestionClick(questionData, index)}
                >
                  <div className="question-number">{index + 1}</div>
                  <div className="question-content">
                    <div className="question-text">
                      {questionData.question}
                    </div>
                    {questionData.question_image && (
                      <div className="question-image-preview">
                        <img 
                          src={`data:image/png;base64,${questionData.question_image}`}
                          alt={`Question ${index + 1}`}
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionListModal;
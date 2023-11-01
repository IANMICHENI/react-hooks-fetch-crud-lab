import React from "react";

function QuestionItem({ question, onDelete, onDropdownChange }) {
  const { id, prompt, answers, correctIndex } = question;

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      {answers.map((answer, index) => (
        <p key={index}>{`Answer ${index + 1}: ${answer}`}</p>
      ))}
      <label>
        Correct Answer:
        <select
          value={correctIndex} // Set the value of the dropdown to correctIndex
          onChange={(e) => onDropdownChange(id, parseInt(e.target.value))}
        >
          {[0, 1, 2, 3].map((index) => (
            <option key={index} value={index}>
              Answer {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

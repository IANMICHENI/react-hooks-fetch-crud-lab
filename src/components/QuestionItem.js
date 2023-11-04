import React, { useState }from "react";

function QuestionItem({ question , onDeleteQuestion}) {
  const { id, prompt, answers, correctIndex } = question;
  const [newCorrectIndex, setNewCorrectIndex] = useState(correctIndex)


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteQuestion() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(() => onDeleteQuestion(id));
  }

  function handleAnswer(event) {
    const updatedIndex = event.target.value;
    setNewCorrectIndex(updatedIndex);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      Headers: { "Content-Type": "application/json" },
      body: { correctIndex: updatedIndex },
    })
      .then(response => response.json())
      .then(() => updatedIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={newCorrectIndex} onChange={handleAnswer}>{options}</select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
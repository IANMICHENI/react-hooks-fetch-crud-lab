import React, { useState } from "react";

function QuestionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const handleChange = (index, event) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = event.target.value;
    setFormData({
      ...formData,
      answers: newAnswers,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={formData.prompt}
            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
          />
        </label>
        {[1, 2, 3, 4].map((index) => (
          <label key={index}>
            Answer {index}:
            <input
              type="text"
              value={formData.answers[index - 1]}
              onChange={(e) => handleChange(index - 1, e)}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            value={formData.correctIndex}
            onChange={(e) => setFormData({ ...formData, correctIndex: e.target.value })}
          >
            {[0, 1, 2, 3].map((index) => (
              <option key={index} value={index}>
                Answer {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

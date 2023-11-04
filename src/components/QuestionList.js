import React,  { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(questions => setQuestions(questions));
  }, []);
  function handleDeleteQuestion(id) {
    const newQuestions = questions.filter(question => question.id !== id);
    setQuestions(newQuestions);
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {questions.map(question => {
          return (
            <QuestionItem
              key={question.id}
              question={question}
              onDeleteQuestion={handleDeleteQuestion}
            />
            );
          })}
      </ul>
    </section>
  );
}

export default QuestionList;
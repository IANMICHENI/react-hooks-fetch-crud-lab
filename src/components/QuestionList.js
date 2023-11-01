import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import { act } from "react-dom/test-utils";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true; // Variable to track component mount status

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        if (isMounted) {
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false; // Set isMounted to false when the component is unmounted
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleDropdownChange = async (id, correctIndex) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex: correctIndex.toString() }),
      });

      // Wrap state update inside act
      act(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === id ? { ...q, correctIndex: correctIndex.toString() } : q
          )
        );
      });
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onDropdownChange={handleDropdownChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

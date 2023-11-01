import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import { act } from "react-dom/test-utils";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true;

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

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newQuestion = await response.json();
        act(() => {
          setQuestions([...questions, newQuestion]);
        });
      } else {
        console.error("Error creating question:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmit={handleFormSubmit} /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;

import React, { useState, useEffect, useContext } from "react";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import axiosInstance from "../../axios/axiosConfig";
import EditContext from "../../context/EditContext";
import EditQuestionPopup from "../../components/EditQuestion/EditQuestionPopup";
import DeletePopup from "../../components/DeletePopup/DeletePopup";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // Store filtered items
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { edit, updateEditState, toDelete, deleteItem } =
    useContext(EditContext);

  const getQuestion = async () => {
    try {
      const request = await axiosInstance.get("/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setQuestions(request.data);
    } catch (error) {
      alert("Something went wrong while fetching questions.");
      console.error("Error fetching data:", error);
    }
  };

  const toAskQuestion = () => {
    navigate("/ask");
  };

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchTerm(text); // Update the search term
  };

  useEffect(() => {
    if (token) {
      getQuestion();
    } else {
      alert("You need to log in to see questions.");
      navigate("/login"); // Redirect to login if token is not present
    }
  }, [token, navigate]);

  // Effect to filter questions whenever searchTerm or questions changes
  useEffect(() => {
    const updatedItems = questions.filter((question) => {
      return question.title.toLowerCase().includes(searchTerm);
    });
    setFilteredItems(updatedItems); // Update the filtered list
  }, [searchTerm, questions]); // Only run this effect when searchTerm or questions change

  return (
    <div className={classes.page__container}>
      <div className={classes.question__header}>
        <button className={classes.ask__button} onClick={toAskQuestion}>
          Ask Question
        </button>
        <p className={classes.welcome__text}>
          Welcome: <span className={classes.username}>{user.username}</span>
        </p>
      </div>

      <div className={classes.search__bar}>
        <input
          value={searchTerm}
          onChange={handleSearch}
          type="text"
          placeholder="Search questions"
        />
      </div>
      {filteredItems.length === 0 ? ( // Check if filtered items are available
        <p>No questions found.</p>
      ) : (
        (filteredItems || questions).map((question) => (
          <QuestionCard key={question.question_id} question={question} /> // Use unique key prop
        ))
      )}
      {edit && <EditQuestionPopup onClose={() => updateEditState(false)} />}
      {toDelete && (
        <DeletePopup onClose={() => deleteItem(false)} topic="question" />
      )}
    </div>
  );
}

export default Home;

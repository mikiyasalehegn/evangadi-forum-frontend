import React, { useContext } from "react";
import { X } from "lucide-react";
import classes from "./DeletePopup.module.css"; // Import custom CSS file
import EditContext from "../../context/EditContext";
import axiosInstance from "../../axios/axiosConfig";

function DeletePopup({ onClose, topic }) {
  const { deleteItem, question, answer } = useContext(EditContext);
  const questionId = question?.question.question_id;
  const answerId = answer?.answer.answer_id;
  const token = localStorage.getItem("token");
  const questionUrl = `/questions/${questionId}`;
  const answerUrl = `/answer/${answerId}`;
  console.log(topic);
  const url = topic == "question" ? questionUrl : answerUrl;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      axiosInstance.delete(url, {
        // This is the config object for headers
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Question deleted Successfully!");
      deleteItem(false);
      window.location.href = window.location.href;
    } catch (error) {
      alert("Something went wrong");
      deleteItem(false);
      console.log(error);
    }
  };

  return (
    <div className={classes.popup__overlay}>
      <div className={classes.popup__container}>
        <button onClick={onClose} className={classes.close__button}>
          <X size={30} />
        </button>
        <div className={classes.popup__content}>
          <div className={classes.question__section}>
            <h2>{`Delete your ${topic}`}</h2>
            <form onSubmit={handleSubmit}>
              <div className={classes.delete__question__section}>
                <label htmlFor="text">
                  {topic === "answer" ? "Answer" : "Question title"}
                </label>
                <hr />
                <p>
                  *{" "}
                  {topic === "question"
                    ? question?.question.title
                    : answer?.answer.content}
                </p>
                <button type="submit" className={classes.delete__button}>
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;

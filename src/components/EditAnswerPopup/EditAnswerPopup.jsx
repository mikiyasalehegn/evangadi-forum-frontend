import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import classes from "./EditAnswerPopup.module.css"; // Import custom CSS file
import EditContext from "../../context/EditContext";
import axiosInstance from "../../axios/axiosConfig";

function EditAnswerPopup({ onClose }) {
  const { updateEditState } = useContext(EditContext);
  const { answer } = useContext(EditContext);
  const [answerContent, setAnswerContent] = useState(answer?.answer.content);
  const answerId = answer?.answer.answer_id;
  const token = localStorage.getItem("token");

  const handleContentChange = (event) => {
    setAnswerContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if both title and content are unchanged
    if (answer.answer.content === answerContent) {
      alert("No changes detected. Please update either the title or content.");
      return;
    }

    try {
      axiosInstance.patch(
        `/answer/${answerId}`,
        {
          // This is the body of the request
          answer: answerContent,
        },
        {
          // This is the config object for headers
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(answerContent);
      alert("Answer updated Successfully!");
      updateEditState(false);
      window.location.href = window.location.href;
    } catch (error) {
      alert("Something went wrong");
      updateEditState(false);
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
            <h2>Edit your answer</h2>
            <form onSubmit={handleSubmit}>
              <div className={classes.post__answer__section}>
                <label htmlFor="text">Answer</label>
                <hr />
                <textarea
                  id="content"
                  value={answerContent}
                  onChange={handleContentChange}
                />
                <button type="submit" className={classes.post__button}>
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAnswerPopup;

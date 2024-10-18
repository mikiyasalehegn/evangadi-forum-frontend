import React, { useContext } from "react";
import classes from "./QuestionCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import EditContext from "../../context/EditContext";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import UpdateTooltip from "../UpdateTooltip/UpdateTooltip";

function QuestionCard({ question }) {
  const { updateEditState, updateQuestion, deleteItem } =
    useContext(EditContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleEditClick = (e) => {
    e.stopPropagation();
    updateEditState(true);
    updateQuestion({ question });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteItem(true);
    updateQuestion({ question });
  };

  const toAnswers = (id) => {
    navigate(`/answers/${id}`);
  };

  return (
    <div
      onClick={() => toAnswers(question?.question_id)}
      key={question?.id}
      className={classes.question__container}
    >
      <div className={classes.user__and__question}>
        <div className={classes.user__info}>
          <div className={classes.user__icon}>
            {/* user icon */}
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className={classes.user__email}>{question?.username}</div>
        </div>
        <div className={classes.user__question}>{question?.title}</div>
      </div>
      <div>
        {/* Arrow/edit icon */}
        {user.userid == question.user_id ? (
          <UpdateTooltip
            content={
              <div className={classes.update__tooltip}>
                <div>
                  <FaRegEdit
                    onClick={handleEditClick}
                    className={classes.edit__icon}
                  />
                  <p>Edit</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    onClick={handleDelete}
                    icon={faTrashCanArrowUp}
                    className={classes.delete__icon}
                  />
                  <p>Delete</p>
                </div>
              </div>
            }
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/");
              }}
              className={classes.update_box}
            >
              <FontAwesomeIcon icon={faCircleExclamation} />
              <p>Update</p>
            </div>
          </UpdateTooltip>
        ) : (
          <MdOutlineKeyboardArrowRight
            className={classes.bold__arrow}
            size={50}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionCard;

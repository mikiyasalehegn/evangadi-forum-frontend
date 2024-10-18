import React, { useContext } from "react";
import classes from "./AnswerCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FaRegEdit } from "react-icons/fa";
import EditContext from "../../context/EditContext";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import UpdateTooltip from "../UpdateTooltip/UpdateTooltip";
import { useNavigate } from "react-router-dom";

function AnswerCard({ answer }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { updateEditState, updateAnswer, deleteItem } = useContext(EditContext);
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation();
    updateEditState(true);
    updateAnswer({ answer });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteItem(true);
    updateAnswer({ answer });
  };

  return (
    <div className={classes.question__container}>
      <div className={classes.user__and__question}>
        <div className={classes.user__info}>
          <div className={classes.user__icon}>
            {/* user icon */}
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className={classes.user__email}>{answer?.user_name}</div>
        </div>
        <div className={classes.user__question}>{answer.content}</div>
      </div>

      <div>
        {/* Arrow/edit icon */}
        {user.username == answer?.user_name ? (
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
        ) : null}
      </div>
    </div>
  );
}

export default AnswerCard;

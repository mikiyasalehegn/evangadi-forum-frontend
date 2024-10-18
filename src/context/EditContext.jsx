import { createContext, useState } from "react";

const EditContext = createContext();

// Create a provider component
export const EditProvider = ({ children }) => {
  const [edit, setEdit] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const [question, setQuestion] = useState(null); // New state
  const [answer, setAnswer] = useState(null); // New state

  // Update function (can be called from any component that consumes the context)
  const updateEditState = (newState) => {
    setEdit(newState);
  };
  const deleteItem = (newState) => {
    setToDelete(newState);
  };

  const updateQuestion = (newQuestion) => {
    setQuestion(newQuestion);
  };

  const updateAnswer = (newAnswer) => {
    setAnswer(newAnswer);
  };

  return (
    <EditContext.Provider
      value={{
        edit,
        updateEditState,
        toDelete,
        deleteItem,
        question,
        updateQuestion,
        answer,
        updateAnswer,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;

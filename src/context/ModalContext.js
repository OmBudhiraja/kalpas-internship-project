import { createContext, useState } from "react";

export const ModalContext = createContext(null);

const ModalProvider = ({ children }) => {
  const [postModal, setPostModal] = useState(false);
  const [feedbackSlide, setFeedbackSlide] = useState(false);
  return (
    <ModalContext.Provider
      value={{ postModal, setPostModal, feedbackSlide, setFeedbackSlide }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

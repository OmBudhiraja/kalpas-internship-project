import { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../context/ModalContext";

const FeedbackBtn = () => {
  const { setFeedbackSlide } = useContext(ModalContext);

  return (
    <FeedbackContainer>
      <h2>Have a Feedback?</h2>
      <Button onClick={() => setFeedbackSlide((prev) => !prev)}>
        We're listening!
      </Button>
    </FeedbackContainer>
  );
};

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  margin: 0 60px;
  box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.19);
  border-radius: 8px;
  @media screen and (max-width: 1200px) {
    margin: 0 50px;
  }
  @media screen and (max-width: 1100px) {
    margin: 0 35px;
  }
`;

const Button = styled.button`
  background-color: #76caa6;
  border-radius: 8px;
  border: none;
  outline: none;
  padding: 15px 40px;
  margin: 20px 0 10px 0;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  align-items: center;
  display: inline;
  @media screen and (max-width: 1100px) {
    padding: 15px 20px;
  }
`;

export default FeedbackBtn;

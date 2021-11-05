import { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../context/ModalContext";
import FeedbackBtn from "./FeedbackBtn";
import FeedbackForm from "./FeedbackForm";
import ViewToggler from "./ViewToggler";

const Sidebar = () => {
  const { feedbackSlide } = useContext(ModalContext);

  return (
    <Wrapper feedbackSlide={feedbackSlide}>
      <SidebarStyled>
        <UserContainer>
          <Avatar
            src="https://images.unsplash.com/photo-1485290334039-a3c69043e517?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80"
            alt="avatar"
          />
          <section>
            <h4>Hi Reader,</h4>
            <p>Here's your news!</p>
          </section>
        </UserContainer>
        {!feedbackSlide && <ViewToggler />}
        <FeedbackBtn />
      </SidebarStyled>
      {feedbackSlide && <FeedbackForm />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: ${(props) => (props.feedbackSlide ? "100vw" : "400px")};
  box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.29);
  border-radius: 0 15px 15px 0;
  position: fixed;
  display: flex;
  background-color: ${(props) =>
    props.feedbackSlide ? "rgba(0, 0, 0, 0.19)" : "#ebf2f7"};
  transition: width 0.3s ease-in;
  display: flex;
  z-index: 20;
  backdrop-filter: blur(5px);
  @media screen and (max-width: 1200px) {
    width: ${(props) => (props.feedbackSlide ? "100vw" : "350px")};
  }
  @media screen and (max-width: 1100px) {
    width: ${(props) => (props.feedbackSlide ? "100vw" : "310px")};
  }
`;

const SidebarStyled = styled.div`
  height: 100vh;
  width: 390px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ebf2f7;
  gap: 35px;
  padding-top: 60px;
  @media screen and (max-width: 1200px) {
    width: 345px;
    padding-top: 40px;
  }
  @media screen and (max-width: 1100px) {
    width: 300px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  border-radius: 8px;
  margin: 0 60px;
  padding: 10px;
  box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.19);
  @media screen and (max-width: 1200px) {
    margin: 0 50px;
  }
  @media screen and (max-width: 1100px) {
    margin: 0 35px;
  }
`;

const Avatar = styled.img`
  height: 55px;
  width: 55px;
  border-radius: 50%;
  margin-right: 15px;
`;

export default Sidebar;

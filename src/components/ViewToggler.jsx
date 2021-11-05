import React, { useContext } from "react";
import styled from "styled-components";
import { BsCardHeading, BsListUl } from "react-icons/bs";
import { ViewContext } from "../context/ViewContext";
import { motion } from "framer-motion";

const ViewToggler = () => {
  const { viewState, setViewState } = useContext(ViewContext);

  return (
    <ToggleContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>View Toggle</h2>
      <BtnContainer>
        <CardViewBtn onClick={() => setViewState("card")} viewState={viewState}>
          <BsCardHeading color={viewState === "list" ? "#8c8f91" : "black"} />
        </CardViewBtn>
        <ListViewBtn onClick={() => setViewState("list")} viewState={viewState}>
          <BsListUl color={viewState === "card" ? "#8c8f91" : "black"} />
        </ListViewBtn>
      </BtnContainer>
    </ToggleContainer>
  );
};

const ToggleContainer = styled(motion.div)`
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

const BtnContainer = styled.div`
  margin: 25px 0 10px 0;
  @media screen and (max-width: 1100px) {
    margin: 15px 0 10px 0;
  }
  button {
    border: none;
    outline: none;
    cursor: pointer;
    padding: 10px 30px;
    transition: all 0.5s ease-in-out;
    svg {
      transition: all 0.5s ease-in-out;
      width: 35px;
      height: 35px;
      @media screen and (max-width: 1100px) {
        width: 25px !important;
        height: 25px !important;
      }
    }
  }
`;

const CardViewBtn = styled.button`
  border-radius: 6px 0 0 6px;
  background-color: ${(props) =>
    props.viewState === "card" ? "#76caa6" : "#d9e0e8"};
`;
const ListViewBtn = styled.button`
  border-radius: 0px 6px 6px 0px;
  background-color: ${(props) =>
    props.viewState === "list" ? "#76caa6" : "#d9e0e8"};
`;

export default ViewToggler;

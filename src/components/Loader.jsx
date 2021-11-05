import React from "react";
import styled from "styled-components";

const Loader = () => {
  return <Spinner />;
};

const Spinner = styled.div`
  border: 14px solid #d9e0e8; //"#76caa6" : "#d9e0e8"
  border-top: 14px solid #76caa6;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1.5s linear infinite;
  position: absolute;
  top: 43%;
  left: 60%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;

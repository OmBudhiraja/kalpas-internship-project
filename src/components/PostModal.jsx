import { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ModalContext } from "../context/ModalContext";

const PostModal = () => {
  const { postModal, setPostModal } = useContext(ModalContext);

  if (!postModal) return null;

  const closePostModal = (e) => {
    if (e.target.className === "modal-image") return;
    setPostModal(false);
  };

  return (
    <ModalContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={closePostModal}
    >
      <img
        src="https://i.ibb.co/wScFtR9/screen.png"
        className="modal-image"
        alt="blog modal"
      />
    </ModalContainer>
  );
};

const ModalContainer = styled(motion.div)`
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 85vw;
  }
`;

export default PostModal;

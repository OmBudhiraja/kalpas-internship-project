import { useContext } from "react";
import styled from "styled-components";
import { ViewContext } from "../context/ViewContext";
import { TiTimes } from "react-icons/ti";
import { motion } from "framer-motion";
import { ModalContext } from "../context/ModalContext";

const Post = ({ post }) => {
  const { viewState } = useContext(ViewContext);
  const { setPostModal } = useContext(ModalContext);

  if (viewState === "list") {
    return (
      <ListView
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => setPostModal(true)}
      >
        <ListContainer>
          <ListAvatar src="https://picsum.photos/100" alt="post image" />
          <ListInfo>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
            <span>Mon, 21 Dec 2020 14:57 GMT</span>
          </ListInfo>
        </ListContainer>
        <CrossBtn>
          <TiTimes size="30px" color="#5a8d77" />
        </CrossBtn>
      </ListView>
    );
  }

  return (
    <CardView
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => setPostModal(true)}
    >
      <h4>
        {post.title.substring(0, 30)}
        {post.title.length > 30 && "..."}{" "}
      </h4>
      <p>{post.body.substring(0, 45)}...</p>
      <span>Mon, 21 Dec 2020 14:57 GMT</span>
      <CardAvatar src="https://picsum.photos/180/100" alt="post image" />
      <TiTimes className="cross-btn-card" size="30px" color="#76bd9e" />
    </CardView>
  );
};

const ListView = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListContainer = styled.div`
  background-color: white;
  box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 20px 25px 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  cursor: pointer;
`;

const ListAvatar = styled.img`
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const ListInfo = styled.div`
  width: 600px;
  /* max-width: 600px; */
  h5,
  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  p {
    margin: 5px 0 7px 0;
  }
  span {
    font-size: 13px;
    font-weight: bold;
    color: #c9bebe;
  }
  @media screen and (max-width: 1400px) {
    width: 530px;
  }
  @media screen and (max-width: 1300px) {
    width: 450px;
  }
  @media screen and (max-width: 1200px) {
    width: 400px;
  }
`;

const CrossBtn = styled.div`
  background: white;
  border-radius: 50%;
  box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.29);
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CardView = styled(motion.div)`
  position: relative;
  padding: 25px 20px 15px;
  background-color: whhite;
  box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.29);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  cursor: pointer;
  max-width: 250px;
  .cross-btn-card {
    position: absolute;
    right: 0px;
    top: 5px;
    cursor: pointer;
  }
  p {
    margin: 7px 0 9px;
  }
  span {
    display: block;
    font-size: 13px;
    font-weight: bold;
    color: #c9bebe;
    margin-bottom: 15px;
  }
`;

const CardAvatar = styled.img`
  border-radius: 5px;
  width: 100%;
  object-fit: cover;
`;

export default Post;

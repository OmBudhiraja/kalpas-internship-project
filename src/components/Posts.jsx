import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Pagination from "./Pagination";
import styled from "styled-components";
import Post from "./Post";
import { ViewContext } from "../context/ViewContext";

const Posts = () => {
  const POSTS_PER_PAGE = 6;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageNr, setCurrentPageNr] = useState(1);

  const { viewState } = useContext(ViewContext);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPageNr * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) return <Loader />;

  return (
    <PostsContainer>
      <PostLayout viewState={viewState}>
        {currentPosts.length &&
          currentPosts.map((post) => <Post post={post} key={post.id} />)}
      </PostLayout>
      <Pagination
        currentPageNr={currentPageNr}
        setCurrentPageNr={setCurrentPageNr}
        postsPerPage={POSTS_PER_PAGE}
        totalPosts={posts.length}
      />
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 60px;
  margin-left: 420px;
  @media screen and (max-width: 1200px) {
    padding-top: 40px;
  }
  @media screen and (max-width: 1100px) {
    margin-left: 330px;
  }
`;

const PostLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.viewState === "list" ? "1fr" : "1fr 1fr 1fr"};
  grid-row-gap: ${(props) => (props.viewState === "list" ? "20px" : "40px")};
  grid-column-gap: ${(props) => (props.viewState === "list" ? "0" : "40px")};
  margin-bottom: 20px;
`;

export default Posts;

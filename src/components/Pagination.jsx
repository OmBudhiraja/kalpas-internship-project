import React, { useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import styled from "styled-components";

const Pagination = ({
  setCurrentPageNr,
  currentPageNr,
  postsPerPage,
  totalPosts,
}) => {
  const pageNumbers = [];
  const PAGE_NR_LIMIT = 3;

  const [maxPageNrLimit, setMaxPageNrLimit] = useState(3);
  const [minPageNrLimit, setMinPageNrLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevPageNr = () => {
    setCurrentPageNr((prev) => prev - 1);
    if (currentPageNr + 1 < maxPageNrLimit) {
      setMaxPageNrLimit((prev) => prev - PAGE_NR_LIMIT);
      setMinPageNrLimit((prev) => prev - PAGE_NR_LIMIT);
    }
  };
  const handleNextPageNr = () => {
    setCurrentPageNr((prev) => prev + 1);
    if (currentPageNr + 1 > maxPageNrLimit) {
      setMaxPageNrLimit((prev) => prev + PAGE_NR_LIMIT);
      setMinPageNrLimit((prev) => prev + PAGE_NR_LIMIT);
    }
  };

  return (
    <PaginationContainer>
      {currentPageNr !== 1 && (
        <ArrowIcon onClick={handlePrevPageNr}>
          <BsChevronDoubleLeft color="#40a177" />
        </ArrowIcon>
      )}

      {pageNumbers.map((nr) => {
        return (
          nr <= maxPageNrLimit &&
          nr > minPageNrLimit && (
            <PageNumber
              key={nr}
              className={`${nr === currentPageNr ? "activePage" : ""}`}
              onClick={() => setCurrentPageNr(nr)}
            >
              {nr}
            </PageNumber>
          )
        );
      })}

      {currentPageNr < pageNumbers.length && (
        <ArrowIcon onClick={handleNextPageNr}>
          <BsChevronDoubleRight color="#40a177" />
        </ArrowIcon>
      )}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  .activePage {
    height: 30px !important;
    width: 30px !important;
    background: white !important;
    color: #40a177 !important;
    box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.19);
  }
`;

const PageNumber = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: #40a177;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  user-select: none;
`;

const ArrowIcon = styled.div`
  cursor: pointer;
`;

export default Pagination;

/* 
    File: Pagination.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import React, { FC } from "react";

interface PaginationProps {
  pages: number;
  activePage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  pages,
  activePage,
  onPageChange,
}) => {
  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="pagination-container">
      {Array.from({ length: pages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handleClick(index + 1)}
          className={`pagination-button ${
            activePage === index + 1 ? "active" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

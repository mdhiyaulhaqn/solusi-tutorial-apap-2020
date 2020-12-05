import React from "react";
import classes from "./styles.module.css";

const Pagination = (props) => {
  const { totalPage, handleClickPage } = props;
  return (
    <div className={classes.paginationContainer}>
      {[...Array(totalPage)].map((item, idx) => (
        <span
          key={idx}
          onClick={() => handleClickPage(idx)}
          className={classes.pagination}
        >
          {idx + 1}
        </span>
      ))}
    </div>
  );
};

export default Pagination;

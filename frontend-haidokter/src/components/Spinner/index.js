import React from "react";
import classes from "./styles.module.css";

const Spinner = () => {
  return (
    <div className={classes.wrapperSpinner}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Spinner;

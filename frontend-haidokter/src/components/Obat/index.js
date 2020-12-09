import React from "react";
import classes from "./styles.module.css";

const Obat = (props) => {
  const { kuantitas, nama } = props;
  return <span className={classes.obat}>{`${nama} (${kuantitas})`}</span>;
};

export default Obat;

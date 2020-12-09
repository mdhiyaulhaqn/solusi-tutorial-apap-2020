import React from "react";
import classes from "./styles.module.css";

const Kamar = (props) => {
  const { namaKamar, kapasitasKamar } = props;
  return <span className={classes.kamar}>{`${namaKamar} (${kapasitasKamar})`}</span>;
};

export default Kamar;

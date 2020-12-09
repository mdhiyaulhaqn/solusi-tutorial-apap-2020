import React from "react";
import Button from "../Button";
import Obat from "../Obat";
import classes from "./styles.module.css";

const Resep = (props) => {
  const {
    noResep,
    namaDokter,
    namaPasien,
    catatan,
    handleEdit,
    handleDelete,
    listObat,
  } = props;
  return (
    <div className={classes.resep}>
      <h3>{`Resep Nomor ${noResep}`}</h3>
      <p>{`Nama Dokter: ${namaDokter}`}</p>
      <p>{`Nama Pasien: ${namaPasien}`}</p>
      <p>{`Nama Catatan: ${catatan}`}</p>
      <p style={{ margin: 0 }}>List Obat:</p>
      {listObat.length > 0 ? (
        <div className={classes.listObat}>
          {listObat.map((obat) => (
            <Obat key={obat.id} nama={obat.nama} kuantitas={obat.kuantitas} />
          ))}
        </div>
      ) : (
        <p style={{ fontWeight: "bold" }}>Resep tidak memiliki obat</p>
      )}
      <Button onClick={handleEdit} variant="success">
        Edit
      </Button>
      <Button onClick={handleDelete} variant="danger">
        Delete
      </Button>
    </div>
  );
};

export default Resep;

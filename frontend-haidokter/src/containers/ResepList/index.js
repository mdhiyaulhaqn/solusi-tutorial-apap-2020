import React, { Component } from "react";
import APIConfig from "../../api/APIConfig";
import Resep from "../../components/Resep";
import Button from "../../components/Button";
import classes from "./styles.module.css";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";

const COUNT_PER_PAGE = 5;

class ResepList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reseps: [],
      isLoading: false,
      isCreate: false,
      isEdit: false,
      namaDokter: "",
      namaPasien: "",
      catatan: "",
      noResep: null,
      searchResep: "",
      currentPage: 0,
    };
    this.handleAddResep = this.handleAddResep.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmitAddResep = this.handleSubmitAddResep.bind(this);
    this.handleEditResep = this.handleEditResep.bind(this);
    this.handleSubmitEditResep = this.handleSubmitEditResep.bind(this);
    this.handleResetResep = this.handleResetResep.bind(this);
    this.handleFilterResep = this.handleFilterResep.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchResep !== prevState.searchResep) {
      this.setState({ currentPage: 0 });
    }
  }

  async loadData() {
    this.setState({ isLoading: true });
    try {
      const { data } = await APIConfig.get("/reseps");
      this.setState({ reseps: data });
    } catch (error) {
      alert("Oops terjadi masalah pada server");
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async handleSubmitAddResep(event) {
    event.preventDefault();
    try {
      const data = {
        namaDokter: this.state.namaDokter,
        namaPasien: this.state.namaPasien,
        catatan: this.state.catatan,
      };
      await APIConfig.post("/resep", data);
      this.loadData();
      this.handleResetResep();
    } catch (error) {
      alert("Oops terjadi masalah pada server");
      console.log(error);
    }
    this.handleCancel(event);
  }

  async handleSubmitEditResep(event) {
    event.preventDefault();
    try {
      const data = {
        namaDokter: this.state.namaDokter,
        namaPasien: this.state.namaPasien,
        catatan: this.state.catatan,
      };
      await APIConfig.put(`/resep/${this.state.noResep}`, data);
      this.loadData();
      this.handleResetResep();
    } catch (error) {
      alert("Oops terjadi masalah pada server");
      console.log(error);
    }
    this.handleCancel(event);
  }

  async handleDeleteResep(noResep) {
    try {
      await APIConfig.delete(`/resep/${noResep}`);
      this.loadData();
    } catch (error) {
      alert("Oops terjadi masalah pada server");
      console.log(error);
    }
  }

  handleAddResep() {
    this.setState({ isCreate: true });
  }

  handleEditResep(resep) {
    this.setState({
      isEdit: true,
      noResep: resep.noResep,
      namaDokter: resep.namaDokter,
      namaPasien: resep.namaPasien,
      catatan: resep.catatan,
    });
  }

  handleResetResep() {
    this.setState({
      namaDokter: "",
      namaPasien: "",
      catatan: "",
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ isCreate: false, isEdit: false });
  }

  handleChangeField(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFilterResep(resep) {
    return (
      resep.namaDokter
        .toLowerCase()
        .includes(this.state.searchResep.toLowerCase()) ||
      resep.namaPasien
        .toLowerCase()
        .includes(this.state.searchResep.toLowerCase()) ||
      resep.catatan.toLowerCase().includes(this.state.searchResep.toLowerCase())
    );
  }

  handleChangePage(newPage) {
    this.setState({ currentPage: newPage });
  }

  render() {
    const filteredReseps = this.state.reseps.filter(this.handleFilterResep);
    console.log(this.state.isLoading);
    return (
      <div className={classes.resepList}>
        <h1 className={classes.title}>All Reseps</h1>
        <Button onClick={this.handleAddResep} variant="primary">
          Add Resep
        </Button>
        <input
          className={classes.textField}
          type="text"
          placeholder="Cari Resep"
          name="searchResep"
          value={this.state.searchResep}
          onChange={this.handleChangeField}
        />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            {filteredReseps
              .slice(
                this.state.currentPage * COUNT_PER_PAGE,
                (this.state.currentPage + 1) * 5
              )
              .map((resep) => (
                <Resep
                  key={resep.noResep}
                  noResep={resep.noResep}
                  namaDokter={resep.namaDokter}
                  namaPasien={resep.namaPasien}
                  catatan={resep.catatan}
                  listObat={resep.listObat}
                  handleEdit={() => this.handleEditResep(resep)}
                  handleDelete={() => this.handleDeleteResep(resep.noResep)}
                />
              ))}
          </div>
        )}
        <Pagination
          totalPage={Math.ceil(filteredReseps.length / 5)}
          handleClickPage={this.handleChangePage}
        />
        <Modal
          show={this.state.isCreate || this.state.isEdit}
          handleCloseModal={this.handleCancel}
        >
          <form>
            <h3 className={classes.modalTitle}>
              {this.state.isCreate
                ? "Add Resep"
                : `Edit Resep Nomor ${this.state.noResep}`}
            </h3>
            <input
              className={classes.textField}
              type="text"
              placeholder="Nama Dokter"
              name="namaDokter"
              value={this.state.namaDokter}
              onChange={this.handleChangeField}
            />
            <input
              className={classes.textField}
              type="text"
              placeholder="Nama Pasien"
              name="namaPasien"
              value={this.state.namaPasien}
              onChange={this.handleChangeField}
            />
            <textarea
              className={classes.textField}
              placeholder="Catatan"
              name="catatan"
              rows="4"
              value={this.state.catatan}
              onChange={this.handleChangeField}
            />
            <Button
              onClick={
                this.state.isCreate
                  ? this.handleSubmitAddResep
                  : this.handleSubmitEditResep
              }
              variant="primary"
            >
              {this.state.isCreate ? "Create" : "Edit"}
            </Button>
            <Button onClick={this.handleCancel} variant="danger">
              Cancel
            </Button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default ResepList;

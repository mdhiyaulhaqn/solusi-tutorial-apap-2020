import React, { Component } from "react";
import APIConfig from "../../api/APIConfig";
import Hotel from "../../components/Hotel";
import Button from "../../components/Button";
import classes from "./styles.module.css";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";

const COUNT_PER_PAGE = 5;

class HotelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      isLoading: false,
      isCreate: false,
      isEdit: false,
      namaHotel: "",
      alamat: "",
      nomorTelepon: "",
      id: null,
      searchHotel: "",
      currentPage: 0,
    };
    this.handleAddHotel = this.handleAddHotel.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmitAddHotel = this.handleSubmitAddHotel.bind(this);
    this.handleEditHotel = this.handleEditHotel.bind(this);
    this.handleSubmitEditHotel = this.handleSubmitEditHotel.bind(this);
    this.handleResetHotel = this.handleResetHotel.bind(this);
    this.handleFilterHotel = this.handleFilterHotel.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchHotel !== prevState.searchHotel) {
      this.setState({ currentPage: 0 });
    }
  }

  async loadData() {
    this.setState({ isLoading: true });
    try {
      const { data } = await APIConfig.get("/hotels");
      console.log(data);
      this.setState({ hotels: data });
    } catch (error) {
      alert("Oops terjadi masalah pada server");
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async handleSubmitAddHotel(event) {
    event.preventDefault();
    try {
      const data = {
        namaHotel: this.state.namaHotel,
        alamat: this.state.alamat,
        nomorTelepon: this.state.nomorTelepon,
      };
      await APIConfig.post("/hotel", data);
      this.loadData();
      this.handleResetHotel();
    } catch (error) {
      alert("Oops terjadi masalah pada server");
      console.log(error);
    }
    this.handleCancel(event);
  }

  async handleSubmitEditHotel(event) {
    event.preventDefault();
    try {
      const data = {
        namaHotel: this.state.namaHotel,
        alamat: this.state.alamat,
        nomorTelepon: this.state.nomorTelepon,
      };
      await APIConfig.put(`/hotel/${this.state.id}`, data);
      this.loadData();
      this.handleResetHotel();
    } catch (error) {
      alert("Oops terjadi masalah pada server");
      console.log(error);
    }
    this.handleCancel(event);
  }

  async handleDeleteHotel(id) {
    try {
      await APIConfig.delete(`/hotel/${id}`);
      this.loadData();
    } catch (error) {
      alert("Oops terjadi masalah pada server");
      console.log(error);
    }
  }

  handleAddHotel() {
    this.setState({ isCreate: true });
  }

  handleEditHotel(hotel) {
    this.setState({
      isEdit: true,
      id: hotel.id,
      namaHotel: hotel.namaHotel,
      alamat: hotel.alamat,
      nomorTelepon: hotel.nomorTelepon,
    });
  }

  handleResetHotel() {
    this.setState({
      namaHotel: "",
      alamat: "",
      nomorTelepon: "",
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

  handleFilterHotel(hotel) {
    return (
      hotel.namaHotel
        .toLowerCase()
        .includes(this.state.searchHotel.toLowerCase()) 
    );
  }

  handleChangePage(newPage) {
    this.setState({ currentPage: newPage });
  }

  render() {
    console.log(this.state.isLoading);
    const filteredHotels = this.state.hotels.filter(this.handleFilterHotel);
    return (
      <div className={classes.hotelList}>
        <h1 className={classes.title}>All Hotels</h1>
        <Button onClick={this.handleAddHotel} variant="primary">
          Add Hotel
        </Button>
        <input
          className={classes.textField}
          type="text"
          placeholder="Cari Hotel"
          name="searchHotel"
          value={this.state.searchHotel}
          onChange={this.handleChangeField}
        />
        {this.state.isLoading ? (
          <Spinner/>
        ) : (
        <div>
          {filteredHotels
            .slice(
              this.state.currentPage * COUNT_PER_PAGE,
              (this.state.currentPage + 1) * 5
            )
            .map((hotel) => (
              <Hotel
                key={hotel.id}
                id={hotel.id}
                namaHotel={hotel.namaHotel}
                alamat={hotel.alamat}
                nomorTelepon={hotel.nomorTelepon}
                listKamar={hotel.listKamar}
                handleEdit={() => this.handleEditHotel(hotel)}
                handleDelete={() => this.handleDeleteHotel(hotel.id)}
              />
            ))}
        </div>)}
        <Pagination
          totalPage={Math.ceil(filteredHotels.length / 5)}
          handleClickPage={this.handleChangePage}
        />
        <Modal
          show={this.state.isCreate || this.state.isEdit}
          handleCloseModal={this.handleCancel}
        >
          <form>
            <h3 className={classes.modalTitle}>
              {this.state.isCreate
                ? "Add Hotel"
                : `Edit Hotel Nomor ${this.state.id}`}
            </h3>
            <input
              className={classes.textField}
              type="text"
              placeholder="Nama Hotel"
              name="namaHotel"
              value={this.state.namaHotel}
              onChange={this.handleChangeField}
            />
            <input
              className={classes.textField}
              type="text"
              placeholder="Alamat"
              name="alamat"
              value={this.state.alamat}
              onChange={this.handleChangeField}
            />
            <input
              className={classes.textField}
              placeholder="Nomor Telepon"
              name="nomorTelepon"
              rows="4"
              value={this.state.nomorTelepon}
              onChange={this.handleChangeField}
            />
            <Button
              onClick={
                this.state.isCreate
                  ? this.handleSubmitAddHotel
                  : this.handleSubmitEditHotel
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

export default HotelList;
// import React, { Component } from "react";
 
// class HotelList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hotels: [
//         {
//           id: 1,
//           namaHotel: "Hotel Papa",
//           alamat: "Depok",
//           nomorTelepon: "08211234",
//         },
//         {
//           id: 2,
//           namaHotel: "Hotel Mama",
//           alamat: "Jekardah",
//           nomorTelepon: "08211423",
//         },
//         {
//           id: 1,
//           namaHotel: "Hotel Dede",
//           alamat: "Thepok",
//           nomorTelepon: "08211234",
//         },
//       ],
//       isLoading: false,
//     };
//     this.handleClickLoading = this.handleClickLoading.bind(this);
//   }

//   handleClickLoading() {
//     const currentLoading = this.state.isLoading;
//     this.setState({ isLoading: !currentLoading });
//     console.log(this.state.isLoading);
//   }

 
//   componentDidMount() {
//     console.log("componentDidMount()");
//   }
 
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log("shouldComponentUpdate()");
//   }
 
//   render() {
//     return (
//       <div className={classes.resepList}>
//         <h1 className={classes.title}>All Hotels</h1>
//         <div>
//           {this.state.hotels.map((resep) => (
//             <Hotel
//               key={resep.id}
//               id={resep.id}
//               namaHotel={resep.namaHotel}
//               alamat={resep.alamat}
//               nomorTelepon={resep.nomorTelepon}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }
// }
 
// export default HotelList;
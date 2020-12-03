import React from "react";

import List from "components/List";
import listMovies from "movies.json";
import "./App.css";

export default class App extends React.Component {
  state = {
    favItems: [],
    showFav: false,
  };

  handleItemClick = (item) => {
    // Immutability
    const newItems = [...this.state.favItems];
    const newItem = { ...item };
    // Find item index using id
    const targetInd = newItems.findIndex((it) => it.id === newItem.id);

    if (targetInd < 0) newItems.push(newItem);
    else newItems.splice(targetInd, 1); // Delete 1 item at index targetInd

    // Trigger set state
    this.setState({ favItems: newItems });
  };

  addToFavorites = (item) => {
    const newItems = [...this.state.favItems];
    const newItem = { ...item };

    const targetInd = newItems.findIndex((it) => it.id === newItem.id);

    if (targetInd < 0) newItems.push(newItem);

    this.setState({ favItems: newItems });
  };

  toggleShow = () => {
    this.setState((prevState) => ({
      showFav: !prevState.showFav,
    }));
  };

  render() {
    const { favItems, showFav } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="text-center mt-3 mb-0">Favorites Movie App</h1>
        <p className="text-center text-secondary text-sm font-italic">
          (This is a <strong>class-based</strong> application)
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <div
            className={`d-flex justify-content-center align-items-center ${
              favItems.length > 0 ? "mr-4" : ""
            }`}
          >
            <label className="switch">
              <input type="checkbox" onClick={this.toggleShow} />
              <span className="slider round"></span>
            </label>
            <span>Show Favorites</span>
          </div>
          {favItems.length > 0 && (
            <button
              onClick={() => this.setState({ favItems: [] })}
              className="btn btn-danger"
            >
              Clear Favorites
            </button>
          )}
        </div>
        <div className="container pt-3">
          <div className="row">
            <div className="col-sm">
              <List
                title="List Movies"
                items={listMovies}
                onItemClick={this.addToFavorites}
              />
            </div>
            <div className={`col-sm ${showFav ? "d-block" : "d-none"}`}>
              <List
                title="My Favorites"
                items={favItems}
                onItemClick={this.handleItemClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

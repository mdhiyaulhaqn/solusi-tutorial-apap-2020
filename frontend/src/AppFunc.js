import React, { useState } from "react";

import List from "./components/List";
import listMovies from "movies.json";
import "./App.css";

/**
* Building React component using functional programming paradigm
*/

function App() {
// Btw, this is hooks. useState function returns an array
// contains the state and a function to set the state -> [state, setState].
// What you see below is array destruction.
// Let say you have an array const arr = ["aaa", "bbb"], to access the item
// we can use index arr[0] OR destruct it like below
// const [varName, index1] = arr, variable varName is guaranteed to get the value of index 0 OR "aaa"
// here is the illustration for this situation
// below is the return value of useState
// [favItems, setFavItems] = [state, setState]

    const [favItems, setFavItems] = useState(() => []);
    const [showFav, setShowFav] = useState(false)

    function handleItemClick(item) {
        // immutability
        const newItems = [...favItems];
        const newItem = { ...item };
        // Find index of item with id
        const targetInd = newItems.findIndex(it => it.id === newItem.id);

        if (targetInd < 0) newItems.push(newItem);
        else newItems.splice(targetInd, 1); // delete 1 item at index targetInd

        // trigger to set a new state
        setFavItems(newItems);
    };

    function addToFavorites(item) {

        const newItems = [...favItems];
        const newItem = { ...item };

        const targetInd = newItems.findIndex(it => it.id === newItem.id);

        if (targetInd < 0) newItems.push(newItem);

        setFavItems(newItems);
    };

    function toggleShow() {
        setShowFav(!showFav)
    };
    

    return (
        <div className="container-fluid">
            <h1 className="text-center mt-3 mb-0">Favorites Movie App</h1>
            <p className="text-center text-secondary text-sm font-italic">
            (This is a <strong>function-based</strong> application)
            </p>
            <div className="d-flex justify-content-center align-items-center">
          <div
            className={`d-flex justify-content-center align-items-center ${
              favItems.length > 0 ? "mr-4" : ""
            }`}
          >
            <label className="switch">
              <input type="checkbox" onClick={toggleShow} />
              <span className="slider round"></span>
            </label>
            <span>Show Favorites</span>
          </div>
          {favItems.length > 0 && (
            <button
              onClick={() => setFavItems([])}
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
                    onItemClick={addToFavorites}
                />
                </div>
                <div className={`col-sm ${showFav ? "d-block" : "d-none"}`}>
                <List
                    title="My Favorites"
                    items={favItems}
                    onItemClick={handleItemClick}
                />
                </div>
            </div>
            </div>
        </div>
    );

}

export default App;
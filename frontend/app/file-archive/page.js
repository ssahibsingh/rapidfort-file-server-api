import React from "react";

const page = () => {
  return (
    <>
      <div class="container text-center">
        <h1>File Archive</h1>
        <input type="text" id="search-input" placeholder="Search a file" />
        <br />
        <button id="search-button" className="submit-button mt-2">
          Search
        </button>
        <div>
          <hr />
          <h3>File Info</h3>
          <div>
            <p>
              <span>Name: </span>
              <span>Hello</span>{" "}
            </p>
            <p>
              <span>Size: </span>
              <span>Hello</span>{" "}
            </p>
            <p>
              <span>Type: </span>
              <span>Hello</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

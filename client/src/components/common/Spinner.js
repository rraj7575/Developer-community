import React from "react";
import spinner from "./../../image/loader.gif";
export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{ margin: "auto", width: "200px", display: "block" }}
      />
    </div>
  );
};

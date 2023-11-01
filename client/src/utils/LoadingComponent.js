import React, { Component } from "react";
import ringLoader from "../image/ring_loader.svg";
import error from "../image/error.svg";

class LoadingComponent extends Component {
  renderUI(img, msg) {
    return (
      <div className="Loader">
        <img style={{ display: "block" }} src={img} alt="error" />
        <div>{msg}</div>
      </div>
    );
  }

  render() {
    console.log("Component downloading.....");
    if (this.props.error) {
      return this.renderUI(error, "Oops, something went wrong ...");
    } else if (this.props.pastDelay) {
      return this.renderUI(ringLoader, "Loading...");
    } else {
      return null;
    }
  }
}

function doLoad(exp) {
  return {
    loader: () => exp(),
    loading: LoadingComponent,
  };
}

export { doLoad };
export default LoadingComponent;

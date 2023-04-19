import React, { Component } from 'react';
import loading from "../loading.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-3">
        <img src={loading} height={40} width={40} alt="loading" />
      </div>
    )
  }
}

export default Spinner

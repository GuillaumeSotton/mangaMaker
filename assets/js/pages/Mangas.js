import React, { Component } from "react";

import axios from "axios";
import {api} from "../config";

class Mangas extends Component {

  state = {
    
    mangas: [],
  };

  async componentDidMount() {
    const mangas = await axios.get(`${api.path}/mangas`);
    console.log(mangas);
    this.setState({ mangas: mangas.data })
  }

  render() {
    return (
      <>
        <div className={"container"}>
          <h1 className={"mb-4"}>Mangas</h1>

        </div>
      </>
    );
  }
}

export { Mangas };

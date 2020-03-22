import React, { Component } from "react";
import { Link } from 'react-router-dom';

import axios from "axios";
import { api } from "../config";
import { StatusSelector } from "../components/StatusSelector";
import { LanguageSelector } from "../components/LanguageSelector";
import { CharacterSelector } from "../components/Characters/CharacterSelector";
import { UniverseSelector } from "../components/Universes/UniverseSelector";
import { GenreSelector } from "../components/Genres/GenreSelector";


class Mangas extends Component {

  state = {
    filters: {
      chapters: null,
      characters: [],
      genre: null,
      language: "",
      name: "",
      status: "",
      universe: "",
    },
    mangas: [],
  };

  async componentDidMount() {
    const mangas = await axios.get(`${api.path}/mangas`);
    console.log(mangas);
    this.setState({ mangas: mangas.data })
  }

  onChange = (name, value) => {
    if (name === "characters") {
      const arrayToSubmit = Object.values(value);
      filters[name] = arrayToSubmit;
      this.setState({ filters });
    }
    if (name === "genre" || name === "universe") {
      filters[name] = Number.parseInt(value);
      this.setState({ filters });
    }
    else {
      filters[name] = value;
      this.setState({ filters });
    }
  };

  render() {
    return (
      <>
        <div className={"container"}>
          <h1 className={"mb-4 ml-3"}>Mangas</h1>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <label htmlFor="name">Name:</label>
                <input type="text" className={`form-control`} placeholder="..."
                  id="name" name={"name"} value={""} onChange={e => this.onChange(e.target.name, e.target.value)} />
              </div>
              <div className="col-6 mt-3">
                <label htmlFor="name">Cross-overs:</label>
                <input type="text" className={`form-control`} placeholder="..."
                  id="name" name={"name"} value={""} onChange={e => this.onChange(e.target.name, e.target.value)} />
              </div>
              <div className="col-6 mt-3">
                <label htmlFor="name">Universe:</label>
                <UniverseSelector id="universe" name="universe" value={""} onChange={this.onChange} />
              </div>
              <div className="col-6 mt-3">
                <label htmlFor="characters">Main characters:</label>
                <CharacterSelector id="main_characters" name="characters" value={[]} onChange={this.onChange} multiple />
              </div>
              <div className="col-6 mt-3">
                <label htmlFor="genre">Genre:</label>
                <GenreSelector id="genre" name="genre" value={""} onChange={this.onChange} multiple />
              </div>
              <div className="col-6 mt-3 mb-3">
                <label htmlFor="Language">Language:</label>
                <LanguageSelector id="language" name="language" value={""} onChange={this.onChange} />
              </div>
              <div className="col-6 mt-3 mb-3">
                <label htmlFor="status">Status:</label>
                <StatusSelector id="status" name="status" value={""} onChange={this.onChange} />
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 text-right">
              <Link to={"/"} className="btn btn-outline-primary mr-3">Cancel</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { Mangas };

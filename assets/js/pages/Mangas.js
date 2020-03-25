import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core";

import axios from "axios";
import { api } from "../config";
import { StatusSelector } from "../components/StatusSelector";
import { LanguageSelector } from "../components/LanguageSelector";
import { CharacterSelector } from "../components/Characters/CharacterSelector";
import { UniverseSelector } from "../components/Universes/UniverseSelector";
import { GenreSelector } from "../components/Genres/GenreSelector";
import { MangaView } from "../components/Mangas/MangaView";
import { event } from "../styles/mangas/mangas";


@withStyles(event)
class Mangas extends Component {

  static propTypes = {
    classes: PropTypes.object,
  };

  state = {
    filters: {
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
    const filters = this.state.filters;
    console.log(name,value);
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
    const { filters, mangas } = this.state;
    const { classes } = this.props;

    console.log(filters);
    //Filter manga
    const filteredMangas = mangas.filter(manga => {
      if (filters.name && manga.name !== filters.name)
        return false;

      else if (filters.universe && manga.universe.id !== filters.universe)
        return false;

      else if (filters.genre && manga.genre.id !== filters.genre)
        return false;

      else if (filters.language && manga.language !== filters.language)
        return false;

      else if (filters.status && manga.status !== filters.status)
        return false;

      return true;
    });


    return (
      <>
        <div className={"container"}>
          <h1 className={"mb-4 ml-3"}>Mangas</h1>

          <div className="container">
            <div className="row">

              <div className="col-12">
                <label htmlFor="name">Name:</label>
                <input type="text" className={`form-control`} placeholder="..."
                  id="name" name={"name"} value={filters.name || ""} onChange={e => this.onChange(e.target.name, e.target.value)} />
              </div>
              <div className="col-12 mt-3">
                <label className="mr-4" htmlFor="name">Cross-overs:</label>
                <div class="form-check form-check-inline mr-4">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">Yes</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">No</label>
                </div>
              </div>
              <div className="col-6 mt-3">
                <label htmlFor="name">Universe:</label>
                <UniverseSelector id="universe" name="universe" value={filters.universe || ""} onChange={this.onChange} />
              </div>
              <div className="col-6 mt-3">
                <label htmlFor="characters">Main characters:</label>
                <CharacterSelector id="main_characters" name="characters" value={filters.characters} onChange={this.onChange} multiple />
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="genre">Genre:</label>
                <div class="form-check form-check-inline ml-4">
                  <input class="form-check-input" type="checkbox" id="happy" value="1" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">Happy</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="sad" value="2" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Sad</label>
                </div>
                <div class="form-check form-check-inline mr-4">
                  <input class="form-check-input" type="checkbox" id="Fighting" value="3" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">Fighting</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="Determinated" value="4" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Determinated</label>
                </div>
                <div class="form-check form-check-inline mr-4">
                  <input class="form-check-input" type="checkbox" id="Talking" value="5" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">Talking</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="Angry" value={filters.genre} onChange={e => this.onChange("genre", 6)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Angry</label>
                </div>
                <div class="form-check form-check-inline mr-4">
                  <input class="form-check-input" type="checkbox" id="Hurt" value={filters.genre} onChange={e => this.onChange("genre", e.target.value)} />
                  <label class="form-check-label" for="inlineCheckbox1">Hurt</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="Surprised" value="8" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Surprised</label>
                </div>
                <div class="form-check form-check-inline mr-4">
                  <input class="form-check-input" type="checkbox" id="Afraid" value="9" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">Afraid</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="Sleeping" value="10" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Sleeping</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="Neutral" value="11" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Neutral</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="Thinking" value="12" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Thinking</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="Disgusted" value="13" onChange={e => this.onChange("genre", e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Disgusted</label>
                </div>
                
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="Language">Language:</label>
                <div class="form-check form-check-inline ml-4">
                  <input class="form-check-input" type="checkbox" id="english" value="english" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">English</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="french" value="french" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">French</label>
                </div>
                <div class="form-check form-check-inline mr-4">
                  <input class="form-check-input" type="checkbox" id="chinese" value="chinese" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">Chinese</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="japanese" value="japanese" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Japanese</label>
                </div>
              </div>
              <div className="col-6 mt-3 mb-3">
                <label htmlFor="status">Status:</label>
                <div class="form-check form-check-inline ml-4">
                  <input class="form-check-input" type="checkbox" id="started" value="started" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">Started</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="ongoing" value="ongoing" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox2">Ongoing</label>
                </div>
                <div class="form-check form-check-inline mr-4">
                  <input class="form-check-input" type="checkbox" id="finished" value="finished" onChange={e => this.onChange(e.target.name, e.target.value)}/>
                  <label class="form-check-label" for="inlineCheckbox1">Finished</label>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 text-right">
              <Link to={"/"} className="btn btn-outline-primary mr-3">Cancel</Link>
            </div>
          </div>


          {
            filteredMangas.map(manga => {
              return (
                <Link key={manga.id} to={`/mangas/${manga.id}`} className={classes.customCard}>
                  <MangaView manga={manga} />
                </Link>
              );
            })
          }


        </div>
      </>
    );
  }
}

export { Mangas };

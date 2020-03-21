import React, { Component } from "react";
import PropTypes from "prop-types";
import filesize from "filesize";

import { UniverseSelector } from "../Universes/UniverseSelector";
import { GenreSelector } from "../Genres/GenreSelector";
import { CharacterSelector } from "../Characters/CharacterSelector";

//Type of ressources
const types = [ "Character", "Background"];


class SubmitRessourcesEditor extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        ressource: PropTypes.object,
        genre: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        file: PropTypes.object,
        type: PropTypes.string,
        perso: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        universe: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    };

   onFileSelected = event => {
      const { onChange } = this.props;
      onChange("file", event.target.files[0]);
   };

    render() {
        const { onChange, file, perso, type, universe, genre } = this.props;
       
        return (
            <>
            <div className="form-group">
               <div className="custom-file">
                  <input type="file" accept=".png" className="custom-file-input" id="customFile" onChange={this.onFileSelected}/>
                  <label className="custom-file-label" htmlFor="customFile">{file && file.name + " " + (filesize(file.size)) || "Add file..."}</label>
               </div>
            </div>

            <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="lastName">Type</label>
                        <select name={"type"} id={"type"} className={`form-control`} value={type || ""} onChange={e => onChange("type", e.target.value)}>
                            <option value="">...</option>
                                {types.map(type => {
                                return (
                                    <option key={type} value={type}>{type}</option>
                                );
                                })}
                        </select>
                        
                    </div>
            </div>

            {type === "Character" &&
            <>

            <div className="row mb-3">
                    <div className="col-4">
                        <label htmlFor="lastName">Universe</label>
                        <UniverseSelector id={"universe"} name={"universe"} value={universe} onChange={onChange} isrequired/>
                    </div>
                    <div className="col-4">
                        <label htmlFor="lastName">Genre</label>
                        <GenreSelector id={"genre"} name={"genre"} value={genre} onChange={onChange} isrequired/>
                        
                    </div>
                    <div className="col-4">
                        <label htmlFor="lastName">Character</label>
                        <CharacterSelector id={"character"} name={"perso"} value={perso} onChange={onChange} isrequired/>
                    </div>
            </div>
            </>
            }

            {type === "Background" &&
            <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="lastName">Genre</label>
                        <GenreSelector id={"genre"} name={"genre"} value={genre} onChange={onChange} isrequired/>
                        
                    </div>
            </div>

            }
            </>
        );
    }
}


export { SubmitRessourcesEditor };


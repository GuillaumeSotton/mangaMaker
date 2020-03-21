import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";

import { api } from "../../config";
import { creator } from "../../styles/characters/characters";
import { CharacterEditor } from "./CharacterEditor";
import { ProgressButton } from "../ProgressButton";


@withStyles(creator)
class CharacterCreator extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
      character: {
          name: "",
          universe: null
      },
      fetchInProgress: false,
    };

    onChange = (name, value) => {
        const character = { ...this.state.character };
        character[name] = value;
        this.setState({ character });
    };

    onCreate = async () => {
        const { character } = this.state;

        console.log(character);

        this.setState({fetchInProgress: true});
        await axios.post(`${api.path}/characters`, character);
        this.setState({fetchInProgress: false});
        this.setState({
          character: {
              name: "",
              universe: null
          },
        });
        window.location.reload();
    };

    //Check if all mandatory inputs have been completed
    checkValidationCharacter = (character) => {
        return !(character.name && character.universe);
    };

    render() {
        const { classes } = this.props;
        const { character, fetchInProgress } = this.state;

        console.log(character);

        const canCreate = this.checkValidationCharacter(character);

        return (
            <>
                <div className="row mb-4">
                    <div className="col-12 text-right">
                        <ProgressButton label={"Create character"} onClick={this.onCreate} showSpinner={fetchInProgress} disabled={canCreate || fetchInProgress}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <p className={classes.header}>New character</p>
                        <p className={classes.subHeader}>
                            Add a new character.
                        </p>
                    </div>

                    <div className="col-10">
                        <CharacterEditor onChange={this.onChange} character={character}/>
                    </div>
                </div>
            </>
        );
    }
}


export { CharacterCreator };
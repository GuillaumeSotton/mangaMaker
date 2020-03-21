import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import {api} from "../../config";


class CharacterSelector extends Component {

   static propTypes = {
        id: PropTypes.string,
        isrequired: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    };

    state = {
      characters : [],
    } 

    async componentDidMount() {
      const characters = await axios.get(`${api.path}/characters`);
      this.setState({characters: characters.data})
    }

    onChange = (name, value) => {
        const { onChange } = this.props;
        onChange(name, value);
    };

    render() {
        const { id, isrequired=false, name, onChange, value } = this.props;
        const { characters } = this.state;

        const isInvalid = isrequired && !value;

        return (
            <select name={name} id={id} className={`form-control ${isInvalid ? "is-invalid" : "" }`} value={value || ""}
                    onChange={e => onChange(name, e.target.value)}
            >
                <option value="">...</option>
                {characters.map(character => {
                    return (
                        <option key={character.id} value={character.id}>{character.name}</option>
                    );
                })}
            </select>
        );
    }
}

export { CharacterSelector };

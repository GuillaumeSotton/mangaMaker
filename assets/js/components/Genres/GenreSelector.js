import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import {api} from "../../config";


class GenreSelector extends Component {

   static propTypes = {
        id: PropTypes.string,
        isrequired: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    };

    state = {
      genres : [],
    } 

    async componentDidMount() {
      const genres = await axios.get(`${api.path}/genres`);
      this.setState({genres: genres.data})
    }

    onChange = (name, value) => {
        const { onChange } = this.props;
        onChange(name, value);
    };

    render() {
        const { id, isrequired=false, name, onChange, value } = this.props;
        const { genres } = this.state;

        const isInvalid = isrequired && !value;

        return (
            <select name={name} id={id} className={`form-control ${isInvalid ? "is-invalid" : "" }`} value={value || ""}
                    onChange={e => onChange(name, e.target.value)}
            >
                <option value="">...</option>
                {genres.map(genre => {
                    return (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    );
                })}
            </select>
        );
    }
}

export { GenreSelector };

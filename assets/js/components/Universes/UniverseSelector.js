import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import {api} from "../../config";


class UniverseSelector extends Component {

   static propTypes = {
        id: PropTypes.string,
        isrequired: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    };

    state = {
      universes : [],
    } 

    async componentDidMount() {
      const universes = await axios.get(`${api.path}/universes`);
      this.setState({universes: universes.data})
    }

    onChange = (name, value) => {
        const { onChange } = this.props;
        onChange(name, value);
    };

    render() {
        const { id, isrequired=false, name, onChange, value } = this.props;
        const { universes } = this.state;

        const isInvalid = isrequired && !value;

        return (
            <select name={name} id={id} className={`form-control ${isInvalid ? "is-invalid" : "" }`} value={value || ""}
                    onChange={e => onChange(name, e.target.value)}
            >
                <option value="">...</option>
                {universes.map(universe => {
                    return (
                        <option key={universe.id} value={universe.id}>{universe.name}</option>
                    );
                })}
            </select>
        );
    }
}

export { UniverseSelector };

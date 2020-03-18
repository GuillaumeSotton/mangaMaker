import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import {api} from "../config";


class SiteSelector extends Component {
    _isMounted = false;

    static propTypes = {
        disabled: PropTypes.bool,
        id: PropTypes.string,
        isrequired: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    };

    state = {
        isLoading: true,
        sites: []
    };

    async componentDidMount() {
        this._isMounted = true;
        const sites = await axios.get(`${api.path}/sites`);
        if (this._isMounted) {
            this.setState({sites: sites.data})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChange = e => {
        const { name, onChange } = this.props;
        if (onChange)
            onChange(name, e.target.value);
    };

    render() {
        const { id, name, value, disabled=false, isrequired=false } = this.props;
        const { sites } = this.state;
        const required = isrequired && !value;

        return (
            <select
                className={`form-control ${required ? "is-invalid" : ""}`} disabled={disabled}
                id={id} name={name} value={value || ""}
                onChange={this.onChange}
            >
                <option value="">...</option>
                {sites.map(site =>
                    <option key={site.id} value={site.id}>{site.name}</option>
                )}
            </select>
        );
    }
}

export { SiteSelector };


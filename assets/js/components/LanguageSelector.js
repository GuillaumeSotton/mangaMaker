import React, { Component } from "react";
import PropTypes from "prop-types";

import { languages } from "../data/Languages";

class LanguageSelector extends Component {
    _isMounted = false;

    static propTypes = {
        disabled: PropTypes.bool,
        id: PropTypes.string,
        isrequired: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    };

    onChange = e => {
        const { name, onChange } = this.props;
        if (onChange)
            onChange(name, e.target.value);
    };

    render() {
        const { id, name, value, disabled=false, isrequired=false } = this.props;
        const required = isrequired && !value;

        return (
            <select
                className={`form-control ${required ? "is-invalid" : ""}`} disabled={disabled} placeholder="..."
                id={id} name={name} value={value || ""}
                onChange={this.onChange}
            >
                <option value="">...</option>
                {languages.map(language =>
                    <option key={language} value={language}>{language}</option>
                )}
            </select>
        );
    }
}

export { LanguageSelector };


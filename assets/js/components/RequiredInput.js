import React, { Component } from 'react';
import PropTypes from "prop-types";


class RequiredInput extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.string,
        isrequired: PropTypes.bool,
    };

    render() {
        const { onChange, name, id, value, isrequired = false } = this.props;

        const isInvalid = isrequired && !value;

        return (
            <input type="text" id={id} name={name} value={value || ""} className={`form-control ${isInvalid ? "is-invalid" : ""}`}
                   onChange={e => onChange(e.target.name, e.target.value)} placeholder={"..."}
            />
        );
    }
}


export { RequiredInput };

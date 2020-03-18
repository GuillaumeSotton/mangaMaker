import React, { Component } from "react";
import PropTypes from "prop-types";


class EmailInput extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.string,
        isrequired: PropTypes.bool,
    };


    isValid = value => {
        const { isrequired = false } = this.props;
        if (!isrequired) {
            return true;
        }

        if (!value) {
            return false;
        }

        // See RFC 2822
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const regex = new RegExp(pattern);
        return regex.test(value);
    };

    render() {
        const { onChange, name, id, value } = this.props;
        const isInvalid = !this.isValid(value);

        return (
            <input type="email" id={id} name={name} value={value || ""} className={`form-control ${isInvalid ? "is-invalid" : ""}`}
                   onChange={e => onChange(e.target.name, e.target.value)} placeholder={"..."}
            />
        );
    }
}


export { EmailInput };

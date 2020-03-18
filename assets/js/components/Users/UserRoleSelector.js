import React, { Component } from "react";
import PropTypes from "prop-types";

const roles = [
    "ROLE_ADMIN",
    "ROLE_DIRIGEANT"
];

class UserRoleSelector extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        isrequired: PropTypes.bool,
    };

    onChange = (name, value) => {
        const { onChange } = this.props;

        onChange(name, value);
    };

    render() {
        const { onChange, name, id, value, isrequired=false } = this.props;

        const isInvalid = isrequired && !value;

        return (
            <select name={name} id={id} className={`form-control ${isInvalid ? "is-invalid" : "" }`} value={value || ""}
                    onChange={e => onChange(name, e.target.value)}
            >
                <option value="">...</option>
                {roles.map(role => {
                    return (
                        <option key={role} value={role}>{role}</option>
                    );
                })}
            </select>
        );
    }
}

export { UserRoleSelector };

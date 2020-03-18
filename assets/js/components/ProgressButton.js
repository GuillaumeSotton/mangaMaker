import React, { Component } from "react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

class ProgressButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        showSpinner: PropTypes.bool,
        type: PropTypes.string,
        style: PropTypes.object
    };

    render() {
        const { onClick, label, showSpinner, disabled, type="primary", style } = this.props;

        return <button className={`btn btn-${type}`} onClick={onClick} disabled={disabled} style={style}>
            {showSpinner &&
            <span className={"mr-2"}><ClipLoader sizeUnit={"px"} size={15} color={"white"}/></span>}
            {label}
        </button>;
    }
}

export { ProgressButton };
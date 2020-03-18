import React, { Component } from "react";
import Close from "mdi-react/CloseIcon";
import PropTypes from "prop-types";

class ClearableInput extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        filter: PropTypes.string,
        placeholder: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
    };

    render() {
        const { onChange, filter, placeholder, id, name } = this.props;

        return (
            <div className={"d-flex align-items-center mb-4"}>
                <input type="text" className="form-control"
                       placeholder={ placeholder || "..."}
                       onChange={e => onChange(name, e.target.value)}
                       value={filter || ""} id={id || ""} name={name}
                />
                {filter &&
                <button className="btn bg-transparent" style={{ marginLeft: "-60px", zIndex: 100 }}>
                    <Close onClick={() => onChange(name, "")}/>
                </button>
                }
            </div>

        );
    }
}


export { ClearableInput };



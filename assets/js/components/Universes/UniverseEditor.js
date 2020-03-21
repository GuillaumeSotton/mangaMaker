import React, { Component } from "react";
import PropTypes from "prop-types";

import { RequiredInput } from "../RequiredInput";


class UniverseEditor extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        universe: PropTypes.object,
    };

    render() {
        const { onChange, universe } = this.props;
        if (!universe)
            return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="lastName">Name</label>
                        <RequiredInput id={"name"} name={"name"} value={universe.name} onChange={onChange} isrequired/>
                    </div>
                </div>
            </>
        );
    }
}


export { UniverseEditor };


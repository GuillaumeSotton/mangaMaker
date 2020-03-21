import React, { Component } from "react";
import PropTypes from "prop-types";

import { RequiredInput } from "../RequiredInput";


class GenreEditor extends Component {

    static propTypes = {
      genre: PropTypes.object,
      onChange: PropTypes.func.isRequired,
    };

    render() {
        const { genre, onChange } = this.props;
        if (!genre)
            return null;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="lastName">Name</label>
                        <RequiredInput id={"name"} name={"name"} value={genre.name} onChange={onChange} isrequired/>
                    </div>
                </div>
            </>
        );
    }
}


export { GenreEditor };


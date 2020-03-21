import React, { Component } from "react";
import PropTypes from "prop-types";

import { RequiredInput } from "../RequiredInput";
import { UniverseSelector } from "../Universes/UniverseSelector";


class CharacterEditor extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        character: PropTypes.object,
    };

    render() {
        const { onChange, character } = this.props;
        if (!character)
            return null;

        return (
            <>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="lastName">Name</label>
                        <RequiredInput id={"name"} name={"name"} value={character.name} onChange={onChange} isrequired/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastName">Universe</label>
                        <UniverseSelector id={"universe"} name={"universe"} value={character.universe} onChange={onChange} isrequired/>
                    </div>
                </div>
            </>
        );
    }
}


export { CharacterEditor };


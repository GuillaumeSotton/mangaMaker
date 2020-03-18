import React, { Component } from "react";
import PropTypes from "prop-types";

import { UserRoleSelector } from "../Users/UserRoleSelector";
import { EmailInput } from "../EmailInput";
import { RequiredInput } from "../RequiredInput";


class UserEditor extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    render() {
        const { user, onChange } = this.props;
        if (!user)
            return null;

        return (
            <>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="lastName">Nom*</label>
                        <RequiredInput id={"last_name"} name={"last_name"} value={user.last_name} onChange={onChange} isrequired/>
                    </div>

                    <div className="col-6">
                        <label htmlFor="firstName">Prénom*</label>
                        <RequiredInput id={"first_name"} name={"first_name"} value={user.first_name} onChange={onChange} isrequired/>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        <label htmlFor="personCount">Email*</label>
                        <EmailInput id={"email"} name={"email"} isRequired value={user.email} onChange={onChange} isrequired/>
                    </div>

                    <div className="col-6">
                        <label htmlFor="role">Rôle*</label>
                        <UserRoleSelector id={"roles"} value={user.roles} name={"roles"} onChange={onChange} isrequired/>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        <label htmlFor="personCount">Mot de passe*</label>
                        <RequiredInput id={"password"} name={"password"} value={user.password} onChange={onChange} isrequired/>
                    </div>
                </div>
            </>
        );
    }
}


export { UserEditor };


import React, { Component } from "react";
import PropTypes from "prop-types";
import filesize from "filesize";


class SubmitRessourcesEditor extends Component {

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        ressource: PropTypes.object,
    };

   onFileSelected = event => {
      const { onChange } = this.props;
      onChange("file", event.target.files[0]);
   };

    render() {
        const { ressource } = this.props;
       
        return (
            <>
            <div className="form-group">
               <div className="custom-file">
                  <input type="file" accept=".png" className="custom-file-input" id="customFile" onChange={this.onFileSelected}/>
                  <label className="custom-file-label" htmlFor="customFile">{ressource.file && ressource.file.name + " " + (filesize(ressource.file.size)) || "Add file..."}</label>
               </div>
            </div>

            </>
        );
    }
}


export { SubmitRessourcesEditor };


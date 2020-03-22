import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import axios from "axios";
import {api} from "../../config";


class CharacterSelector extends Component {

   static propTypes = {
        id: PropTypes.string,
        isrequired: PropTypes.bool,
        multiple: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
    };

    state = {
      characters : [],
    } 

    async componentDidMount() {
      const characters = await axios.get(`${api.path}/characters`);
      this.setState({characters: characters.data})
    }

    onChange = value => {
        const { onChange, name } = this.props;
        if (onChange) {
           onChange(name, value);
        }
     };

    onMultiChange = values => {
        console.log(values);
        this.setState({ values: values });
        this.onChange(values?.map(value => value.value) || []);
     };
  
     multipleRender() {
        const { disabled = false, id, name, value = [] } = this.props;
        const { characters } = this.state;
        if (!characters.length || !value)
           return null;
  
        console.log(value);  
        const values = value.map(v => {
           const character = characters.find(character => character.id === v);
  
           return {
              value: v,
              label: character?.name,
           };
        });
  
        return (
            <>
               <Select
                   onChange={this.onMultiChange}
                   name={name}
                   id={id}
                   isMulti isDisabled={disabled}
                   placeholder={"..."}
                   options={characters.map(character => {
                      return {
                         value: character.id,
                         label: character.name,
                      };
                   })}
                   value={values}
               />
            </>
        );
  
     }

    render() {
        const { id, isrequired=false, multiple = false, name, value } = this.props;
        const { characters } = this.state;

        if (multiple)
         return this.multipleRender();

        const isInvalid = isrequired && !value;

        return (
            <select name={name} id={id} className={`form-control ${isInvalid ? "is-invalid" : "" }`} value={value || ""}
            onChange={e => this.onChange(Number.parseInt(e.target.value))}>
                <option value="">...</option>
                {characters.map(character => {
                    return (
                        <option key={character.id} value={character.id}>{character.name}</option>
                    );
                })}
            </select>
        );
    }
}

export { CharacterSelector };

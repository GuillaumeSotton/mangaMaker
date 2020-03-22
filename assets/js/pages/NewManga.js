import React, { Component } from "react";

import { ProgressButton } from "../components/ProgressButton";
import { StatusSelector } from "../components/StatusSelector";
import { LanguageSelector } from "../components/LanguageSelector";
import { CharacterSelector } from "../components/Characters/CharacterSelector";
import axios from "axios";
import { api } from "../config";

class NewManga extends Component {

  state = {
    chapters: null,
    characters: [],
    fetchInProgress: false,
    file: null,
    imagePreviewUrl: null,
    language: "",
    name: "",
    status: "",
    summary: "",
    volumes: null
  }

  onChange = (name, value) => {
    if(name === "chapters"){
      this.setState({chapters: Number.parseInt(value)});
    }
    if(name === "name"){
      this.setState({name: value});
    }
    if(name === "language"){
      this.setState({language: value});
    }
    if(name === "file"){
        this.setState({file: value});
    }
    if(name === "status"){
        this.setState({status: value});
    }
    if(name === "summary"){
        this.setState({summary: value});
    }
    if(name === "volumes"){
        this.setState({volumes: Number.parseInt(value)});
    }
    if(name === "characters"){
      this.setState({characters: value});
    }
};

  onFileSelected = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
    this.setState({
      file: file,
      imagePreviewUrl: reader.result
    });
    }

    reader.readAsDataURL(file);
  }

  addManga = async () => {
    const { chapters, file, language, name, status, summary, volumes } = this.state;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("chapters", chapters);
    formData.append("language", language);
    formData.append("name", name);
    formData.append("status", status);
    formData.append("summary", summary);
    formData.append("volumes", volumes);

    this.setState({fetchInProgress: true});
    await axios.post(`${api.path}/new-manga`, formData);
    this.setState({fetchInProgress: false,
      chapters: null,
      characters: [],
      file: null,
      imagePreviewUrl: null,
      language: "",
      name: "",
      status: "",
      summary: "",
      volumes: null
    });
};


  render() {
    const { chapters, characters, fetchInProgress, file, imagePreviewUrl, language, name, status, summary, volumes } = this.state;

    console.log(characters);

    return (
      <>
        <div className={"container"}>
          <h1 className={"mb-4"}>New Manga</h1>

          <div className={"w-100 border border-secondary mb-3"}>
            <div className="container">
              <div className="row">
                <div className="col-3 mt-3 mb-3">
                  <div className="custom-file">
                      <input type="file" accept=".png" className="custom-file-input" id="customFile" onChange={this.onFileSelected} />
                      <label className="custom-file-label" htmlFor="customFile">{file && "File added" || "Add file..."}</label>
                  </div>
                  <div className="form-group border border-secondary" style={{height: "90%"}}>
                    {imagePreviewUrl &&
                      <img src={imagePreviewUrl} className={"w-100 h-100"} />
                    }
                  </div>
                </div>
                <div className="col-5">
                  <div className="mt-3">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className={`form-control }`} placeholder="..."
                      id="name" name={"name"} value={name || ""} onChange={e => this.onChange(e.target.name, e.target.value)} />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="Language">Language:</label>
                    <LanguageSelector id="language" name="language" value={language || ""} onChange={this.onChange}/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="description">Main characters:</label>
                    <CharacterSelector id="main_characters" name="characters" value={characters} onChange={this.onChange} multiple/>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="description">Status:</label>
                    <StatusSelector id="status" name="status" value={status || ""} onChange={this.onChange}/>
                  </div>
                  <div className="mt-3 mb-3">
                    <div className="container">
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="description">Chapters:</label>
                          <input type="number" className={`form-control }`} placeholder="..."
                            id="chapters" name={"chapters"} value={chapters || ""} onChange={e => this.onChange(e.target.name, e.target.value)} />
                        </div>
                        <div className="col-6">
                          <label htmlFor="description">Volumes:</label>
                          <input type="number" className={`form-control }`} placeholder="..."
                            id="volumes" name={"volumes"} value={volumes || ""} onChange={e => this.onChange(e.target.name, e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                <div className="mt-3">
                    <label htmlFor="description">Summary:</label>
                    <textarea className={`form-control }`} placeholder="..." rows="12" 
                      id="summary" name={"summary"} value={summary || ""} onChange={e => this.onChange(e.target.name, e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="container">
            <div className="row">
              <div className="col-6 mb-3 border border-secondary">
                <label htmlFor="chapters">Chapters:</label>
              </div>
              <div className="col-6 mb-3 border border-secondary">
                <label htmlFor="volumes">Volumes:</label>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 text-right">
              <ProgressButton label={"Create manga"} onClick={this.addManga} showSpinner={fetchInProgress} disabled={fetchInProgress}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { NewManga };

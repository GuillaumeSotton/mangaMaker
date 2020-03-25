import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "moment/moment";

import { event } from "../../styles/mangas/mangas";

@withStyles(event)
class MangaView extends Component {

  static propTypes = {
    classes: PropTypes.object,
    manga: PropTypes.object,
  };

  render() {
    const { classes, manga } = this.props;
    if (!manga) {
      return null;
    }

    //DateTime to timestamp for creation date
    const dateSlicedCreation = manga.created_at.slice(0, -6);
    const dateParseCreation = new Date(dateSlicedCreation);
    const dateToDisplayCreation = dateParseCreation.getTime() / 1000;

    //Create and close hour
    const created_at = moment.unix(dateToDisplayCreation).format("LLL");

    console.log(manga);

    return (
      <>
        <div className={classes.card}>
          <div className={classes.cardBody}>
            <div className={"container"}>
              <div className="row">
                <div className="col-2">
                  <img src={`/images/mangas/${manga.file}`} className="mt-3" style={{ width: "100%" }} />
                </div>

                <div className="col-10 mt-3 mb-3">
                  <div className={classes.user} style={{ width: "100%" }}>
                    <h3>{manga.name}</h3>
                  </div>
                  <div className="container mt-3">
                    <div className="row">
                      <div className="col-2 px-0">
                        <div className={classes.user}>
                          <div className={classes.title}>Creator</div>
                          <p>{manga.author.first_name} {manga.author.last_name}</p>
                        </div>
                      </div>
                      <div className="col-2 px-0">
                        <div className={classes.user}>
                          <div className={classes.title}>Universe</div>
                          <p>{manga.universe.name}</p>
                        </div>
                      </div>
                      <div className="col-2 px-0">
                        <div className={classes.user}>
                          <div className={classes.title}>Genre</div>
                          <p>{manga.genre.name}</p>
                        </div>
                      </div>
                      <div className="col-2 px-0">
                        <div className={classes.user}>
                          <div className={classes.title}>Status</div>
                          <p>{manga.status}</p>
                        </div>
                      </div>
                      <div className="col-2 px-0">
                        <div className={classes.user}>
                          <div className={classes.title}>Language</div>
                          <p>{manga.language}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export { MangaView };
import React, { Component } from "react";

export class NewsItem extends Component {
  formatDateTime = (dateString) => {
    let dateObj = new Date(dateString);
    return `${dateObj.toDateString()} ${dateObj.toTimeString().split(" ")[0]}`;
  };
  staticImageUrl =
    "https://www.niddk.nih.gov/-/media/Images/Components/Default-Social-Media-Images/News-Card.png";

  render() {
    let { imageUrl, title, description, newsUrl, author, date, source } =
      this.props;

    return (
      <div className="my-3">
        <div className="card h-100">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0"
            }}
          >
            <span className="badge rounded-pill bg-danger">
              {source}
            </span>
          </div>
          <img
            src={imageUrl ? imageUrl : this.staticImageUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title.length > 45 ? title.slice(0, 45) + "..." : title}
            </h5>
            <p className="card-text">
              {description.length > 88
                ? description.slice(0, 88) + "..."
                : description}
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} on{" "}
                {date
                  ? this.formatDateTime(date)
                  : new Date("January 1, 1990 11:59:59")}
              </small>
            </p>
            <a
              rel="noopener noreferrer"
              href={newsUrl}
              className="btn btn-sm btn-dark"
              target="_blank"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

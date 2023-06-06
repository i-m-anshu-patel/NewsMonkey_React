import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="card my-3" style={{ width: "22rem", height: "23rem" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '88%', zIndex:'1'}}>
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>
        <img className="card-img-top" style={{ height: "10rem" }} src={imageUrl} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title" style={{ whiteSpace: "nowrap", width: "20rem", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</h5>
          <p className="card-text" style={{ whiteSpace: "nowrap", width: "20rem", overflow: "hidden", textOverflow: "ellipsis" }}>{description}</p>
          <p className="card-text">
            <small className='text-muted'>By {author ?? 'unknown'} on {new Date(date).toGMTString().split('GMT')[0]}</small>
          </p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItem

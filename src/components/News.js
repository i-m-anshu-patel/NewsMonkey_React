import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f27e16337c434c708d9057b1bfd43e72&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            loading: false,
            totalResults: parseData.totalResults
        });
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1
        });
        this.updateNews();
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='my-3 text-center'>NewsMonkey - Top Headlines</h2>
                {this.state.loading && <Loader />}
                <div className='row'>
                    {!this.state.loading && this.state.articles && this.state.articles.length && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : "No title"} description={element.description ? element.description : "Some Description"}
                                imageUrl={element.urlToImage && element.urlToImage !== 0 ? element.urlToImage : 'https://i.ytimg.com/vi/3dRQ9JApJbs/maxresdefault.jpg'}
                                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News

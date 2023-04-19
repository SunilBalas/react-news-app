import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 9,
    country: "in",
    category: "science",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
    apiKey: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      totalResults: 0,
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeWord(
      this.props.category
    )} | News App`;
  }

  updateNews = async () => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  componentDidMount = () => {
    this.updateNews();
  };

  // fetchPreviousNews = () => {
  //   console.log("click prev");
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // fetchNextNews = () => {
  //   console.log("click next");
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
    //     this.setState({
    //       page: this.state.page + 1,
    //     });
  //     this.updateNews();
  //   }
  // };

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({
      page: this.state.page + 1,
    });

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  capitalizeWord = (word) => {
    return `${word.charAt(0).toUpperCase() + word.slice(1)}`;
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <h1 style={{ margin: "70px 0px 0px 0px" }}>
              Top Headlines - {this.capitalizeWord(this.props.category)}
            </h1>
          </div>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((news) => {
                let {
                  title,
                  description,
                  url,
                  urlToImage,
                  author,
                  publishedAt,
                  source,
                } = news;
                return (
                  <div className="col-md-4" key={news.url}>
                    <NewsItem
                      title={title ? title : ""}
                      description={description ? description : ""}
                      author={author}
                      date={publishedAt}
                      source={source ? source.name : "Unknown"}
                      newsUrl={url}
                      imageUrl={urlToImage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            className="btn btn-dark"
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.fetchPreviousNews}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            className="btn btn-dark"
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.fetchNextNews}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;

import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';

import './components/ImageList.css';

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

export default class App extends Component {
  state = {
    images: []
  };

  onSearchSubmit = async term => {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: term },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
      }
    });
    this.setState({ images: response.data.results });
  };

  render() {
    return (
      <div className='ui container'>
        <div style={{ margin: '35px 0' }}>
          <SearchBar onSubmit={this.onSearchSubmit} />
        </div>

        <div className='images-list'>
          {this.state.images.length > 0 ? (
            <ImageList images={this.state.images} />
          ) : null}
        </div>
      </div>
    );
  }
}

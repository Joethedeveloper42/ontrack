import React, { Component } from 'react';
import { ListGroup, Input, InputGroup, Button } from 'reactstrap';
import './styles/main.scss';

//NPM imports
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

//Base API endpoint
import { API_ENDPOINT } from './API';

//Component imports
import BookItem from './components/BookItem';
import PageSelector from './components/PageSelector';

class App extends Component {
  constructor(props) {
    super(props);
    this.API_URL = `${API_ENDPOINT}/api/books`;
    this.state = { 
      loading: true,
      books: [],
      count: 0,
      search: ''
     };
  }

  componentDidMount() {
    this.fetchBooks(this.API_URL);
  }

  fetchBooks = (url, page = 1) => {
    this.setState({
      loading: true
    })
    axios.post(url, {
      page,
      filters: [{type: "all", values: [this.state.search]}]
    })
      .then( response => {
        let { books, count }  = response.data;
        this.setState({
          books,
          count,
          loading: false
        })
      })
      .catch( res => console.log('error: ', res))
  }

  showBooks = () => {
    let { books } = this.state;
      return books.map( (book, ind) => {
        return <BookItem 
            key={book.id}
            author={book.book_author} 
            pages={book.book_pages} 
            city={book.book_publication_city}  
            country={book.book_publication_country}
            year={book.book_publication_year}
            title={book.book_title}
            color={ ind % 2 === 0 ? 'info' : ''}
          />
       })
    }

  handleChange = (e) => {
    //If search box is empty, repopulate with default page 1 values
    if(!e.target.value.length) {
      this.fetchBooks(this.API_URL);
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center text-primary my-3">Front End Developer Test</h1>
        <InputGroup className="my-2">
          <Input 
              className="mr-2" 
              placeholder="Search term.." 
              value={this.state.search} 
              name="search" 
              onChange={this.handleChange}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.fetchBooks(this.API_URL);
                }
              }}
            />
          <Button 
            color="primary" 
            onClick={() => this.fetchBooks(this.API_URL)} 
            className="btn-primary">Search</Button>
        </InputGroup>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <PageSelector count={this.state.count} apiURL={this.API_URL} fetchBooks={this.fetchBooks} />
          <BeatLoader
            sizeUnit={"px"}
            size={15}
            color={'#1D7874'}
            loading={this.state.loading}
          />
        </div>
        <ListGroup>
          {this.showBooks()}
        </ListGroup>
      </div>
    );
  }
}

export default App;

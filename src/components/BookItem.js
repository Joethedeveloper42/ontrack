import React from 'react';
import { ListGroupItem } from 'reactstrap';

const BookItem = ({ color, author, pages, city, country, year, title }) => {
  return (
    <ListGroupItem 
      color={color}>
      <b>Book Title:</b> {title}
      <b> Author: </b>{author}
      <b> Pages: </b>{pages}
      <b> City: </b>{city}, {country}   
      <b> Published: </b> {year}  </ListGroupItem>
  );
}

export default BookItem;
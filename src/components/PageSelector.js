import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PageSelector = ({ apiURL, fetchBooks, count }) => {
  let pages= [];
  //divide count in for loop to represent 20 books per page
  for(let i = 1; i < count/20 && i < 11; i++) {
    pages.push(
      <PaginationItem key={i} onClick={ () => fetchBooks(apiURL, i) }>
        <PaginationLink>
          {i}
        </PaginationLink>
      </PaginationItem>
    )
  }
  return (
    <Pagination>    
      {pages}
    </Pagination>
  );
}

export default PageSelector;
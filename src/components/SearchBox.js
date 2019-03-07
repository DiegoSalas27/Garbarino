import React from 'react';

const SearchBox = ({searchChange}) => {
  return(
    <div className='pa3'>
      <input className='pa3 ma2' type='search' placeholder='buscar producto'
      onChange={searchChange}/>
    </div>
  );
}

export default SearchBox;
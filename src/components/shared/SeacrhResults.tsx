

import GridPost from './GridPost';
import Loader from './Loader';

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SeacrhResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPost  posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
  
}

  


export default SeacrhResults

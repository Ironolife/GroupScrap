type Id = {
  type: 'group' | 'page';
  value: string;
};

type SearchParams = {
  searchString: string;
  ids: Id[];
};

export default SearchParams;

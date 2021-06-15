export type Post = {
  href: string;
  content?: string;
};

type SearchResponse = {
  id: string;
  name?: string;
  posts?: Post[];
}[];

export default SearchResponse;

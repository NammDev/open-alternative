export interface SearchParams {
  [key: string]: string | undefined;
}

export type MetaTags = {
  title: string;
  description: string;
  image: string;
  isFallback?: boolean;
};

import { AxiosResponse } from 'axios';

export type FeedRes = AxiosResponse<{
  current_page: number;
  data: Article[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PageLink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}>;

export type Article = {
  id: number;
  title: string;
  content: string;
  author?: string;
  source: string;
  category: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type PageLink = {
  url?: string;
  label: string;
  active: boolean;
};

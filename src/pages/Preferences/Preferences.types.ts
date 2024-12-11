import { AxiosResponse } from 'axios';

export type PreferenceRes = AxiosResponse<{
  id: number;
  user_id: number;
  sources: string[];
  categories: string[];
  authors: string[];
  created_at: string;
  updated_at: string;
}>;

export type PreferenceOptionsRes = AxiosResponse<{
  sources: string[];
  categories: string[];
}>;

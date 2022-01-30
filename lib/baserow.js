import axios from 'axios';

import constants from './constants';

const instance = axios.create({
  baseURL: `${constants.BASE_URL}/api/database`,
  timeout: 3000,
  headers: { Authorization: `Token ${constants.API_KEY}` },
  params: { user_field_names: true },
});

export const getPosts = async () => instance.get('/rows/table/45667');

export const getPostById = async (id) => instance.get(`/rows/table/45667/${id}`);

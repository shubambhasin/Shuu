import axios from 'axios';

export const instance = axios.create({
  baseURL: "https://databaseforecomm-1.shubambhasin.repl.co",
});

import axios from "axios";
import {baseUrl } from 'constants/Constants';


// TODO: Retrieve token from cookies
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDk1MTI5OTgsImlzcyI6Imh0dHBzOi8vZGVtb2FwaS5oaWdobGFuZGhvbWVzLmNvbSIsImF1ZCI6Imh0dHBzOi8vZGVtb2FwaS5oaWdobGFuZGhvbWVzLmNvbSJ9._YjUCBgNApBbu8Trnh3cIkGpHe4xQdTRYyOXs0hmm48`;

// Auth option 1 : Turn header on if authentication is required
// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
    // Auth option 2
    "Authorization": `Bearer ${token}`
  }
});


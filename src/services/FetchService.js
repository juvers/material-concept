import http from "http-common";
import {baseUrl, endPoints} from 'constants/Constants';

const getAllProjects = () => {
  return http.get(`${baseUrl}${endPoints.Projects}`)
}

// Reconstruct the logic to allow single or multiple entries using objects
const getProjectByQuery = (...args) => {
  // rewrite to pass an array of objects with keys eg RegionNUmber and values e.g 11
  return http.get(`${baseUrl}${endPoints.Projects}?RegionNumber=${args[0]}&AreaNumber=${args[1]}&ProjectNumber=${args[2]}`);
}

const getProjectByRegionNumber = (id) => {
  console.log("logging url: ", `${baseUrl}${endPoints.Projects}?RegionNumber=${id}`)
  return http.get(`${baseUrl}${endPoints.Projects}?RegionNumber=${id}`);
};


const getProjectByAreaNumber = (id) => http.get(`${baseUrl}${endPoints.Projects}?AreaNumber=${id}`);



const getProjectByProjectNumber = (id) => http.get(`${baseUrl}${endPoints.Projects}?ProjectNumber=${id}`);


const getJobsByProjectNumber = (id) => http.get(`${baseUrl}${endPoints.Jobs}/DataWarehouse/${id}`);

export {
  getAllProjects,
  getProjectByQuery,
  getProjectByRegionNumber,
  getProjectByAreaNumber,
  getProjectByProjectNumber,
  getJobsByProjectNumber
}




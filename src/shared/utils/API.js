import axios from "axios";
export let loader=false;

const API= axios.create({
  baseURL: "https://webservice.patter.com/PatterService1/",
  // responseType: "json"
});

const isHandlerEnabled = (config={}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? 
    false : true
}

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    // Modify request here
    loader=true;
  }
  return request
}

API.interceptors.request.use(
  request => requestHandler(request)
)


const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    loader=false;
  }
  return Promise.reject({ ...error })
}

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    loader=false;
  }
  return response
}

API.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)


export default API;
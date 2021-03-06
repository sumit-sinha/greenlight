import { employees } from '../mocks/employees';
import { getUserId } from '../utils/user'

const MethodType = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const makeServerRequest = async (params) => {
  const { body, headers: paramHeaders, method, host = 'http://localhost:3001', path } = params;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...paramHeaders,
  };

  const response = await fetch(`${host}${path}`, {
    body: JSON.stringify(body),
    credentials: 'same-origin',
    headers,
    method: method || MethodType.GET,
  });

  return response.json();
};

export const isAPIAvailable = true;

const getUser = (userName) => {
  return employees.find((employee) => employee.userName === userName);
};

export const getMyInformation = (userName) =>
  isAPIAvailable
    ? makeServerRequest({
        method: MethodType.GET,
        path: `/me/${userName}`,
      })
    : new Promise((resolve) => resolve(getUser(userName)));

export const getEmployees = () => {
  return makeServerRequest({
        method: MethodType.GET,
        path: '/employees'
  })
}

export const setBusy = (userName) =>
  makeServerRequest({
    body: { time: new Date().getTime() },
    method: MethodType.POST,
    path: `/me/${userName}/busy`,
  });

export const setAvailable = (userName) =>
  makeServerRequest({
    method: MethodType.POST,
    path: `/me/${userName}/available`,
  });

export const addToUserQueue = (userName) => {
  makeServerRequest({
    body: { current_user: getUserId() },
    method: MethodType.POST, 
    path: `/employees/${userName}/appoint`
  })
}

export const deleteFromUserQueue = (userName) => {
  makeServerRequest({
    body: { current_user: getUserId() },
    method: MethodType.POST, 
    path: `/employees/${userName}/cancel-appoint`
  })
}
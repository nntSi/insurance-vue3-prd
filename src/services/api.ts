import { server } from "./constants";

const isLoggedIn = () => {
  const token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
}

const clearStateLocal = () => {
  localStorage.removeItem(server.USERNAME);
  localStorage.removeItem(server.TOKEN_KEY);
  localStorage.removeItem(server.TITLE);
  localStorage.removeItem(server.FIRSTNAME);
  localStorage.removeItem(server.LASTNAME);
  localStorage.removeItem(server.EMAIL);
  localStorage.removeItem(server.MOBILE);
  localStorage.removeItem(server.POSITION);
  localStorage.removeItem(server.DEPARTMENT);
}

const setAccount = (username:string, token:string, title:string, firstname:string, lastname:string, email:string, mobile:string, position:string, department:string) => {
  localStorage.setItem(server.USERNAME, username);
  localStorage.setItem(server.TOKEN_KEY, token);
  localStorage.setItem(server.TITLE, title);
  localStorage.setItem(server.FIRSTNAME, firstname);
  localStorage.setItem(server.LASTNAME, lastname);
  localStorage.setItem(server.EMAIL, email);
  localStorage.setItem(server.MOBILE, mobile);
  localStorage.setItem(server.POSITION, position);
  localStorage.setItem(server.DEPARTMENT, department);
}

const getAccount = () => {
  const data = {
    username: localStorage.getItem(server.USERNAME),
    token: localStorage.getItem(server.TOKEN_KEY),
    title: localStorage.getItem(server.TITLE),
    firstname: localStorage.getItem(server.FIRSTNAME),
    lastname: localStorage.getItem(server.LASTNAME),
    email: localStorage.getItem(server.EMAIL),
    mobile: localStorage.getItem(server.MOBILE),
    position: localStorage.getItem(server.POSITION),
    department: localStorage.getItem(server.DEPARTMENT),
  }
  return data
}

export default {
  isLoggedIn,
  clearStateLocal,
  setAccount,
  getAccount
}
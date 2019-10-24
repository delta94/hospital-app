/**
 * setTokenToLocal
 * use localstorage to store token
 * when login/register api calls
 */
 export const setTokenToLocal = {
   token: value => localStorage.setItem("token", value),
   user: value => {
     const token = JSON.parse(window.atob(value.split(".")[1]));
     return localStorage.setItem("user", JSON.stringify(token));
   }
 };

export const getItemFromLocal = (item) => {
  const getItem = localStorage.getItem(item);
  return JSON.parse(getItem);
};

export const clearStorage = (items) => {
  return items.map(item => localStorage.removeItem(item));
}

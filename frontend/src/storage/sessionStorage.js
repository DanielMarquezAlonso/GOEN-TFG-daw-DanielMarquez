export const setLoggedInStatus = (isLoggedIn) => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    console.log("se ejecuta el sesionstorage")
  };

export const clearLoggedInStatus = () => {
  sessionStorage.removeItem("isLoggedIn");
};
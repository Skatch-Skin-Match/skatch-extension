export const getLocalStorage = () => {
  if (localStorage.getItem("user") !== null) {
    // Perform localStorage action
    const item = JSON.parse(localStorage.getItem("user") || "");
    // console.log("jjjjjjjjjjjjj", item);

    return item;
  }
  return null;
};
export {};

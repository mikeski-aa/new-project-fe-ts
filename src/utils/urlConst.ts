const LOCAL_URL: string = "https://storebuddybe.onrender.com/api/";

// not sure how I feela bout this definition here need to look it up
// suggestion to make it dynamic:
const getHeaderInfo = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

export { LOCAL_URL, getHeaderInfo };

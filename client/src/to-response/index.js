export default promise => {
  // console.log(typeof promise);
  // console.log("promiseee", promise);
  return promise
    .then(data => {
      //  console.log(" promisee data", data);
      return { data };
    })
    .catch(error => {
      // console.log("responsee err", error);
      // console.log("response eror :", error ? error.response.data : null);
      return { error };
    });
};

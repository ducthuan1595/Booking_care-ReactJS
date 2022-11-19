import axios from "../axios";

//get api
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`, { id });
};
const creatNewUserApi = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserApi = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: id,
    },
  });
};
export { handleLoginApi, getAllUsers, creatNewUserApi, deleteUserApi };

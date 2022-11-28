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
const editUserApi = (data) => {
  return axios.put("/api/edit-user", { data: data });
};
const getAllCodeService = (input) => {
  return axios.get(`/api/allcode?type=${input}`);
};
export {
  handleLoginApi,
  getAllUsers,
  creatNewUserApi,
  deleteUserApi,
  editUserApi,
  getAllCodeService,
};

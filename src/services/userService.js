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
  return axios.put("/api/edit-user", data);
};
const getAllCodeService = (input) => {
  return axios.get(`/api/allcode?type=${input}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctor = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkDoctorService = (data) => {
  return axios.post(`api/bulk-create-schedule`, data);
};
const getScheduleDoctorByDateService = (doctorId, date) => {
  return axios.get(
    `api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInfoDoctorByIdService = (doctorId) => {
  return axios.get(`api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorService = (doctorId) => {
  return axios.get(`api/get-profile-info-doctor?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

// Specialty
const postNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
const editSpecialty = (data) => {
  return axios.post("/api/edit-specialty", data);
};
const deleteSpecialty = (data) => {
  return axios.post("/api/delete-specialty", data);
}
const getAllSpecialty = () => {
  return axios.get("/api/get-all-specialty");
};
const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const postNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
}
const getAllClinic = () => {
  return axios.get("/api/get-all-clinic");
};
const getDetailClinicById = (data) => {
  return axios.get(
    `/api/get-detail-clinic-by-id?id=${data.id}`
  );
};
const getListPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data)
}
const postHandbook = (data) => {
  return axios.post('/api/create-new-handbook', data)
}
const getAllHandbook = () => {
  return axios.get('/api/get-all-handbook')
}
const getDetailHandbook = (inputId) => {
  return axios.get(`/api/get-detail-handbook?id=${inputId.id}`)
}

export {
  handleLoginApi,
  getAllUsers,
  creatNewUserApi,
  deleteUserApi,
  editUserApi,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  saveBulkDoctorService,
  getScheduleDoctorByDateService,
  getExtraInfoDoctorByIdService,
  getProfileDoctorService,
  postPatientBookAppointment,
  postVerifyBookAppointment,

  postNewSpecialty,
  editSpecialty,
  deleteSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,

  postNewClinic,
  getAllClinic,
  getDetailClinicById,
  
  getListPatientForDoctor,
  postSendRemedy,
  postHandbook,
  getAllHandbook,
  getDetailHandbook
};

import axios from "./CustomizeAxios";

const createAccount = (username,firstName,middleName,lastName,email,phone,password,avatar,statusId,roleId) => {
  return axios.post("/User/Create", { username,firstName,middleName,lastName,email,phone,password,avatar,statusId,roleId });
}

const banOrUnbanAccount = (id) => {
    return axios.patch(`/User/Ban?id=${id}`);
}

const deleteAccount = (id) => {
    return axios.patch(`/User/Delete?id=${id}`);
}

const changeRole = (userId, roleId) => {
    return axios.patch(`/User/Role`, { userId,roleId });
}

const becomeChefAPI = (userId, cardFront, cardBack, verificationFront, verificationBack) => {
    return axios.post(`/Verification/Create`, {userId, cardFront, cardBack, verificationFront, verificationBack});
}

const verifyEmailAPI = (email) => {
    return axios.post(`/User/EmailVerify`, {email});
}

const getListBecomeChef = () => {
    return axios.get(`/Verification/Get`);
}

const acceptVerifycationChef = (verificationId, verificationStatus) => {
    return axios.patch("/Verification/Update", { verificationId, verificationStatus });
}

const resetPassword = (email) => {
    return axios.patch("/User/ResetToken", { email });
}

const forgotPassword = (email, password, resetToken) => {
    return axios.patch("/User/ForgetPassword", { email, password, resetToken });
}


export {
    createAccount, banOrUnbanAccount, deleteAccount, changeRole, becomeChefAPI, verifyEmailAPI, getListBecomeChef, acceptVerifycationChef, resetPassword, forgotPassword
};

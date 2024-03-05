import axios from './CustomizeAxios'

const login = (email, password) => {
    return axios.post('/User/Login', {email, password});
}

const register = (username, email, password) => {
    return axios.post('/User/Register', {username, email, password});
}

const changePassword = (userId, oldPassword, password) => {
    return axios.patch('/User/ChangePassword', {userId, oldPassword, password});
}

const createNews = (userId, newsTitle, newsContent) => {
    return axios.post('/News/Create', {userId, newsTitle, newsContent});
}

const listNews = () => {
    return axios.get('/News/Get');
}

const getNewsById = (id) => {
    return axios.get(`/News/Get?id=${id}`);
}

const myProfile = (id) => {
    return axios.get(`/User/Profile?id=${id}`);
}

const changeMyProfile = (userId, email, firstName, middleName, lastName, phone, addresses, avatar, statusUser, role) => {
    return axios.put('/User/UpdateProfile', {userId, email, firstName, middleName, lastName, phone, addresses, avatar,
        status: statusUser, role});
}

export { login, register, changePassword, createNews, listNews, getNewsById, myProfile, changeMyProfile };
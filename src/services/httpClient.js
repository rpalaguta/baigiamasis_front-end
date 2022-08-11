import axios from "axios";

axios.defaults.baseURL = 'http://localhost/api';

//vyksta pries requesta
axios.interceptors.request.use(config => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
    // const user = useSelector((state) => state.user.value) ? JSON.parse(useSelector((state) => state.user.value)) : undefined;

    if(user) {
        const token = `Bearer ${user.token}`;
        config.headers.Authorization = token;
    }

    return config;

});

export const setAuthToken = (token) =>  {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const clearAuthToken = () => {
    delete axios.defaults.headers.common["Authorization"];
}

export default axios;
import httpClient, { setAuthToken, clearAuthToken } from './httpClient';

const getLoggedInUser = () => {
    const user = localStorage.getItem('user');

    if(!user) {
        return undefined;
    }

    return JSON.parse(user);
}

const registerUser = (userData) => {
    httpClient.post('/auth/register', userData)
        .then(res => {
            localStorage.setItem('user', JSON.stringify({
                user_id: res.data.user_id,
                name: res.data.name,
                token: res.data.token,
            }))
            setAuthToken(res.data.token);
        })
}

const loginUser = (userData) => {
    httpClient.post('/auth/login', userData)
    .then(res => {
        localStorage.setItem('user', JSON.stringify({
            user_id: res.data.user_id,
            name: res.data.name,
            token: res.data.token,
        }))
        setAuthToken(res.data.token);
    })
}

const logoutUser = () => {
    localStorage.removeItem('user');
    clearAuthToken();
}

const userService =  {
    getLoggedInUser,
    registerUser,
    loginUser,
    logoutUser,
}

export default userService;
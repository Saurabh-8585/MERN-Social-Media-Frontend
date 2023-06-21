// import axios from 'axios';


// const signIn = async (userData) => {
//     const { email, password } = userData;
//     const { data } = await axios.post(process.env.REACT_APP_SIGNIN, { email, password });
//     if (data.token) {
//         sessionStorage.setItem('user', JSON.stringify(data.token))
//     }
//     return data;
// }


// const signUp = async (userData) => {
//     const { username, email, password } = userData;
//     const { data } = await axios.post(process.env.REACT_APP_SIGNUP, { username, email, password })
//     if (data.token) {
//         sessionStorage.setItem('user', JSON.stringify(data.token))
//     }
//     return data;
// }


// const logout = () => {
//     sessionStorage.removeItem('user')
    
// }

// const authService = {
//     signUp,
//     logout,
//     signIn,
// }

// export default authService
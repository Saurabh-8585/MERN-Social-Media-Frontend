import axios from 'axios'
// const token = 


const getCurrentUser = async () => {
    const { data } = await axios.get('http://localhost:5000/api/user/currentuser', {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('user')}`,
        },
    });
    return data;
};


const UserService = {
    getCurrentUser,
};

export default UserService;
import jwtDecode from 'jwt-decode';

const getCurrentUser = (user) => {
    const decodedToken = jwtDecode(user);
    return decodedToken.userId;

}

export default getCurrentUser;
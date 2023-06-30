import jwtDecode from 'jwt-decode';

const getCurrentUser = (user) => {
    if (!user) return false;
    const decodedToken = jwtDecode(user);
    return decodedToken.userId;

}

export default getCurrentUser;
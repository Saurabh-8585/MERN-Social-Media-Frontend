import { Navigate, useLocation } from 'react-router-dom'
import getCurrentUser from '../utils/CurrentUser';

const ProtectedRoute = ({ children }) => {
    const user = getCurrentUser(sessionStorage.getItem('user'))
     const location = useLocation();
    if (!user) {
        return <Navigate to='/SignIn' state={{ from: location }} />
    }
    return children;

}
export default ProtectedRoute
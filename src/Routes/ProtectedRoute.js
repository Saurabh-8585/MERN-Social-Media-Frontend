import { Navigate, useLocation } from 'react-router-dom'
import getCurrentUser from '../utils/CurrentUser';

const ProtectedRoute = ({ children }) => {
    const user = sessionStorage.getItem('user')
     const location = useLocation();
    if (!user) {
        return <Navigate to='/signin' state={{ from: location }} />
    }
    return children;

}
export default ProtectedRoute
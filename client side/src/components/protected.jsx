import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const user = useSelector(state => state.user.user);
    return (
        <>
            {user ? children : <><h1 style={{ color: '#284087' }}>You are not connected</h1>
                <Link to='/SignUp' style={{ color: 'white', backgroundColor: '#284087', padding: '8px', borderRadius: '5px', marginRight: '5px' }} >sign Up</Link>
                <Link to='/LogIn' style={{ color: 'white', backgroundColor: '#284087', padding: '8px', borderRadius: '5px' }} >log in</Link>
            </>}
        </>
    )
}
export default ProtectedRoute
import { assets } from "../assets/admin_assets/assets";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminNav = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token');
        logout();
        navigate('/login');
    };

    return (
        <div className="flex items-center py-2 px-[4%] justify-between">
            <img src={assets.logo} alt="" className="w-[max(10%,80px)]" />
            <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default AdminNav

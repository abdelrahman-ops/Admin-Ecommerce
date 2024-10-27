import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminApp from './pages/AdminApp';
import Orders from './pages/Orders';
import ListItems from './pages/ListItems';
import AddItem from './pages/AddItem';
import { AuthProvider } from './hooks/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={ <ProtectedRoute> <AdminApp /> </ProtectedRoute> }>
                        <Route path="add" element={<AddItem />} />
                        <Route path="list" element={<ListItems />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
        
        
    );
};

export default App;

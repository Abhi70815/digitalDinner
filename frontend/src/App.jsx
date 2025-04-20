import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Menu from './components/Menu';
import Order from './components/Order';
import Navbar from './components/Navbar';
import { UserProvider, UserContext } from './UserContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    if (!user || !user.token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/menu" element={
                            <ProtectedRoute>
                                <Menu />
                            </ProtectedRoute>
                        } />
                        <Route path="/order" element={
                            <ProtectedRoute>
                                <Order />
                            </ProtectedRoute>
                        } />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;

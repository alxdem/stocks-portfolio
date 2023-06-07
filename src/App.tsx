import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AboutPage, DashboardPage } from './pages';
import { NavLink } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <div className='app'>
                <ul>
                    <li>
                        <NavLink
                            to='/'
                            end
                            style={({ isActive }) => ({ color: isActive ? 'var(--text)' : '#111' })}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/about'
                            end
                            style={({ isActive }) => ({ color: isActive ? 'var(--text)' : '#111' })}
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
                <Routes>
                    <Route path='/' element={<DashboardPage />} />
                    <Route path='/about' element={<AboutPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AboutPage, DashboardPage } from './pages';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {
    return (
        <Router>
            <div className='app'>
                {/* <ul>
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
                </ul> */}
                <MainLayout>
                    <Routes>
                        <Route path='/' element={<DashboardPage />} />
                        <Route path='/about' element={<AboutPage />} />
                    </Routes>
                </MainLayout>
            </div>
        </Router>
    )
}

export default App

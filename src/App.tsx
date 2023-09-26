import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AboutPage, DashboardPage } from './pages';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {
    return (
        <Router>
            <div className='app'>
                <MainLayout>
                    <Routes>
                        <Route path='/' element={<DashboardPage />} />
                        <Route path='/dashboard' element={<DashboardPage />} />
                        <Route path='/about' element={<AboutPage />} />
                    </Routes>
                </MainLayout>
            </div>
        </Router>
    )
}

export default App

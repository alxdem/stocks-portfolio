import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AboutPage, DashboardPage, PortfolioPage, StockPage, TickerPage, OperationsPage, Page404 } from './pages';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {
    return (
        <Router basename='/stocks-portfolio'>
            <div className='app'>
                <MainLayout>
                    <Routes>
                        <Route path='/' element={<DashboardPage />} />
                        <Route path='/dashboard' element={<DashboardPage />} />
                        <Route path='/stock' element={<StockPage />} />
                        <Route path='/stock/:ticker' element={<TickerPage />} />
                        <Route path='/about' element={<AboutPage />} />
                        <Route path='/portfolio' element={<PortfolioPage />} />
                        <Route path='/operations' element={<OperationsPage />} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </MainLayout>
            </div>
        </Router>
    )
}

export default App

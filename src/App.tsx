import {BrowserRouter, Routes, Route} from 'react-router';
import { MainLayout } from '@layouts/index';
import {
    DashboardPage,
    AboutPage,
    StockPage,
    TickerPage,
    PortfolioPage,
    OperationsPage,
    Page404,
    Deposit,
} from '@pages/index';
import AppToaster from '@organisms/AppToaster/AppToaster';

function App() {
    const savedTheme = localStorage.getItem('theme');
    const isThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (isThemeDark ? 'dark' : 'light');

    document.querySelector('body')?.setAttribute('data-theme', theme);

    return (
        <BrowserRouter basename='/'>
            <div className='app'>
                <AppToaster />
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route index element={<DashboardPage/>}/>
                        <Route path='dashboard' element={<DashboardPage/>}/>
                        <Route path='about' element={<AboutPage/>}/>
                        <Route path='stock'>
                            <Route index element={<StockPage/>}/>
                            <Route path=':ticker' element={<TickerPage/>}/>
                        </Route>
                        <Route path='portfolio' element={<PortfolioPage/>}/>
                        <Route path='operations' element={<OperationsPage/>}/>
                        <Route path='deposit' element={<Deposit/>}/>
                        <Route path='/*' element={<Page404/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
)
}

export default App;

import { useState } from 'react';
import reactLogo from './../assets/react.svg';

const DashboardPage = () => {
    const [count, setCount] = useState(0);
    const root = document.querySelector(':root');

    console.log('roor', root);

    const themeChange = () => {
        root?.classList.toggle('dark');
    };

    return (
        <>
            <h1>Dashboard Page</h1>
            <h2>Dashboard Page</h2>
            <h3>Dashboard Page</h3>
            <h4>Dashboard Page</h4>
            <h5>Dashboard Page</h5>
            <h6>Dashboard Page</h6>

            <ul>
                <li>Dashboard</li>
                <li>item 2</li>
                <li>Your name</li>
            </ul>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <button onClick={themeChange}>Change theme</button>
            </div>
        </>
    );
};

export default DashboardPage;
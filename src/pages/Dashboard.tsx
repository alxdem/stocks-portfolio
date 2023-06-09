import { useState } from 'react';
import reactLogo from './../assets/react.svg';

const DashboardPage = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Dashboard Page</h1>
            <h2>Dashboard Page</h2>
            <h3>Dashboard Page</h3>

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
            </div>
        </>
    );
};

export default DashboardPage;
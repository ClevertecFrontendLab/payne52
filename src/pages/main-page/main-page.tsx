import React, { useState } from 'react';

import './main-page.css';

import reactLogo from '/react.svg';
import tsLogo from '/ts.svg';
import viteLogo from '/vite.svg';

export const MainPage: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank' rel='noreferrer'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
                <a href='https://www.typescriptlang.org/' target='_blank' rel='noreferrer'>
                    <img src={tsLogo} className='logo' alt='TS logo' />
                </a>
            </div>
            <h1>Vite + React + TS</h1>
            <div className='card'>
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/pages/main-page.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
        </>
    );
};

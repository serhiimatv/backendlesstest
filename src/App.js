import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import tabs from './tabs.json';

const Components = {
    dummyChart: lazy(() => import('./tabs/DummyChart')),
    dummyList: lazy(() => import('./tabs/DummyList')),
    dummyTable: lazy(() => import('./tabs/DummyTable')),
};

const App = () => {
    const sortedTabs = tabs.sort((item1, item2) => item1.order - item2.order);

    const fn = (string) => {
        const entries = Object.entries(Components);

        const array = entries.find((item) => {
            if (item[0] === string) {
                return item[1];
            }
        });

        const Element = array[1];

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Element />
            </Suspense>
        );
    };

    return (
        <>
            <header>
                <Link to="/">Home</Link>
                {sortedTabs.map((item) => (
                    <Link key={item.id} to={item.id}>
                        {item.title}
                    </Link>
                ))}
            </header>
            <Routes>
                <Route index element={fn(sortedTabs[0].id)}></Route>
                {sortedTabs.map((tab) => (
                    <Route key={tab.id} path={tab.id} element={fn(tab.id)}></Route>
                ))}
            </Routes>
        </>
    );
};

export default App;

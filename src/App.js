import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import tabs from './tabs.json';

const createComponentsMap = () => {
    const components = {};
    tabs.forEach((item) => {
        components[item.id] = lazy(() => import(`./${item.path}`));
    });

    return components;
};

const Components = createComponentsMap();

const App = () => {
    const sortedTabs = tabs.sort((item1, item2) => item1.order - item2.order);

    const getComponent = (string) => {
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
                <Route index element={getComponent(sortedTabs[0].id)}></Route>
                {sortedTabs.map((tab) => (
                    <Route key={tab.id} path={tab.id} element={getComponent(tab.id)}></Route>
                ))}
            </Routes>
        </>
    );
};

export default App;

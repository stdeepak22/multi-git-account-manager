import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { mainStore } from './store/mainStore';
import { Provider } from 'react-redux';
const root = createRoot(document.getElementById("app"));

const App = () => <h2>Basic React App</h2>;
root.render(
    <Provider store={mainStore}>
        <App />
    </Provider>
);
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/BasePage'
import { mainStore } from './store/mainStore';
import { Provider } from 'react-redux';
const root = createRoot(document.getElementById("app"));

window.appConstants = {
    appName: "Multi Git Account Manager"
}
root.render(
    <Provider store={mainStore}>
        <App />
    </Provider>
);
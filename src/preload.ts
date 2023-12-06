// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, shell } from "electron";
console.log('from preload.js file.');

let obj = {
    quitApp: () => ipcRenderer.invoke("quitApp"),
    toggleMax: () => ipcRenderer.invoke("toggle-max"),
    toggleMin: () => ipcRenderer.invoke("toggle-min"),
}

contextBridge.exposeInMainWorld("electron", obj);
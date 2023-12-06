import { App, BrowserWindow, ipcMain } from "electron";

export const initializeAppMinMaxClose = (app: App, mainWindow: BrowserWindow) => {
    ipcMain.handle("quitApp", () => {
        app.quit();
    })

    ipcMain.handle("toggle-max", () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    })
    ipcMain.handle("toggle-min", () => {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        } else {
            mainWindow.minimize();
        }
    })
}
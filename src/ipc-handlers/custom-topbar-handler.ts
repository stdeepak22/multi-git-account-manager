import { App, BrowserWindow, ipcMain, dialog } from "electron";
import { existsSync, readdirSync } from 'fs'
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

    ipcMain.handle('directory-selection', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        })
        if (canceled) {
            return
        } else {
            let selectedPath = filePaths[0];
            let error = undefined;
            if (!existsSync(selectedPath)) {
                error = `PATH_NOT_FOUND`;
            }
            else if (readdirSync(selectedPath).length > 0) {
                error = `PATH_NON_EMPTY`
            }
            return {
                selectedPath,
                error
            }
        }
    })
}
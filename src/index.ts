import { app, BrowserWindow, ipcMain } from 'electron';
import './ipc-handlers/ssh-work/index';
import './ipc-handlers/axios-fetch-handlers'
import './ipc-handlers/shellHandler';
import { initializeAppMinMaxClose } from './ipc-handlers/custom-topbar-handler';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}


let mainWindow: BrowserWindow;
const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    minHeight: 780,
    minWidth: 1280,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    frame: false
  });
  mainWindow.menuBarVisible = false;
  mainWindow.maximize();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  initializeAppMinMaxClose(app, mainWindow);
};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
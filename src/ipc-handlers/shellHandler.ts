import { ipcMain, shell } from "electron";

ipcMain.handle("openLinkInBrowser", (_, link) => {
    shell.openExternal(link);
})
import { ipcMain } from "electron";
import { JsonDB, Config } from "node-json-db";
import { getConstants } from "./ssh-work/ssh-constants";


let { dbFilePath } = getConstants();

var db = new JsonDB(new Config(dbFilePath, true, true, "/"));

ipcMain.handle("db:reloadAsync", () => {
    return db.reload();
})

ipcMain.handle("db:existsAsync", (_, uri) => {
    return db.exists(uri);
})

ipcMain.handle("db:getDataAsync", (_, uri, defaultValue = null) => {
    return db.getObjectDefault(uri, defaultValue);
})

ipcMain.handle("db:setDataAsync", (_, uri, data, merge = false) => {
    return db.push(uri, data, !merge);
})

ipcMain.handle("db:getCountAsync", (_, uri) => {
    return db.count(uri);
})

ipcMain.handle("db:deleteAsync", (_, uri) => {
    return db.delete(uri);
})

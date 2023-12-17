// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
console.log('from preload.js file.');


let db = {
    reload: () => ipcRenderer.invoke("db:reloadAsync"),
    exists: (uri: string) => ipcRenderer.invoke("db:existsAsync", uri),
    getData: (uri: string, defaultValue: any) => ipcRenderer.invoke("db:getDataAsync", uri, defaultValue),
    setData: (uri: string, data: any, merge: boolean) => ipcRenderer.invoke("db:setDataAsync", uri, data, merge),
    count: (uri: string) => ipcRenderer.invoke("db:getCountAsync", uri),
    delete: (uri: string) => ipcRenderer.invoke("db:deleteAsync", uri),
}

let obj = {
    readConfigFile: () => ipcRenderer.invoke("get-ssh-config-file", "config - copy"),
    generateSshKeys: (git_username: string) => ipcRenderer.invoke("generate-ssh-key", git_username),
    remove_sshkey: (git_username: string) => ipcRenderer.invoke("remove-ssh-key", git_username),
    readPublicKey: (git_username: string) => ipcRenderer.invoke("read-pub-ssh-key", git_username),
    quitApp: () => ipcRenderer.invoke("quitApp"),
    toggleMax: () => ipcRenderer.invoke("toggle-max"),
    toggleMin: () => ipcRenderer.invoke("toggle-min"),
    checkGitUserExist: (git_username: string) => ipcRenderer.invoke("check-git-user-exist", git_username),
    openLinkInBrowser: (url: string) => ipcRenderer.invoke('openLinkInBrowser', url),
    openDirPath: (dirPath: string) => ipcRenderer.invoke('openDirPath', dirPath),
    verityGitAccessOverSSH: (git_username: string) => ipcRenderer.invoke('verityGitAccessOverSSH', git_username),
    openDirectorySelector: () => ipcRenderer.invoke('directory-selection'),
    cloneGitRepo: (gitUserName: string, repoName: string, dir: string) => ipcRenderer.invoke('clone-git-repository', gitUserName, repoName, dir),
    db
}

contextBridge.exposeInMainWorld("electron", obj);
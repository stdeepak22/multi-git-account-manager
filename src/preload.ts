// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, shell } from "electron";
console.log('from preload.js file.');

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
    verityGitAccessOverSSH: (git_username: string) => ipcRenderer.invoke('verityGitAccessOverSSH', git_username),
    openDirectorySelector: () => ipcRenderer.invoke('directory-selection'),
    cloneGitRepo: (gitUserName: string, repoName: string, dir: string) => ipcRenderer.invoke('clone-git-repository', gitUserName, repoName, dir)
}

contextBridge.exposeInMainWorld("electron", obj);
import { ipcMain, shell } from "electron";
import { exec } from 'child_process';

ipcMain.handle("openLinkInBrowser", (_, link) => {
    shell.openExternal(link);
})

ipcMain.handle("verityGitAccessOverSSH", (_, gitUserName) => {
    gitUserName = gitUserName.trim().toLocaleLowerCase();
    return new Promise((res, rej) => {
        exec(`ssh -T git@${gitUserName}.github.com`, { timeout: 10000 }, (err, stdout, stderr) => {
            res({ stdout, stderr });
        })
    })
})

ipcMain.handle("clone-git-repository", (_, gitUserName, repoName, dir) => {
    gitUserName = gitUserName.trim().toLocaleLowerCase();
    const cmd = `git clone "git@${gitUserName}.github.com:${gitUserName}/${repoName}" "${dir}"`
    return new Promise((res, rej) => {
        exec(cmd, (err, stdout, stderr) => {
            res({ err, stdout, stderr });
        })
    })
})
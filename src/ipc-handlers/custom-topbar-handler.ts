import { App, BrowserWindow, ipcMain, dialog } from "electron";
import { existsSync, readdirSync } from 'fs'
import { exec, execSync } from 'child_process';

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

    interface DirectorySelectionOps {
        shouldBeEmpty: boolean
        shouldBeExistingGit: boolean;
    }
    ipcMain.handle('directory-selection', async (_, ops: DirectorySelectionOps = { shouldBeEmpty: false, shouldBeExistingGit: false }) => {
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        })
        if (canceled) {
            return
        } else {
            let selectedPath = filePaths[0];
            let error = undefined;
            let extra: any = {};
            if (!existsSync(selectedPath)) {
                error = `PATH_NOT_FOUND`;
            }
            else if (ops.shouldBeEmpty && readdirSync(selectedPath).length > 0) {
                error = `PATH_NON_EMPTY`
            }
            else if (ops.shouldBeExistingGit) {
                let result: any = await new Promise(res => {
                    exec(`git status`, { cwd: selectedPath, encoding: 'utf-8' }, (err, stdout, stderr) => {
                        res({ stdout, stderr });
                    });
                })
                if (result.stderr.toLocaleLowerCase().includes(`not a git repository`)) {
                    error = `NOT_A_GIT_DIR`
                } else {
                    extra.remote_url = execSync(`git remote get-url origin`, { cwd: selectedPath, encoding: 'utf-8' });
                }
            }
            return {
                selectedPath,
                error,
                extra
            }
        }
    })
}
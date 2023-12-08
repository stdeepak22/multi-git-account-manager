import { ipcMain } from 'electron';
import { getSshAccounts, readPublicKey } from './get-account';
import { generateSshKeysAndAdd, removeKeysAndConfig } from './generate-add-remove';

ipcMain.handle("get-ssh-config-file", getSshAccounts);
ipcMain.handle("generate-ssh-key", (_, git_username) => generateSshKeysAndAdd(git_username));
ipcMain.handle("read-pub-ssh-key", (_, git_username) => readPublicKey(git_username));
ipcMain.handle("remove-ssh-key", (_, git_username) => removeKeysAndConfig(git_username));


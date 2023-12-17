import { getConstants, getKeysFileName } from "./ssh-constants";
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

class ConfigDetail {
    Host: string;
    HostName: string;
    User: string;
    IdentityFile: string;
    AddedBy: string;
}

function getSshAccounts() {
    let { sshConfigFilePath, addedByName } = getConstants();
    if (existsSync(sshConfigFilePath)) {
        var fullText = readFileSync(sshConfigFilePath, { encoding: 'utf8' });
        let lines = fullText.split("\n");
        var all: ConfigDetail[] = []
        let cur: ConfigDetail = new ConfigDetail();

        const checkAndAdd = () => {
            if (Object.keys(cur).length > 0) {
                all.push(cur);
                cur = new ConfigDetail();
            }
        }

        lines.forEach(c => {
            c = c.trim();
            if (c.startsWith("Host ")) {
                checkAndAdd();
                cur.Host = c.replace("Host ", "").trim();
            }
            if (c.startsWith("HostName ")) {
                cur.HostName = c.replace("HostName ", "").trim();
            }
            if (c.startsWith("User ")) {
                cur.User = c.replace("User ", "").trim();
            }
            if (c.startsWith("IdentityFile ")) {
                cur.IdentityFile = c.replace("IdentityFile ", "").trim();
            }
            if (c.startsWith("# AddedBy ")) {
                cur.AddedBy = c.replace("# AddedBy ", "").trim();
            }
        });
        checkAndAdd();

        return all.filter(c => c.AddedBy === addedByName);
    } else {
        return null;
    }
}

function readPublicKey(gitUserName: string) {
    gitUserName = gitUserName.trim().toLocaleLowerCase();
    let { sshConfigFilePath, appWorkingDirPath } = getConstants();
    if (existsSync(sshConfigFilePath)) {
        const [_, pubKeyFileName] = getKeysFileName(gitUserName);
        const pubKeyFilePath = join(appWorkingDirPath, pubKeyFileName);
        return readFileSync(pubKeyFilePath, { encoding: 'utf8' });
    }
    return false;
}

export { getSshAccounts, readPublicKey };
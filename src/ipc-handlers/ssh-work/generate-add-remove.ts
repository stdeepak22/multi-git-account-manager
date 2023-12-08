import { getConstants, getConfigStartEndComments, getKeysFileName, Constants } from "./ssh-constants";
import { execSync } from "child_process";
import { existsSync, appendFileSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { join } from "path";

function generateSshKeysAndAdd(git_username: string) {
    let constants = getConstants();
    let { userName, hostname, appWorkingDirPath } = constants;

    const [privKeyFileName] = getKeysFileName(git_username);
    const comment = `${userName}@${hostname}: added ssh for ${git_username} for ${"github.com"}`;
    const cmd = `ssh-keygen -t rsa -b 2048 -f "${privKeyFileName}" -C "${comment}" -P ""`;

    if (!existsSync(appWorkingDirPath)) {
        mkdirSync(appWorkingDirPath);
    }
    try {

        const result = execSync(cmd, { cwd: appWorkingDirPath, encoding: 'utf-8' });
        const isSucess = result.includes("The key's randomart image is");
        isSucess && addIdentityKeysToConfig(git_username, privKeyFileName, constants);
        return isSucess;
    }
    catch (ex) {
        throw Error('Key already exist for this Git account.');
    }
}

function addIdentityKeysToConfig(git_username: string, fileName: string, constants: Constants) {
    let { appWorkingDir, addedByName, sshConfigFilePath } = constants;
    let [start, end] = getConfigStartEndComments(git_username);
    const dt = new Date();
    let lines = [`\n\n\n`]; //couple of empty lines
    lines.push(start);
    lines.push(`Host ${git_username}.github.com`);
    lines.push(`  HostName github.com`);
    lines.push(`  User git`);
    lines.push(`  IdentityFile ~/${appWorkingDir}/${fileName}`);
    lines.push(`  AddedBy ${addedByName}`);
    lines.push(`  AddedAt ${dt.toISOString()}`);
    lines.push(end);
    appendFileSync(sshConfigFilePath, lines.join("\n"));
}


function getStartEndWithEmptyLines(lines: string[], git_username: string) {
    let idxStart = -1;
    let idxEnd = -1;
    let [start, end] = getConfigStartEndComments(git_username);

    let emptyCount = 0;
    for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (l.trim().length === 0) {
            emptyCount++;
        } else {
            if (l === start) {
                idxStart = i - emptyCount;
            }
            else if (l === end) {
                idxEnd = i;
            }
            emptyCount = 0;
        }
        if (idxStart < idxEnd) {
            break;
        }
    }
    return [idxStart, idxEnd];
}
function removeKeysAndConfig(git_username: string) {
    let { sshConfigFilePath, appWorkingDirPath } = getConstants();
    if (existsSync(sshConfigFilePath)) {
        var fullText = readFileSync(sshConfigFilePath, { encoding: 'utf8' });
        let lines = fullText.split("\n");
        let [idxStart, idxEnd] = getStartEndWithEmptyLines(lines, git_username);
        if (idxStart === -1 || idxEnd === -1) {
            throw Error('No such account configured.');
        }
        let newLines = [...lines.slice(0, idxStart), ...lines.slice(idxEnd + 1)];
        writeFileSync(sshConfigFilePath, newLines.join('\n'));

        //because we have removed from config, lets remove public/private key files from appWorkinDir also.
        const [priveyFile, pubKeyFile] = getKeysFileName(git_username);
        rmSync(join(appWorkingDirPath, priveyFile));
        rmSync(join(appWorkingDirPath, pubKeyFile));
        return true;
    }
    return false;
}


export { generateSshKeysAndAdd, removeKeysAndConfig };
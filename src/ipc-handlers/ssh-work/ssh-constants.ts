import { hostname, homedir, userInfo } from 'os';
import { join } from 'path';

const sshDirName = '.ssh';
const appWorkingDir = '.multi-git-account-manager';
const addedByName = 'by-multi-git-account-manager';

export class Constants {
    appWorkingDir: string;
    hostname: string;
    userName: string;
    homedir: string;
    addedByName: string;
    sshConfigFilePath: string;
    sshKnownHostsFilePath: string;
    appWorkingDirPath: string;
}

function getConstants(): Constants {
    let _homedir = homedir();
    return {
        appWorkingDir,
        hostname: hostname(),
        userName: userInfo().username,
        homedir: _homedir,
        addedByName,
        sshConfigFilePath: join(_homedir, sshDirName, 'config'),
        sshKnownHostsFilePath: join(_homedir, sshDirName, 'known_hosts'),
        appWorkingDirPath: join(_homedir, appWorkingDir)
    }
}

function getConfigStartEndComments(git_username: string) {
    return [`#START::${git_username} account for github`, `#END::${git_username} account for github`];
}

function getKeysFileName(git_username: string) {
    const privateKeyFileName = `mgam_git_${git_username}`;
    return [privateKeyFileName, `${privateKeyFileName}.pub`];
}

export { getConstants, getKeysFileName, getConfigStartEndComments }

//#region toast getter/setter methods
export const { setToastCallback, showToast } = (() => {
    let toastRef;
    const setToastCallback = ref => {
        toastRef = ref;
    }

    const showToast = data => {
        toastRef.current.show(data);
    }

    return {
        setToastCallback,
        showToast
    }
})();
//#endregion


//#region Util methods
export let isoStringToReadable = isoString => {
    const dt = new Date(isoString);
    return `${dt.toLocaleTimeString()}, ${dt.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}`;
}

export const copyToClip = async text => {
    await navigator.clipboard.writeText(text)
}
//#endregion


//#region Git methods
export const isGitUserExist = async gitUserName => {
    return await window.electron.checkGitUserExist(gitUserName);
}

export const generateSshKeys = async gitUserName => {
    return await window.electron.generateSshKeys(gitUserName);
}

export const getPublicKey = async gitUserName => {
    return await window.electron.readPublicKey(gitUserName);
}

export const removeSshKeys = async gitUserName => {
    return await window.electron.remove_sshkey(gitUserName);
}

export const verifySSHAccess = async gitUserName => {
    try {
        let { stdout, stderr } = await window.electron.verityGitAccessOverSSH(gitUserName);
        return (stderr + stdout).includes(`You've successfully authenticated`);
    } catch {
        return false;
    }
}

export const cloneGitRepo = async (gitUserName, repoName, dir) => {
    let res = await window.electron.cloneGitRepo(gitUserName, repoName, dir);
    let errMsg = res.err?.message;
    if (errMsg && errMsg.includes("Permission denied")) {
        return "DENIED";
    } else if (errMsg && errMsg.includes("Repository not found.")) {
        return "NOT_FOUND";
    }
    return "SUCCESSFUL";
}
//#endregion


//#region Min-Max-Restore toolbar methods
export const toggleMinimize = () => {
    window.electron.toggleMin();
}

export const toggleMaxSize = () => {
    window.electron.toggleMax();
}

export const closeTheApp = () => {
    window.electron.quitApp();
}
//#endregion


//#region SSH/FS methods
export const openExternalLink = url => {
    window.electron.openLinkInBrowser(url);
}

export const openDirPath = dirPath => {
    window.electron.openDirPath(dirPath);
}

export const openDirectorySelector = async () => {
    return await window.electron.openDirectorySelector();
}

//#endregion


//#region DB Methods

export const db_reload = async () => {
    return window.electron.db.reload();
}

export const db_exists = async (uri) => {
    return window.electron.db.exists(uri);
}

export const db_getData = async (uri, defaultValue = null) => {
    return window.electron.db.getData(uri, defaultValue);
}

export const db_setData = async (uri, data, merge = false) => {
    return window.electron.db.setData(uri, data, merge);
}

export const db_count = async (uri) => {
    return window.electron.db.count(uri);
}

export const db_delete = async (uri) => {
    return window.electron.db.delete(uri);
}
//#endregion


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

export const { openExternalLink, verifySSHAccess } = (() => {
    const openExternalLink = url => {
        window.electron.openLinkInBrowser(url);
    }

    const verifySSHAccess = gitUserName => window.electron.verityGitAccessOverSSH(gitUserName)
    return { openExternalLink, verifySSHAccess }
})();


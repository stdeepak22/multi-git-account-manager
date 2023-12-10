
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


export const { isoStringToReadable } = (() => {
    let isoStringToReadable = isoString => {
        const dt = new Date(isoString);
        return `${dt.toLocaleTimeString()}, ${dt.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}`;
    }
    return {
        isoStringToReadable
    }
})()

export const { openExternalLink, verifySSHAccess, getPublicKey } = (() => {
    const openExternalLink = url => {
        window.electron.openLinkInBrowser(url);
    }

    const verifySSHAccess = async gitUserName => {
        try {
            let { stdout, stderr } = await window.electron.verityGitAccessOverSSH(gitUserName);
            return (stderr + stdout).includes(`You've successfully authenticated`);
        } catch (_) {
            return false;
        }
    }

    const getPublicKey = gitUserName => window.electron.readPublicKey(gitUserName);

    return { openExternalLink, verifySSHAccess, getPublicKey }
})();


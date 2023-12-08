
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
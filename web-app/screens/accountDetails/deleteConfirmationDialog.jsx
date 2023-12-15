import React, { forwardRef, useImperativeHandle } from "react"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { useDispatch } from "react-redux";
import { globalStuffActions } from "../../store/slices/globalStuffSlice";
import { ScreensMapping } from "../screenConfig";
import { sshKeysActions } from "../../store/slices/sshKeySlice";
import { removeSshKeys } from "../../src/non-component-sharing";


export const DeleteConfirmationDialog = forwardRef(({ gitUserName }, ref) => {
    const dispatch = useDispatch();
    const deleteAcc = () => {
        removeSshKeys(gitUserName).then(() => {
            dispatch(sshKeysActions.loadSavedKeys())
            dispatch(globalStuffActions.setScreen({
                screen: ScreensMapping.addedKeys,
                extra: {}
            }))
        });
    };

    const showConfirmDialog = () => {
        confirmDialog({
            header: 'Delete Confirmation',
            message: () => <div className='text-justify'>
                <label>Do you want to delete this SSH Key pair for "{gitUserName}"?</label>
                <div className="text-red-400 mt-3"><span className="font-semibold">Remember:</span> this will not delete the public key you have allowed
                    in your github, and your local git repository will not work with remote repository until you correct the remote origin url.</div>
            </div>,
            className: `max-w-30rem`,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: deleteAcc,
        });
    }

    useImperativeHandle(ref, () => ({
        showConfirmDialog,
    }));

    return <>
        <ConfirmDialog />
    </>
});
import React from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import HelpVideo from './../../assets/git-add-ssh-key.mp4';
import { Divider } from "primereact/divider";

export const ShowSshConfigureVideoDialog = ({ onClose }) => {
    return <Dialog header="How to setup SSH key?" visible={true} style={{ width: 850 }} onHide={onClose}>
        <p className="m-0">
            <video src={HelpVideo} autoPlay controls={true} className="w-full" />
        </p>
    </Dialog>
}


export const ShowPublicKeyDialog = ({ pubKey, onClose, onCopy }) => {
    return <Dialog header="Public Key" visible={true} style={{ width: 650 }} onHide={onClose}>
        <p className="m-0 w-full word-wrap-break text-primary text-sm">
            {pubKey}
        </p>
        <Divider />
        <div className="flex align-items-center justify-content-center mt-4">
            <Button icon="pi pi-copy" onClick={onCopy} label="Copy Key" />
        </div>
    </Dialog>
}

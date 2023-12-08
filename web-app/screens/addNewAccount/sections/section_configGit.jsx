import React, { useState } from "react"
import HelpVideo from './../../../../assets/git-add-ssh-key.mp4';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { openExternalLink } from "../../../src/non-component-sharing";
import { addGitAccountActions } from "../../../store/slices/addGitAccountSlice";


const DialogWithVideo = ({ onClose }) => {
    return <Dialog header="How to set SSH key" visible={true} style={{ width: 850 }} onHide={onClose}>
        <p className="m-0">
            <video src={HelpVideo} autoPlay controls={true} className="w-full" />
        </p>
    </Dialog>
}
export const Section_ConfigGit = () => {
    const dispatch = useDispatch();
    const { name, confirmedPubKeyConfigured } = useSelector(st => st.addGitAccount);

    const [showVideo, setShowVideo] = useState(false);
    const toggleVideoDialog = () => {
        setShowVideo(st => !st);
    }

    return <div className='flex justify-content-center align-items-center flex-grow-1 fadein animation-fill-forwards animation-duration-500'
        style={{ opacity: 0 }}>
        <div className='flex-grow-1'>
            {showVideo && <DialogWithVideo onClose={toggleVideoDialog} />}
            <Panel
                header="How to configure public key?"
            >
                <div>
                    In previous steps we generated a key pair - private key + public key. This Public key we will give to Github, and then using SSH
                    if your local machine try to access, it will be allowed as private key is available in your local machine corresponding to same public key you just configured in GitHub. <br /><br />
                    <i className="text-primary"><span className="font-semibold">Remember:</span> Your private key is still in your local system, and doesn't need to be give to anyone.</i><br /><br />
                    We can configure SSH by following steps -
                    <ol>
                        <li>goto your github account <code className="text-primary">"https://github.com/{name}"</code></li>
                        <li>navigate to <code className="text-primary">"Settings"</code></li>
                        <li>navigate to <code className="text-primary">"SSH and GPG keys"</code></li>
                        <li>click on button <code className="text-primary">"New SSH Key" </code><Tag value="Open" icon="pi pi-external-link" className="cursor-pointer" onClick={() => openExternalLink(`https://github.com/settings/ssh/new`)} /></li>
                        <li>paste the public key in <code className="text-primary">"Key"</code> area (you can copy key from below) </li>
                        <li>provide a descriptive name to <code className="text-primary">"Title"</code> field, so you can remember it.</li>
                        <li>click <code className="text-primary">"Add SSH Key"</code> to save</li>
                        <li>thats it, its done!! <Avatar icon="pi pi-check" shape="circle" className="bg-green-400 text-white" /></li>
                    </ol>

                    Watch the steps in Video <Tag value="Video" icon="pi pi-play" className="cursor-pointer" onClick={toggleVideoDialog} /><br />
                </div>
            </Panel>
            <Panel className="mt-4 no-header">
                <div className="flex justify-content-center align-items-center">
                    You can go to next steps if you have completed above steps.
                    Have you done? <Button className="ml-4 w-6rem" severity="success"
                        label="Yes"
                        icon="pi pi-check"
                        iconPos="right"
                        size="sm"
                        onClick={() => dispatch(addGitAccountActions.toggleConfPubKeyConfig())}
                        outlined={!confirmedPubKeyConfigured}
                    ></Button>
                </div>
            </Panel>

        </div >
    </div >
}
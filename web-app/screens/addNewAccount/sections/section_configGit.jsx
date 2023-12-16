import React, { useEffect, useState } from "react"
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
import { Tag } from "primereact/tag";
import { copyToClip, getPublicKey, openExternalLink, showToast } from "../../../src/non-component-sharing";
import { addGitAccountActions } from "../../../store/slices/addGitAccountSlice";
import { ShowPublicKeyDialog, ShowSshConfigureVideoDialog } from "../../../components/commonDialogComp";


export const Section_ConfigGit = () => {
    const dispatch = useDispatch();
    const { name, confirmedPubKeyConfigured } = useSelector(st => st.addGitAccount);

    const [dialogShow, setDialogShow] = useState({
        video: false,
        publicKey: false,
    });
    const [pubKey, setPubKey] = useState('');

    const toggleVideoDialog = () => {
        setDialogShow(st => ({ ...st, video: !st.video }));
    }

    const togglePublicKeyDialog = () => {
        setDialogShow(st => ({ ...st, publicKey: !st.publicKey }));
    }

    const copyPubKeyToClip = () => {
        copyToClip(pubKey).then(() => {
            showToast({ severity: 'info', summary: 'Copy', detail: `Public key copied to clip!`, life: 3000 })
        });
    }

    useEffect(() => {
        getPublicKey(name).then(key => {
            setPubKey(key);
        })
    }, []);

    return <div className='flex flex-column justify-content-center flex-grow-1 fadein animation-fill-forwards animation-duration-500'
        style={{ opacity: 0 }}>
        {dialogShow.video && <ShowSshConfigureVideoDialog onClose={toggleVideoDialog} />}
        {dialogShow.publicKey && <ShowPublicKeyDialog pubKey={pubKey} onClose={togglePublicKeyDialog} onCopy={copyPubKeyToClip} />}
        <Panel
            header="How to configure public key?"
        >
            <div>
                In previous steps we generated a key pair - private key + public key. This Public key we will give to Github, and then using SSH
                if your local machine try to access, it will be allowed as private key is available in your local machine corresponding to same public key you just configured in GitHub. <br /><br />
                <i className="text-primary"><span className="font-semibold">Remember:</span> Your private key is still in your local system, and doesn't need to be give to anyone.</i><br /><br />
                We can configure SSH by following steps -
                <ol style={{ lineHeight: `30px` }}>
                    <li>goto your github account <code className="text-primary">"https://github.com/{name}"</code></li>
                    <li>navigate to <code className="text-primary">"Settings"</code></li>
                    <li>navigate to <code className="text-primary">"SSH and GPG keys"</code></li>
                    <li>click on button <code className="text-primary">"New SSH Key" </code><Tag value="Open" icon="pi pi-external-link" className="cursor-pointer" onClick={() => openExternalLink(`https://github.com/settings/ssh/new`)} /></li>
                    <li>paste the public key in <code className="text-primary">"Key"</code> area
                        <Tag value="Copy Key" icon="pi pi-copy" className="cursor-pointer mr-2" onClick={copyPubKeyToClip} />
                        <Tag value="Show Key" icon="pi pi-book" className="cursor-pointer" onClick={togglePublicKeyDialog} />
                    </li>
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
}
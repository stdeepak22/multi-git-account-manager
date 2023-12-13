import React, { useState } from "react"
import { Panel } from "primereact/panel"
import { InputPrependText } from "../../../components/inputFieldPrependText"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message"
import { Button } from "primereact/button"
import { useDispatch, useSelector } from "react-redux"
import { addGitAccountActions } from "../../../store/slices/addGitAccountSlice"
import { showToast } from "../../../src/non-component-sharing"
import { sshKeysActions } from "../../../store/slices/sshKeySlice"


export const Section_GenKey = () => {
    const dispatch = useDispatch();
    const gitData = useSelector(st => st.addGitAccount)
    const [loading, setLoading] = useState(false);

    const setGitName = (e) => {
        let { value } = e.target
        dispatch(addGitAccountActions.setGitName(value));
    }

    const validateUserName = async () => {
        setLoading(true);
        let gitProfileData, isValid;
        try {
            gitProfileData = await electron.checkGitUserExist(gitData.name);
            isValid = true;
        } catch (error) {
            isValid = false;
        }
        setLoading(false);
        dispatch(addGitAccountActions.setValidityResponse({ isValid, gitProfileData }));
    }

    let msg = gitData.keyAdded
        ? "Key as been added move next to configure your git account."
        : gitData.isValid
            ? 'Is it the right profile? If yes, click to generate and configure key now.'
            : 'this is not a valid github user. Check name again!'

    const addKeys = () => {
        electron.generateSshKeys(gitData.name).then(() => {
            dispatch(addGitAccountActions.markKeyAdded())
            dispatch(sshKeysActions.loadSavedKeys())
            showToast({ severity: 'success', summary: 'Key Generated', detail: `Key as been generated, move next to Configure Git account.`, life: 5000 })
        }).catch(ex => {
            let { message } = ex;
            const idx = message.lastIndexOf("Error: ");
            msg = message.substring(idx + 6);
            showToast({ severity: 'error', summary: 'Error', detail: msg, life: 5000 })
        })
    }

    let disableValidate = !gitData.name || gitData.keyAdded;
    let disableAdd = !gitData.isValid || gitData.keyAdded;

    return <div className='flex justify-content-center flex-grow-1 fadein animation-fill-forwards animation-duration-500'
        style={{ opacity: 0 }}
    >
        <div className='w-9'>
            <Panel header="How it works?" >
                <div>Here, we will use actual github name, example <em>https://github.com/<b>xxxxxx</b></em>. First, We will validate if that
                    user really exist on github. If Yes, we'll create SSH keys pair for you and will configure those keys to be used for the same git account.<br /><br />
                    These keys are <b>not associated with your github yet</b>. Its just public-private key pair that we have generated locally and considered these
                    keys should be used for given Git account.<br /><br />
                    In next step we will use created public key, and will add to your github account to allow git access over SSH. <br /><br />
                    <i className="text-primary"><span className="font-semibold">Remember:</span> Your private key is still in your local system, and doesn't need to be give to anyone.</i>
                </div>
            </Panel>
            <Panel className='my-4' header="Generate key for your Git account">
                <div className="flex flex-column gap-2">
                    <label htmlFor="username">Github User Name</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-github text-primary" />
                        <InputPrependText color="var(--primary-color)">https://github.com/</InputPrependText>
                        <InputText id="username" value={gitData.name} disabled={gitData.keyAdded} onChange={setGitName} className='w-full' style={{ paddingLeft: 178 }} />
                    </span>
                    <Message
                        style={{ opacity: gitData.isValid === undefined ? 0 : 1 }}
                        severity={gitData.keyAdded ? 'success' : gitData.isValid ? 'info' : 'error'}
                        text={msg} />
                    <div className='flex align-items-center justify-content-center'>
                        <Button onClick={validateUserName}
                            severity="secondary"
                            disabled={disableValidate} outlined={disableValidate}
                            iconPos='right' label='Validate'
                            icon={loading ? 'pi pi-spin pi-spinner' : gitData.isValid ? 'pi pi-check text-green-200' : gitData.isValid === false ? 'pi pi-times text-red-200' : ''}
                            className='w-8rem mr-4'
                        ></Button>
                        <Button onClick={addKeys} severity='success'
                            disabled={disableAdd} outlined={disableAdd}
                            iconPos='right' label='Add' icon='pi pi-plus-circle'
                            className='w-8rem'></Button>
                    </div>
                </div>
            </Panel>
            {gitData.gitProfileData ? <Panel header="Profile Details">
                <div className="flex align-items-center justify-content-evenly">
                    {gitData.gitProfileData.avatar_base64 && <img className="w-10rem border-round" src={`data:;base64,${gitData.gitProfileData.avatar_base64}`} />}
                    <div className="flex flex-column">
                        <h2>{gitData.gitProfileData.name}</h2>
                        <h3>{gitData.gitProfileData.company}</h3>
                        <h3>{gitData.gitProfileData.location}</h3>
                    </div>
                </div>
            </Panel>
                : <Message className="w-full mt-4" text="Basic Profile details will be shown here!" severity="info" />}
        </div>
    </div>
}
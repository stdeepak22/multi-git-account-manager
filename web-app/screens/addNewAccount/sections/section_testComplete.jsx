import { Button } from "primereact/button"
import React from "react"
import { useSelector } from "react-redux"
import { verifySSHAccess } from "../../../src/non-component-sharing";

export const Section_TestAndComplete = () => {

    let { name } = useSelector(st => st.addGitAccount);
    const verifyAccess = () => {
        console.log(`will check for `, name);
        verifySSHAccess(name).then(console.log).catch(console.error);
    }
    return <div className='flex justify-content-center align-items-start flex-grow-1 fadein animation-fill-forwards animation-duration-500'
        style={{ opacity: 0 }}>
        <h3> last section</h3>
        <Button label="verify" onClick={verifyAccess}></Button>
    </div>
}
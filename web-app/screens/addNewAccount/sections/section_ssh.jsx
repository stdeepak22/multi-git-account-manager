import { Panel } from "primereact/panel"
import React from "react"

export const Section_SSH = () => {
    return <div className='flex flex-column justify-content-center flex-grow-1 fadein animation-fill-forwards animation-duration-500'
        style={{ opacity: 0 }}>
        <Panel header="testing1">
            Using SSH in Git offers secure communication with encrypted data transfer, utilizing public-key cryptography for
            authentication, enhancing overall system security. It enables password-free access via key-based authentication,
            streamlining the Git workflow. Access control is improved as SSH keys are associated with specific users, facilitating
            granular permissions. SSH supports multiple accounts and eliminates the need for managing HTTPS credentials, particularly
            useful in handling various repositories. Its performance benefits, especially for large repositories, make it an efficient
            choice. The setup of SSH keys enhances user experience by reducing the need for constant credential entry. It provides a
            seamless and secure channel for communication between local and remote Git repositories. SSH is versatile, supporting different
            platforms like GitHub, GitLab, and Bitbucket. The protocol ensures data integrity and confidentiality during the Git operations.
            Overall, SSH is a reliable and widely adopted choice for secure and efficient Git interactions.
        </Panel>
        <br />
        <Panel header="testing2">
            Using SSH in Git offers secure communication with encrypted data transfer, utilizing public-key cryptography for
            authentication, enhancing overall system security. It enables password-free access via key-based authentication,
            streamlining the Git workflow. Access control is improved as SSH keys are associated with specific users, facilitating
            granular permissions. SSH supports multiple accounts and eliminates the need for managing HTTPS credentials, particularly
            useful in handling various repositories. Its performance benefits, especially for large repositories, make it an efficient
            choice. The setup of SSH keys enhances user experience by reducing the need for constant credential entry. It provides a
            seamless and secure channel for communication between local and remote Git repositories. SSH is versatile, supporting different
            platforms like GitHub, GitLab, and Bitbucket. The protocol ensures data integrity and confidentiality during the Git operations.
            Overall, SSH is a reliable and widely adopted choice for secure and efficient Git interactions.
        </Panel>
    </div>
}
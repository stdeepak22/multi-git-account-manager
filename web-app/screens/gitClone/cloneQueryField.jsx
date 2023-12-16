import React from "react"
import { InputLikeDiv, UnderlineChip } from "../../components/otherCommonStyledComp"
import { Button } from "primereact/button";
import { copyToClip, showToast } from "../../src/non-component-sharing";


const TaggedData = ({ data, quoted }) => {
    let dataToShow = data || " ";
    if (quoted && data) {
        dataToShow = `"${dataToShow}"`;
    }
    return <UnderlineChip minLength={data ? '0px' : '75px'}>{dataToShow}</UnderlineChip>
}

const FixedText = ({ children }) => {
    return <span className="text-primary">
        {children}
    </span>
}


export const CloneQueryField = ({ gitUserName, repoName, targetDir }) => {
    let showCopy = Boolean(gitUserName && repoName && targetDir);
    const copyQueryToClip = () => {
        let query = `git clone "https://github.com/${gitUserName}/${repoName}" "${targetDir}"`;
        copyToClip(query).then(() => {
            showToast({ severity: 'info', summary: 'Copy', detail: `git clone query copied to clip!`, life: 3000 })
        });
    }
    return <InputLikeDiv className='flex-1 line-height-3 relative pr-6'>
        <FixedText>git clone https://github.com/</FixedText>
        <TaggedData data={gitUserName} />
        <FixedText>/</FixedText>
        <TaggedData data={repoName} />&nbsp;&nbsp;
        <TaggedData quoted data={targetDir} />
        {showCopy && <Button size="small" outlined icon="pi pi-copy"
            severity="info"
            onClick={copyQueryToClip}
            title="copy"
            className="absolute" style={{ right: 10, top: `50%`, transform: 'translateY(-50%)' }} />}
    </InputLikeDiv>
}
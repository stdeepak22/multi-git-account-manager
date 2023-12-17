import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export const RepoTable = ({ gitUserName }) => {
    let { repoList } = useSelector(st => st.gitRepoMapping);
    let ownRepos = useMemo(() => {
        return repoList.filter(c => c.owner === gitUserName)
    }, [gitUserName])
    return <DataTable value={ownRepos} className="text-primary">
        <Column header="Repo Name" field="repoName" ></Column>
        <Column header="Account" field="owner" ></Column>
        <Column header="Path" field="localPath"></Column>
    </DataTable>
}
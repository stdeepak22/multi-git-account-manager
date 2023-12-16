import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export const RepoTable = () => {
    const items = [{
        field1: '1- Field 1',
        field2: '1- Field 2',
        field3: '1- Field 3',
        field4: '1- Field 4',
    }, {
        field1: '2- Field 1',
        field2: '2- Field 2',
        field3: '2- Field 3',
        field4: '2- Field 4',
    }, {
        field1: '3- Field 1',
        field2: '3- Field 2',
        field3: '3- Field 3',
        field4: '3- Field 4',
    }, {
        field1: '4- Field 1',
        field2: '4- Field 2',
        field3: '4- Field 3',
        field4: '4- Field 4',
    }]
    return <DataTable value={items} className="text-primary">
        <Column header="Git Name" field="field1" ></Column>
        <Column header="Github Profile" field="field2" ></Column>
        <Column header="Added At" field="field3"></Column>
        <Column header='' field="field4"></Column>
    </DataTable>
}
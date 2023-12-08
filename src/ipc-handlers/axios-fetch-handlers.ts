import { ipcMain } from "electron";
import axios from 'axios';


const getImageBase64 = async (imageUrl: string) => {
    let res = await axios.get(imageUrl, {
        responseType: "arraybuffer"
    });
    const base64 = btoa(
        new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
        )
    )
    return base64;
}

ipcMain.handle('check-git-user-exist', async (_, gitUserName) => {
    let res = await axios.get(`https://api.github.com/users/${gitUserName}`);
    let { data } = res;
    if (data.avatar_url) {
        data.avatar_base64 = await getImageBase64(res.data.avatar_url);
    }
    return res.data;
});

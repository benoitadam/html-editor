import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { defaultN, propCleanMap, updateN } from "common/box";
import { BContext } from "./Category";
import req from "common/helpers/req";
import CircularProgress from "@mui/material/CircularProgress";
import session$ from "~src/messagers/session$";
import app from "~src/app";

export default ({ p, show }: { p: string; show?: boolean }) => {
    const b = useContext(BContext);
    const [busyInfo, setBusyInfo] = useState({ busy: false, progress: 0 });
    const n: any = b.n || defaultN;
    const nValue = n[p];
    const propClean = propCleanMap[p] || ((v) => v === '' ? undefined : v);

    const setValue = (value?: any) => {
        updateN(b.id, { [p]: propClean(value) })
    };

    const onFile = async (file?: File) => {
        if (!file) return;
        console.debug('onFile', file);
        setBusyInfo({ busy: true, progress: 0 });
        const response: { id: string } = await req.upload(`${app.apiUrl}/files/`, 'file', file, null, {
            responseType: 'json',
            headers: session$.value.headers,
            onProgress: (e, progress) => {
                console.debug('onFile onProgress', progress);
                setBusyInfo(last => ({ ...last, progress }));
            }
        });
        console.debug('onFile response', response);
        updateN(b.id, { [p]: `${app.appUrl}/files/${response.id}` })
        setBusyInfo({ busy: false, progress: 0 });
    }

    if (show === false) return null;
    if (busyInfo.busy) {
        return busyInfo.progress ? (
            <CircularProgress variant="determinate" value={busyInfo.progress*100} />
        ) : (
            <CircularProgress />
        )
    }
    return (
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={e => onFile((e.target.files||[])[0])} />
            <PhotoCameraIcon />
        </IconButton>
    )
}
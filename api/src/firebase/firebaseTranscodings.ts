import videoConverter from '../converters/videoConverter';
import crypto from 'crypto';
import { initFirebase, DataSnapshot } from './firebase';
import { s3BucketUrl } from '~src/helpers/s3';

export interface VideoData {
    id?: string;
    sourceUrl?: string,
    deviceId?: string,
    itemId?: string,
    // scale?: number,
    // maxScale?: number,
    stat?: string,
    start?: number,
    time?: number,
    progress?: number,
    error?: string,
    // frame?: number,
    // userId?: string,
    // videoId?: string,
    coverUrl?: string,
    // error?: { message: string, stack?: string[] },
    // stack?: string,
    // sourceInfo?: VideoInfo,
    items: any,
    webmUrl?: string,
    mp4Url?: string,
    
    format?: "h264" | "vp8" | "vp9",
    outputUrl?: string,
}

export default async function firebaseTranscodings() {
    console.info('firebaseTranscodings');
    const firebase = await initFirebase();
    const db = firebase.db;

    const transcodeItem = async (itemKey: string, item: VideoData, snap: DataSnapshot) => {
        console.debug('onTranscodings item', itemKey);
        const itemRef = snap.ref.child(itemKey);

        const update = async (changes: Partial<VideoData>) => {
            console.debug('onTranscodings update', itemKey, changes);
            await itemRef.update(changes).catch(error => {
                console.error('onTranscodings update', changes, error);
            });
        }

        try {
            if (item.stat) return;
            const start = Date.now();
            console.debug('onTranscodings item', itemRef.toString(), item);
            await update({ stat: 'start', start, time: Date.now() - start })
            item.id = item.deviceId + '-' + item.itemId;
            // transcodeItem(tmpDir, item, values => itemRef.update({ ...values, time: Date.now() - start }));
            const sourceKey = crypto.randomUUID();
            const sourceUrl = item.sourceUrl || '';
            console.debug('onTranscodings sourceKey', sourceKey);
            console.debug('onTranscodings sourceUrl', sourceUrl);
            const result = await videoConverter(sourceKey, sourceUrl, async progress => {
                await update({ stat: 'progress', progress: progress/100, time: Date.now() - start })
            });
            console.debug('onTranscodings result', result);
            const urlByType = Object.fromEntries((result.items||[]).map(p => [p.t||'', s3BucketUrl + '/' + p.k]));
            console.debug('onTranscodings urlByType', urlByType);
            const webmUrl = urlByType['video/webm'];
            const mp4Url = urlByType['video/mp4'];
            const coverUrl = urlByType['image/jpeg'];
            const format = item.format === 'h264' ? 'h264' : 'vp8';
            const outputUrl = format === 'h264' ? mp4Url : webmUrl;
            await update({
                stat: 'success',
                items: result.items,
                webmUrl,
                mp4Url,
                format,
                outputUrl,
                coverUrl,
                progress: 1
            });
        }
        catch(error) {
            await update({ stat: 'error', error: String(error) })
        }
    };

    const onTranscodings = (snap: DataSnapshot) => {
        console.debug('onTranscodings');
        const data: Record<string, VideoData> = snap.val();
        for (const itemKey in data) {
            const item = data[itemKey];
            transcodeItem(itemKey, item, snap)
            .then(() => {
                console.debug('onTranscodings item success', itemKey);
            })
            .catch((error) => {
                console.debug('onTranscodings item error', itemKey, error);
            })
        }
    }

    db.ref('/transcodings').on('child_added', onTranscodings);
    db.ref('/transcodings').on('child_changed', onTranscodings);
}
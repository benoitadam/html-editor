import { DeviceModel } from "common/models/interfaces";
import { deviceRepo } from "common/models/gqlRepos";
import { MINUTE } from "common/helpers/time";
import session$ from '~src/messagers/session$';
import deviceLike from "~src/components/deviceLike$";
import messager from "common/helpers/messager";

export interface DeviceItem extends DeviceModel {
    lastSeenTime?: number;
    isOnline?: boolean;
    order?: string;
}

export const projectsController = (() => {
    const devices$ = messager<DeviceModel[]>([]);
    const deviceItems$ = messager<DeviceItem[]>([]);

    const refresh = async () => {
      if (!session$.value.isAuth) return;
      const devices = await deviceRepo.all(['id', 'updatedAt', 'name', 'lastSeen', 'fire']);
      devices$.next(devices);
    };
  
    setInterval(refresh, 15000);
  
    devices$.subscribe(devices => {
      const deviceItems = devices.map(d => {
        const lastSeenTime = new Date(d.lastSeen||0).getTime();
        const isOnline = (Date.now() - lastSeenTime) < 5 * MINUTE;
        const order = [
          deviceLike.get(d.id) ? '0' : '1',
          isOnline ? '0' : '1',
          d.name
        ].join(' ');
        return { ...d, lastSeenTime, isOnline, order } as DeviceItem;
      });
      deviceItems.sort((a, b) => a.order!.localeCompare(b.order!));
      deviceItems$.next(deviceItems);
    });

    return {
      devices$,
      deviceItems$,
      refresh,
    }
})();

export default projectsController;
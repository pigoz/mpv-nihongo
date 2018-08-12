const res: any = mp.get_property_native('property-list');
const list: string[] = res;
mp.msg.error(list.map(x => JSON.stringify(x)).join('|'));

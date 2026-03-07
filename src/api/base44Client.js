//import { createClient } from '@base44/sdk';
//import { appParams } from '@/lib/app-params';

//const { appId, token, functionsVersion, appBaseUrl } = appParams;

//Create a client with authentication required
//export const base44 = createClient({
//  appId,
//  token,
//  functionsVersion,
//  serverUrl: '',
//  requiresAuth: false,
//  appBaseUrl
//});

export const base44 = {
  track: () => console.log('Base44 analytics disabled'),
  fetch: () => console.log('Base44 fetch disabled'),
};
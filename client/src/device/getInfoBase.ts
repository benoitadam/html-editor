
import app from '~src/app';
import { DeviceInfoData } from './interfaces';

function getOs() {
  const ua = window.navigator.userAgent;
  if (ua.indexOf('Windows ') != -1) {
    if (ua.indexOf(' 10.0') != -1) return 'Win:10';
    if (ua.indexOf(' 6.3') != -1) return 'Win:8.1';
    if (ua.indexOf(' 6.2') != -1) return 'Win:8';
    if (ua.indexOf(' 6.1') != -1) return 'Win:7';
    if (ua.indexOf(' 6.0') != -1) return 'Win:Vista';
    if (ua.indexOf(' 5.1') != -1) return 'Win:XP';
    if (ua.indexOf(' 5.0') != -1) return 'Win:2000';
  }
  if (ua.indexOf('Mac') != -1) return 'Mac';
  if (ua.indexOf('X11') != -1) return 'UNIX';
  if (ua.indexOf('Linux') != -1) return 'Linux';
  return '';
}

function getWebView() {
  const ua = window.navigator.userAgent;
  if (ua.includes('Firefox/')) return `Firefox:${ua.split('Firefox/')[1]}`;
  else if (ua.includes('Edg/')) return `Edge:${ua.split('Edg/')[1]}`;
  else if (ua.includes('Chrome/')) return `Chrome:${ua.split('Chrome/')[1]}`;
  else if (ua.includes('Safari/')) return `Safari`;
  return '';
}

export default function getInfoBase(): DeviceInfoData {
  return {
    os: getOs(),
    version: app.version,
    type: 'browser',
    width: screen.width,
    height: screen.height,
    orientation: screen.orientation.type,
    webview: getWebView(),
  };
}

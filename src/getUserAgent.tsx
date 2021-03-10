export default function getUserAgent(agent : string)
{
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0){
        if(ua.indexOf('mobile') > 0) {
            return 'sp';
        }    
    } else if (ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0) {
        // iOS12 まで
        return 'tab';
    } else if (ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1){
        if('ontouchend' in document) {
        // iOS13 以降
        return 'tab';
        }
    } else {
        return'pc';

    }
}
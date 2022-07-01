/**
 * @format
 */

import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import { name as appName } from './app.json';

PushNotification.configure({
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});
PushNotification.createChannel(
    {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'Channel', // (required)
    },
    (created) => console.log(`createChannel returned '${created}`),
);

AppRegistry.registerComponent(appName, () => App);
// export notificationManager;

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationManager {
    configure = () => {
        PushNotification.configure({
            onRegister: function (token: any) {
                console.log('TOKEN:', token);
            },
            onNotification: function (notification: any) {
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
    };

    buildAdroidNotification = (id: number, title: string, message: string, data = {}, options = {
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_launcher',
        vibrate: false,
        vibration: 300,
        priority: 'high',
        importance: 'high',
    }) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon,
            smallIcon: options.smallIcon,
            bigText: message || '',
            subText: title || '',
            vibration: options.vibration,
            vibrate: options.vibrate,
            priority: options.priority,
            importance: options.importance,
            data: data,
        };
    };
    buildIOSNotification = (id: number, title: string, message: string, data = {}, options = { alertAction: 'view', category: '' }) => {
        return {
            alertAction: options.alertAction,
            category: options.category,
            userInfo: {
                id: id,
                item: data,
            },
        };
    };
    cancelAllNotification = () => {
        console.log('cancel');
        PushNotification.cancelAllLocalNotifications();
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        }
    };

    showNotification = (id: number, title: string, message: string, data = {}, options = {
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_launcher',
        vibrate: false,
        vibration: 300,
        priority: 'high',
        importance: 'high',
    }, date: Date) => {
        PushNotification.localNotificationSchedule({
            //Android
            ...this.buildAdroidNotification(id, title, message, data, options),
            date: new Date(),
            message: ''
        } as any);
    };
    unregister = () => {
        PushNotification.unregister();
    };
}
export const notificationManager = new NotificationManager();

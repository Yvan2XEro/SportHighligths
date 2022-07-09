import moment from "moment";
import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const numConverter = (n: number, d: number = 2) => {
    if (!n) return 0;
    let x = ('' + n).length;
    d = Math.pow(10, d)
    x -= x % 3
    return Math.round(n * d / Math.pow(10, x)) / d + " kMGTPE"[x / 3]
}

export const formatDate = (date: Date) => {
    const diff = moment().diff(date, 'days');
    if (diff < 1) {
        return moment(date).fromNow();
    }
    return moment(date).format('MMM DD, YYYY');
}

export function textSice(text: string, size = 20): string {
    if (text.length <= size)
        return text;
    return text.substring(0, size) + '...';
}

export function uniqueid(length = 16): string {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            // exclude all chars between : (58) and @ (64)
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length < length);

    return (idstr);
}


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
}

// export function notify() {
//     PushNotification.configure({
//         channelId: "your-channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
//         ticker: "My Notification Ticker", // (optional)
//         showWhen: true, // (optional) default: true
//         autoCancel: true, // (optional) default: true
//         largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
//         largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
//         smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
//         bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
//         subText: "This is a subText", // (optional) default: none
//         bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
//         bigLargeIcon: "ic_launcher", // (optional) default: undefined
//         bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
//         color: "red", // (optional) default: system default
//         vibrate: true, // (optional) default: true
//         vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//         tag: "some_tag", // (optional) add tag to message
//         group: "group", // (optional) add group to message
//         groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
//         ongoing: false, // (optional) set whether this is an "ongoing" notification
//         priority: "high", // (optional) set notification priority, default: high
//         visibility: "private", // (optional) set notification visibility, default: private
//         ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
//         shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
//         onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

//         when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
//         usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
//         timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

//         messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 

//         actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
//         invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

//         /* iOS only properties */
//         category: "", // (optional) default: empty string
//         subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

//         /* iOS and Android properties */
//         id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
//         title: "My Notification Title", // (optional)
//         message: "My Notification Message", // (required)
//         picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
//         userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
//         playSound: false, // (optional) default: true
//         soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//         number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
//         repeatType: "day",
//     })
// }

export const localStorage = {
    get(key: string) {
        return AsyncStorage.getItem(key);
    },
    set(key: string, value: string) {
        return AsyncStorage.setItem(key, value);
    },
    remove(key: string) {
        return AsyncStorage.removeItem(key);
    },
    clear() {
        return AsyncStorage.clear()
    }
}


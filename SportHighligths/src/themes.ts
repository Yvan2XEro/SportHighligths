import { extendTheme, theme } from "native-base";
import { DefaultTheme } from "react-native-paper";

export const tabsTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#fff',
    },
};


export const paperTheme = extendTheme({
    ...theme,
    colors: {
        ...theme.colors,
        // Add new color
        primary: {
            50: '#8eb7fa',
            100: '#6ca1f8',
            200: '#4a8bf6',
            300: '#2875f5',
            400: '#0a60ef',
            500: '#0952cd',
            600: '#0745aa',
            700: '#063788',
            800: '#042966',
            900: '#031b44',
        },
    }
});


// violet claire: #C84C95
// bleu #515CED
// rouge #F20079
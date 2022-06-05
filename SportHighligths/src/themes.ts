import { extendTheme, theme } from "native-base";
import { DefaultTheme } from "react-native-paper";

export const tabsTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'blue',
    },
};


export const paperTheme = extendTheme({
    ...theme,
    colors: {
        ...theme.colors,
        // Add new color
        primary: {
            50: '#FEE0EF',
            100: '#FCC0DE',
            200: '#FBA0CD',
            300: '#F980BC',
            400: '#F6409B',
            500: 'blue',
            600: 'blue',
            700: '#DA0C91',
            800: '#D11098',
            900: '#A028C7',
        },
    }
});


// violet claire: #C84C95
// bleu #515CED
// rouge #F20079
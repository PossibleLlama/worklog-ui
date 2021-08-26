import { IGardenTheme, DEFAULT_THEME } from "@zendeskgarden/react-theming";

export const worklogTheme: IGardenTheme = {
    ...DEFAULT_THEME,
    colors: {
        "base": "light",
        "background": "#f8f9f9",
        "foreground": "#515151",

        "primaryHue": "#36234A",
        "dangerHue":  "#9C1444",
        "warningHue": "#CACC6E",
        "successHue": "#117952",
        "neutralHue": "grey",
        "chromeHue":  "#CACC6E"
    },
};

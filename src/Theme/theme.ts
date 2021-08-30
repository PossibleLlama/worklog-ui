import { IGardenTheme, DEFAULT_THEME } from "@zendeskgarden/react-theming";

interface Colour {
    Dark: string;
    Default: string;
    Light: string;
}

interface GardenColourPalette {
    base: string;
    background: string;
    foreground: string;
    primaryHue: string;
    dangerHue: string;
    warningHue: string;
    successHue: string;
    neutralHue: string;
    chromeHue: string;
}

const rawColours: {
    [key: string]: Colour;
} = {
    Primary: {
        Dark: "#2C74CA",
        Default: "#6CA3E5",
        Light: "#B4D6FF",
    },
    Success: {
        Dark: "#0CA109",
        Default: "#48E145",
        Light: "#89FC86",
    },
    Error: {
        Dark: "#A10909",
        Default: "#E72727",
        Light: "#FF8989",
    },
    Charcoal: {
        Dark: "#141414",
        Default: "#3A383C",
        Light: "#807E82",
    },
    Ash: {
        Dark: "#BCBABD",
        Default: "#DDDCDD",
        Light: "#EDEDED",
    },
};

const theme: {
    Light: GardenColourPalette,
    Dark: GardenColourPalette,
} = {
    Light: {
        base: "light",
        background: rawColours.Ash.Light,
        foreground: rawColours.Ash.Default,
        primaryHue: rawColours.Primary.Default,
        neutralHue: rawColours.Primary.Light,
        dangerHue: rawColours.Error.Default,
        warningHue: rawColours.Error.Light,
        successHue: rawColours.Success.Default,
        chromeHue: rawColours.Ash.Light,
    },
    Dark: {
        base: "dark",
        background: rawColours.Charcoal.Default,
        foreground: rawColours.Charcoal.Light,
        primaryHue: rawColours.Primary.Light,
        neutralHue: rawColours.Primary.Default,
        dangerHue: rawColours.Error.Default,
        warningHue: rawColours.Error.Light,
        successHue: rawColours.Success.Default,
        chromeHue: rawColours.Ash.Light,
    },
};

export const worklogTheme = (choice: "Light" | "Dark"): IGardenTheme => {
    return {
        ...DEFAULT_THEME,
        ...theme[choice],
    };
};

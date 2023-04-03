import { Work } from "@model/work";
import { WordData } from "@view/Wordcloud/Wordcloud.view";

export const wordDataFrequencyOfTags = (wls: Work[], capacity?: number): WordData[] => {
    if (typeof capacity === "undefined") {
        capacity = 20;
    }

    return wls.filter((e: Work) =>
        e.Tags !== undefined
    ).map((e: Work) =>
        // We've just done a filter to remove undefined values
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        e.Tags!
    ).flat().reduce((previous: WordData[], current: string) => (
        (previous[previous.findIndex(d => d.text === current)] || previous[previous.push({ text: current, value: 0 }) - 1]).value++, previous),
    []).sort((a, b) => b.value - a.value).slice(0, capacity);
};

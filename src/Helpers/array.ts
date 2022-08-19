import { Work } from "@model/work";
import { WordData } from "@view/Wordcloud/Wordcloud.view";

export const wordDataFrequencyOfTags = (wls: Work[]): WordData[] => {
    return (wls.map((e) => {
        if (e.Tags === undefined) {
            return [];
        }
        return e.Tags;
    }).flat()).reduce((previous: WordData[], current: string) => (
        (previous[previous.findIndex(d => d.text === current)] || previous[previous.push({ text: current, value: 0 })-1]).value++, previous), []);
};

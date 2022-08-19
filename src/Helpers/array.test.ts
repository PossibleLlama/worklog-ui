import { Work } from "@model/work";
import { wordDataFrequencyOfTags } from "./array";

describe("Word Data Array", () => {
    const wk1: Work = {
        ID: "abc",
        Revision: 1,
        Title: "bcd",
        Tags: ["1234"].sort(),
        When: new Date(),
        CreatedAt: new Date(),
    };
    const wk2: Work = {
        ID: "lmn",
        Revision: 1,
        Title: "mno",
        Tags: ["0987"].sort(),
        When: new Date(),
        CreatedAt: new Date(),
    };
    const wk3: Work = {
        ID: "qrs",
        Revision: 1,
        Title: "rst",
        Tags: ["12345"].sort(),
        When: new Date(),
        CreatedAt: new Date(),
    };

    it("Empty in", () => {
        expect(wordDataFrequencyOfTags([])).toEqual([]);
    });

    it("Single text in", () => {
        expect(wordDataFrequencyOfTags([wk1])).toEqual([{text: "1234", value: 1 }]);
        expect(wordDataFrequencyOfTags([wk1, wk1])).toEqual([{text: "1234", value: 2 }]);
        expect(wordDataFrequencyOfTags([wk1, wk1, wk1, wk1])).toEqual([{text: "1234", value: 4 }]);
    });

    it("Multiple in", () => {
        expect(wordDataFrequencyOfTags([wk1, wk2])).toEqual([{text: "1234", value: 1 }, {text: "0987", value: 1}]);
        expect(wordDataFrequencyOfTags([wk1, wk1, wk2])).toEqual([{text: "1234", value: 2 }, {text: "0987", value: 1}]);
        expect(wordDataFrequencyOfTags([wk1, wk2, wk2])).toEqual([{text: "1234", value: 1 }, {text: "0987", value: 2}]);

        expect(wordDataFrequencyOfTags([wk1, wk2])).toEqual([{text: "1234", value: 1 }, {text: "0987", value: 1}]);
        expect(wordDataFrequencyOfTags([wk1, wk1, wk2])).toEqual([{text: "1234", value: 2 }, {text: "0987", value: 1}]);
        expect(wordDataFrequencyOfTags([wk1, wk2, wk2])).toEqual([{text: "1234", value: 1 }, {text: "0987", value: 2}]);

        expect(wordDataFrequencyOfTags([wk1, wk3])).toEqual([{text: "1234", value: 1 }, {text: "12345", value: 1}]);
    });
});

import { Work, isEqual, generateCreateCommand } from "./work";

import { formatMinutes } from "@helper/date";

describe("Is equal", () => {
    const comparison: Work = {
        ID: "abc",
        Revision: 2,
        Title: "the title",
        Description: "a description of work",
        Author: "person c",
        Duration: 987,
        Tags: ["the comparison", "another"],
        When: new Date(2021, 1, 1, 8, 35),
        CreatedAt: new Date(2021, 1, 1, 8, 35),
    };

    it("Same work", () => {
        expect(isEqual(comparison, comparison)).toEqual(true);
    });

    it("Different ID", () => {
        expect(isEqual({
            ID: "123",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different Revision", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 1,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different Title", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "a title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different Description", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a different",
            Author: "person c",
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Undefined Description", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: undefined,
            Author: "person c",
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different Author", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "user",
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Undefined Author", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: undefined,
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different Duration", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 1,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });
    
    it("Undefined Duration", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: undefined,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different number of Tags", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: ["different"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different Tags", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: ["first", "second"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different order of Tags", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: ["another", "the comparison"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(true);
    });

    it("Undefined Tags", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: undefined,
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Both undefined Tags", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: undefined,
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, {
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: undefined,
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        })).toEqual(true);
    });

    it("Different When", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 36),
            CreatedAt: new Date(2021, 1, 1, 8, 35),
        }, comparison)).toEqual(false);
    });

    it("Different CreatedAt", () => {
        expect(isEqual({
            ID: "abc",
            Revision: 2,
            Title: "the title",
            Description: "a description of work",
            Author: "person c",
            Duration: 987,
            Tags: ["the comparison", "another"],
            When: new Date(2021, 1, 1, 8, 35),
            CreatedAt: new Date(2021, 1, 1, 8, 36),
        }, comparison)).toEqual(false);
    });
});

describe("Generate create command", () => {
    const baseWork: Work = {
        Title: "abc",
        ID: "",
        Revision: -1,
        When: new Date(0),
        CreatedAt: new Date(0),
    };

    const fakeNow = new Date("2019-10-23T19:38:28Z");

    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(fakeNow);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("Has title and zero when", () => {
        expect(generateCreateCommand(baseWork))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has empty title", () => {
        expect(generateCreateCommand({...baseWork ,...{ Title: "" }}))
            .toEqual("worklog create --title \"\"");
    });

    it("Has non zero when", () => {
        expect(generateCreateCommand({...baseWork ,...{ When: new Date() }}))
            .toEqual("worklog create --title \"abc\" --when \"" + formatMinutes(new Date()).replace("T", " ") + "\"");
    });

    it("Has zero when", () => {
        expect(generateCreateCommand({...baseWork ,...{ When: new Date(0) }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has description", () => {
        expect(generateCreateCommand({...baseWork ,...{ Description: "foo" }}))
            .toEqual("worklog create --title \"abc\" --description \"foo\"");
    });

    it("Has empty description", () => {
        expect(generateCreateCommand({...baseWork ,...{ Description: "" }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has undefined description", () => {
        expect(generateCreateCommand({...baseWork ,...{ Description: undefined }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has author", () => {
        expect(generateCreateCommand({...baseWork ,...{ Author: "Alice" }}))
            .toEqual("worklog create --title \"abc\" --author \"Alice\"");
    });

    it("Has empty author", () => {
        expect(generateCreateCommand({...baseWork ,...{ Author: "" }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has undefined author", () => {
        expect(generateCreateCommand({...baseWork ,...{ Author: undefined }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has positive duration", () => {
        expect(generateCreateCommand({...baseWork ,...{ Duration: 1 }}))
            .toEqual("worklog create --title \"abc\" --duration 1");
    });

    it("Has negative duration", () => {
        expect(generateCreateCommand({...baseWork ,...{ Duration: -1 }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has zero duration", () => {
        expect(generateCreateCommand({...baseWork ,...{ Duration: 0 }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has single tag", () => {
        expect(generateCreateCommand({...baseWork ,...{ Tags: ["a"] }}))
            .toEqual("worklog create --title \"abc\" --tags \"a\"");
    });

    it("Has multiple tags", () => {
        expect(generateCreateCommand({...baseWork ,...{ Tags: ["a", "b", "c"] }}))
            .toEqual("worklog create --title \"abc\" --tags \"a, b, c\"");
    });

    it("Has empty tag", () => {
        expect(generateCreateCommand({...baseWork ,...{ Tags: [] }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has undefined tag", () => {
        expect(generateCreateCommand({...baseWork ,...{ Tags: undefined }}))
            .toEqual("worklog create --title \"abc\"");
    });

    it("Has all elements", () => {
        const fullWork: Work = {
            Title: "BANG",
            ID: "",
            Revision: -1,
            Description: "I am a description",
            Author: "Bob",
            Duration: 1,
            Tags: ["a", "b", "c"],
            When: new Date(),
            CreatedAt: new Date(0),
        };
        expect(generateCreateCommand(fullWork))
            .toEqual("worklog create --title \"BANG\" --when \"" + formatMinutes(new Date()).replace("T", " ") + "\" --description \"I am a description\" --author \"Bob\" --duration 1 --tags \"a, b, c\"");
    });
});

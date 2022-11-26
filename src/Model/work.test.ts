import { Work, isEqual } from "./work";

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

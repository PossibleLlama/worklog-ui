import { Work } from "@model/work";

const emails: Work = {
    ID: "abcd",
    Revision: 1,
    Title: "Emails",
    Description: "Started my day by checking my emails and other messages.",
    Author: "Alex",
    Duration: 10,
    Tags: ["morning"],
    When: new Date(2021, 1, 1, 8, 35),
    CreatedAt: new Date(2021, 1, 1, 8, 35),
};

const standup: Work = {
    ID: "abce",
    Revision: 2,
    Title: "Standup",
    Description: "Discussed tickets AB-123 and AB-456.",
    Author: "Alex",
    Duration: 15,
    Tags: ["team a", "standup", "meetings", "agile", "AB-123", "AB-456"].sort(),
    When: new Date(2021, 1, 1, 9, 45),
    CreatedAt: new Date(2021, 1, 1, 9, 43),
};

const partA: Work = {
    ID: "abcf",
    Revision: 1,
    Title: "AB-456 - Part A",
    Description: "Making progress on ticket by completing part a. Will need to get this reviewed and work on part b.",
    Author: "Alex",
    Duration: 60,
    Tags: ["team a", "AB-456", "review"].sort(),
    When: new Date(2021, 1, 1, 10, 3),
    CreatedAt: new Date(2021, 1, 1, 10, 3),
};

const feedback: Work = {
    ID: "abc1",
    Revision: 1,
    Title: "AB-456 - Feedback",
    Description: "Had feedback on the PR from Jean. Looking through comments and making the changes.",
    Author: "Alex",
    Duration: 30,
    Tags: ["team a", "AB-456", "review", "feedback"].sort(),
    When: new Date(2021, 1, 1, 10, 55),
    CreatedAt: new Date(2021, 1, 1, 10, 55),
};

const meeting: Work = {
    ID: "abc2",
    Revision: 2,
    Title: "Steering meeting",
    Description: "Meeting related to topic b. Decided x is the best strategy.",
    Author: "Alex",
    Duration: 60,
    Tags: ["meetings", "topic b"].sort(),
    When: new Date(2021, 1, 1, 12, 0),
    CreatedAt: new Date(2021, 1, 1, 12, 4),
};

const partB: Work = {
    ID: "abc3",
    Revision: 1,
    Title: "AB-456 - Part B",
    Description: "Part A is merged and working as expected, now starting on Part B.",
    Author: "Alex",
    Duration: 75,
    Tags: ["team a", "AB-456"].sort(),
    When: new Date(2021, 1, 1, 14, 41),
    CreatedAt: new Date(2021, 1, 1, 14, 41),
};

const social: Work = {
    ID: "abc4",
    Revision: 1,
    Title: "Team social",
    Author: "Alex",
    Duration: 30,
    Tags: ["team a", "social"].sort(),
    When: new Date(2021, 1, 1, 15, 30),
    CreatedAt: new Date(2021, 1, 1, 15, 31),
};

const review: Work = {
    ID: "abc5",
    Revision: 2,
    Title: "CD-987",
    Description: "Ray from team b asked for a review of CD-987.",
    Author: "Alex",
    Duration: 20,
    Tags: ["team b", "CD-987", "review"].sort(),
    When: new Date(2021, 1, 1, 16, 8),
    CreatedAt: new Date(2021, 1, 1, 16, 8),
};

export const exampleDay1: Work[] = [
    emails, standup, partA, feedback, meeting, partB, social, review,
];

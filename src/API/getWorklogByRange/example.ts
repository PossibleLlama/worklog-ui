import { Work } from "@model/work";

import { subDays } from "@helper/date";

const t = new Date();

const emailsD1: Work = {
    ID: "abcd",
    Revision: 1,
    Title: "Emails",
    Description: "Started my day by checking my emails and other messages.",
    Author: "Alex",
    Duration: 10,
    Tags: ["morning"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 8, 35), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 8, 35), 2),
};

const standupD1: Work = {
    ID: "abce",
    Revision: 2,
    Title: "Standup",
    Description: "Discussed tickets AB-123 and AB-456.",
    Author: "Alex",
    Duration: 15,
    Tags: ["team a", "standup", "meetings", "agile", "AB-123", "AB-456"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 45), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 43), 2),
};

const partA: Work = {
    ID: "abcf",
    Revision: 1,
    Title: "AB-456 - Part A",
    Description: "Making progress on ticket by completing part a. Will need to get this reviewed and work on part b.",
    Author: "Alex",
    Duration: 60,
    Tags: ["team a", "AB-456", "review"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 10, 3), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 10, 3), 2),
};

const feedback: Work = {
    ID: "abc1",
    Revision: 1,
    Title: "AB-456 - Feedback",
    Description: "Had feedback on the PR from Jean. Looking through comments and making the changes.",
    Author: "Alex",
    Duration: 30,
    Tags: ["team a", "AB-456", "review", "feedback"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 10, 55), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 10, 55), 2),
};

const meeting: Work = {
    ID: "abc2",
    Revision: 2,
    Title: "Steering meeting",
    Description: "Meeting related to topic b. Decided x is the best strategy.",
    Author: "Alex",
    Duration: 60,
    Tags: ["meetings", "topic b"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 12, 0), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 12, 4), 2),
};

const customerMeeting: Work = {
    ID: "abc2b",
    Revision: 2,
    Title: "Customer meeting",
    Description: "Customer meeting related to topic b. It has been a few weeks since we last had a catchup with the customer, so it was great to have this chance to realign and check on progress." +
        " Given an update on how we should be approaching the work for this subject. The team feels like the strategy that we have outlined will fulfil the brief, and all of the buzzwords that the customer has asked for." +
        " We will continue to work towards this goal, with the aim to be finished in the next month. The customer has agreed that this timeframe works well for them, so they can finalise the dependencies on their side before it completes.",
    Author: "Alex",
    Duration: 60,
    Tags: ["meetings", "topic b", "customer", "review", "team-a", "feedback"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 13, 30), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 13, 46), 2),
};

const partB: Work = {
    ID: "abc3",
    Revision: 1,
    Title: "AB-456 - Part B",
    Description: "Part A is merged and working as expected, now starting on Part B.",
    Author: "Alex",
    Duration: 75,
    Tags: ["team a", "AB-456"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 14, 41), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 14, 41), 2),
};

const social: Work = {
    ID: "abc4",
    Revision: 1,
    Title: "Team social",
    Author: "Alex",
    Duration: 30,
    Tags: ["team a", "social"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 15, 30), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 15, 31), 2),
};

const review: Work = {
    ID: "abc5",
    Revision: 2,
    Title: "CD-987",
    Description: "Ray from team b asked for a review of CD-987.",
    Author: "Alex",
    Duration: 20,
    Tags: ["team b", "CD-987", "review"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 16, 8), 2),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 16, 8), 2),
};

export const exampleDay1: Work[] = [
    emailsD1, standupD1, partA, feedback, meeting, customerMeeting, partB, social, review,
];

const emailsD2: Work = {
    ID: "bcda",
    Revision: 1,
    Title: "Emails",
    Description: "Checking emails and slack messages.",
    Author: "Alex",
    Duration: 10,
    Tags: ["morning"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 8, 31), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 8, 31), 1),
};

const finishD2: Work = {
    ID: "bcdb",
    Revision: 1,
    Title: "AB-456 - Part B - Finishing off ",
    Description: "Finishing off AB-456 part B by doing this bit of work. I did a lot of work here, it encompased a lot of things including a, b, c and d. It took longer than expected because of this feature.",
    Author: "Alex",
    Duration: 60,
    Tags: ["team a", "AB-456"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 28), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 28), 1),
};

const standupD2: Work = {
    ID: "bcdc",
    Revision: 1,
    Title: "Standup",
    Description: "Discussed tickets AB-456 and CD-987.",
    Author: "Alex",
    Duration: 15,
    Tags: ["team a", "standup", "meetings", "agile", "AB-456", "CD-987"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 45), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 45), 1),
};

const startD2: Work = {
    ID: "bcde",
    Revision: 1,
    Title: "AB-457 - Started",
    Description: "Investigating the new tool for it's suitability in the project. Read some documentation and tried it out successfully.",
    Author: "Alex",
    Duration: 120,
    Tags: ["team a", "AB-457"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 11, 55), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 11, 55), 1),
};

const reviewMeetingD2: Work = {
    ID: "bcdf",
    Revision: 3,
    Title: "Revewing team progress",
    Author: "Alex",
    Duration: 60,
    Tags: ["team a", "meetings"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 13, 0), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 13, 7), 1),
};

const supportD2: Work = {
    ID: "bcea",
    Revision: 1,
    Title: "Laptop issues",
    Description: "After lunch, the laptop won't connect to the VPN. Contacted the support team to see if there are any known issues, or what to do about the problem.",
    Author: "Alex",
    Duration: 10,
    Tags: ["support"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 14, 12), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 14, 12), 1),
};

const fixedD2: Work = {
    ID: "bceb",
    Revision: 2,
    Title: "Laptop issues - Fixed",
    Description: "Support team came back with it being routing maintanence. Problem solved.",
    Author: "Alex",
    Duration: 20,
    Tags: ["support"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 14, 38), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 14, 50), 1),
};

const documentationP1D2: Work = {
    ID: "bcec",
    Revision: 1,
    Title: "AB-457 - Documentation",
    Description: "Writting up what have been discovered around this ticket. Documenting what's gone well, what needs to be ironed out etc.",
    Author: "Alex",
    Duration: 60,
    Tags: ["documentation", "AB-457", "team-a"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 15, 47), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 15, 47), 1),
};

const documentationP2D2: Work = {
    ID: "bced",
    Revision: 1,
    Title: "AB-457 - Documentation",
    Description: "Finished off writing up what was discovered.",
    Author: "Alex",
    Duration: 30,
    Tags: ["team a", "AB-457", "documentation"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 16, 28), 1),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 16, 28), 1),
};

export const exampleDay2: Work[] = [
    emailsD2, finishD2, standupD2, startD2, reviewMeetingD2, supportD2, fixedD2, documentationP1D2, documentationP2D2
];

const reading: Work = {
    ID: "ff1",
    Revision: 1,
    Title: "Reading",
    Description: "Looking through what work I have done recently.",
    Author: "Alex",
    Duration: 15,
    Tags: ["meta"].sort(),
    When: t,
    CreatedAt: t,
};

export const exampleDayToday: Work[] = [
    reading,
];

const startD3: Work = {
    ID: "caaa",
    Revision: 1,
    Title: "Emails",
    Author: "Alex",
    Duration: 5,
    Tags: ["meta"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 28), 32),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 28), 32),
};

const interviewPrep: Work = {
    ID: "caab",
    Revision: 2,
    Title: "Interview - Preperation",
    Description: "Checking the CV for the person that we are interviewing today for the new position.",
    Author: "Alex",
    Duration: 20,
    Tags: ["preperation, interview"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 9, 57), 32),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 10, 2), 32),
};

const interview: Work = {
    ID: "caac",
    Revision: 1,
    Title: "Interview",
    Description: "Interview with the person that we would like to hire for the position."+
        " A lot of good knowledge around the company, and the areas that we will require."+
        " Believe that they will be a great personality fit for the company.",
    Author: "Alex",
    Duration: 60,
    Tags: ["meetings, interview"].sort(),
    When: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 11, 0), 32),
    CreatedAt: subDays(new Date(t.getFullYear(), t.getMonth(), t.getDay(), 11, 12), 32),
};

export const exampleDayLastMonth: Work[] = [
    startD3, interviewPrep, interview
];

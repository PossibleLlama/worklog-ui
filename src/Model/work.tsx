export interface Work {
    ID: string;
    Revision: number;
    Title: string;
    Description?: string;
    Author?: string;
    Duration?: number;
    Tags?: string[];
    When: Date;
    CreatedAt: Date;
}

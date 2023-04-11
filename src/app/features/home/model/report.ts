import { ReportSection } from "./report-section";

export interface Report {
    id?: number;
    name?: string;
    status?: string;
    startTime?: number;
    endTime?: number;
    sections?: ReportSection[];
}
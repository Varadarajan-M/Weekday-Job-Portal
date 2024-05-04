export type PaginationArgs = {
	limit: number;
	offset: number;
};

export interface JobDetails {
	companyName: string;
	jobRole: string;
	location: string;
	maxExp: number | null;
	minExp: number | null;
	maxJdSalary: number | null;
	minJdSalary: number | null;
	salaryCurrencyCode: string;
	jobDetailsFromCompany: string;
	jdLink: string;
	jdUid: string;
	logoUrl: string;
}

export interface JobFetchAPIResponse {
	jdList: JobDetails[];
	totalCount: number;
}

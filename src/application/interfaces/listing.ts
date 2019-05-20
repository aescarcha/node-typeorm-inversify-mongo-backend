import { ISeo } from './seo';

export interface IListingParams {
    offset: number;
    limit: number;
    sort?: ISort;
}

export interface ISort {
    field: string;
    direction: 'asc' | 'desc';
}
export interface IListingResponse {
    data: IListingData;
    seo: IListingSeo;
}

export interface IListingSeo extends ISeo {
    tags: any[];
    unanswered: any[];
}

export interface IResponse {
    seo: ISeo;
}
export interface IListingData {
    data: any[];
    total: number;
}

export interface IListingRepository {
    listingQuery(params: IListingParams): Promise<IListingData>;
}

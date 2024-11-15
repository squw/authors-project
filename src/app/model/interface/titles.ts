export interface TitleResponseModel {
    Message: string;
    Result: boolean;
    Data: BookTitle[];
}

export interface BookTitle {
    title_id: string;
    title: string;
    type: string;
    pub_id: string;
    price: number;
    advance: number;
    royalty: number;
    ytd_sales: number;
    notes: string;
    pubdate: string;
}
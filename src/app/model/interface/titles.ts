export interface TitleResponseModel {
    Message: string;
    Result: boolean;
    Data: BookTitle[];
}

export interface TitleResponseModelSingular {
    Message: string;
    Result: boolean;
    Data: BookTitleDetailed;
}

export interface TitleAuthorResponseModel {
    Message: string;
    Result: Boolean;
    Data: TitleAuthor[];
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

export interface BookTitleDetailed {
    title_id: string;
    title: string;
    type: string;
    pub_id: string;
    pub_name: string;
    price: number;
    advance: number;
    royalty: number;
    ytd_sales: number; // year-to-date sales
    notes: string | null;
    pubdate: string | Date;
    sales_count: number;
}

export interface TitleAuthor {
    au_id: string;
    au_fname: string;
    au_lname: string;
    au_ord: number;
    royaltyper: number;
}


export interface TitleResponseModelBool {
    Message: string;
    Result: boolean;
    Exists: boolean;
}
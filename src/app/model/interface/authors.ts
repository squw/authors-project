export interface AuthorResponseModel {
    Message: string;
    Result: boolean;
    Data: Author[];
}

export interface AuthorResponseModelSingular {
    Message: string;
    Result: boolean;
    Data: Author;
}


export interface Author {
    au_id: string;
    au_lname: string;
    au_fname: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    contract: boolean;
}

export interface AuthorResponseModelBool {
    Message: string;
    Result: boolean;
    Exists: boolean;
}
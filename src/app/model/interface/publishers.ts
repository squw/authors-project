export interface PublisherResponseModel {
    Message: string;
    Result: boolean;
    Data: Publisher[];
}

export interface Publisher {
    pub_id: string;
    pub_name: string;
}
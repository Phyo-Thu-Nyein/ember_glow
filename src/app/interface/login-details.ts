export interface LoginUser {
    status?:      string;
    data?:        Data;
    accessToken?: string;
}

export interface Data {
    _id?:       string;
    name?:      string;
    email?:     string;
    password?:  string;
    address?:   string;
    phone?:     number;
    role?:      number;
    createdAt?: Date;
    updatedAt?: Date;
    __v?:       number;
}

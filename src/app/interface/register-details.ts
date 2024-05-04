export interface RegisterUser {
    status?:  string;
    message?: string;
    data?:    Data;
}

export interface Data {
    name?:      string;
    email?:     string;
    password?:  string;
    address?:   string;
    phone?:     number;
    role?:      number;
    _id?:       string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?:       number;
}

export interface AllUsers {
    status?:  string;
    message?: string;
    data?:    AllUsersData[];
}

export interface AllUsersData {
    _id?:       string;
    name?:      string;
    email?:     string;
    password?:  string;
    phone?:     number;
    role?:      number;
    createdAt?: Date;
    updatedAt?: Date;
    __v?:       number;
    address?:   string;
}

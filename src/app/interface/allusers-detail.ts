export interface AllUsersDetails {
    status?:  string;
    message?: string;
    data?: AllUserDatum[];
    totalUsers?: number;
    totalPages?: number;
    currentPage?: number;
}

export interface AllUserDatum {
    _id?:            string;
    profilePicture?: null | string;
    name?:           string;
    email?:          string;
    password?:       string;
    phone?:          number;
    role?:           number;
    createdAt?:      Date;
    updatedAt?:      Date;
    __v?:            number;
    address?:        string;
}

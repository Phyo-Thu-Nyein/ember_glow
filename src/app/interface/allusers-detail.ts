export interface AllUsersDetails {
    status?:  string;
    message?: string;
    data?: AllUserDatum[];
    totalUsers?: number;
    totalPages?: number;
    currentPage?: number;
}

export interface AllUserDatum {
    id?:            string;
    profilePicture?: null | string;
    name?:           string;
    email?:          string;
    phone?:          number;
    address?:        string;
    role?:           number;
    createdAt?:      Date;
    updatedAt?:      Date;
    __v?:            number;
}

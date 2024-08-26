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


// Update role response
export interface UpdateRoleDetails {
    status?: string;
    message?: string;
    data?: UpdateData;
}
export interface UpdateData {
    id?: string;
    name?: string;
    email?: string;
    role?: number;
}
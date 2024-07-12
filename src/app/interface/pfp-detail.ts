export interface PfpUpload {
    success?: boolean;
    message?: string;
    data?:    PfpData;
}

export interface PfpData {
    profilePicture?: string;
    _id?:            string;
    name?:           string;
    email?:          string;
    password?:       string;
    address?:        string;
    phone?:          number;
    role?:           number;
    createdAt?:      Date;
    updatedAt?:      Date;
    __v?:            number;
}

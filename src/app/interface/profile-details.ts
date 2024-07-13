export interface ProfileDetails {
    status?:  string;
    message?: string;
    data?:    Data;
}

export interface Data {
    _id?:            string;
    profilePicture?: null;
    name?:           string;
    email?:          string;
    password?:       string;
    phone?:          number;
    role?:           number;
    createdAt?:      Date;
    updatedAt?:      Date;
    __v?:            number;
}

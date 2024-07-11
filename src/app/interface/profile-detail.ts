export interface MyProfileDetail {
    status?: string;
    id?:     string;
    data?:   ProfileData;
}

export interface ProfileData {
    _id?:       string;
    name?:      string;
    email?:     string;
    password?:  string;
    phone?:     number;
    role?:      number;
    createdAt?: Date;
    updatedAt?: Date;
    __v?:       number;
}

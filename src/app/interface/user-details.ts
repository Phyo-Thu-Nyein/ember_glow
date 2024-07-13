export interface UserDetails {
  status?:      string;
  message?:     string;
  data?:        UserData;
  accessToken?: string; //only for login
}

export interface UserData {
  _id?:            string;
  profilePicture?: null;
  name?:           string;
  email?:          string;
  password?:       string;
  phone?:          number;
  address?:        string;
  role?:           number;
  createdAt?:      Date;
  updatedAt?:      Date;
  __v?:            number;
}

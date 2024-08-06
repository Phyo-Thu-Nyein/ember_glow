export interface UserDetails {
  status?:      string;
  message?:     string;
  data?:        UserData;
  accessToken?: string; //only for login
}

export interface UserData {
  id?:             string;
  profilePicture?: null | string;
  name?:           string;
  email?:          string;
  phone?:          string;
  address?:        string;
  role?:           number;
}

export interface RegisterData {
  name?:           string;
  email?:          string;
  password?:       string;
  phone?:          string;
}

export interface LoginData {
  email?: string;
  password?: string;
}
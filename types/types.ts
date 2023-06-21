export interface FilteredUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  jobId: number;
}

export interface UserResponse {
  status: string;
  data: {
    user: FilteredUser;
  };
}

export interface UserLoginResponse {
  status: string;
  token: string;
}

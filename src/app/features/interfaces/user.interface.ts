export interface UserInterface {
  user_id: number;
  email: string;
  fname: string;
  lname: string;
  profile_picture: string;
  activation_status: number;
  is_admin: number;
  role: number;
  archeologist_id: number | null;
}

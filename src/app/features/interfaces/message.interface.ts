export interface MessageInterface {
  message_id: number;
  name: string;
  message_text: string;
  email: string;
  check_status: number;
  created_at: string;
}

export interface LocalMessageInterface {
  message_id: number;
  name: string;
  message_text: string;
  email: string;
  check_status: boolean;
  created_at: string;
}

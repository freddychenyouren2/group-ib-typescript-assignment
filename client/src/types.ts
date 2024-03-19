export interface Notification {
  msg_id: string;
  msg: string;
  time: string;
}

export interface NotificationWithTimeout extends Notification {
  timeoutId?: NodeJS.Timeout;
}
import { Settings } from "./Settings.model";
import { Task } from "./Timer.model";

export interface Subscription{
    plan?: string;
    billingFrequency: string; 
    price?: number; 
    startDate?: Date; 
    endDate?: Date;  
    status?: string;
    paymentMethod?: string 
    metadata?: {
        tx_ref: string; 
      };
}

export interface Notification{
  user?: any;
  title?: string;
  message?: string;
  read?: boolean;
}

export interface User{
  name?: string;
  userId?: string;
  email?: string;
  picture?: string;
  password?: string;
  role?: 'user' | 'admin'
  subscriptions?: Subscription[]
  tasks?: Task[]
  notifications?: Notification[]
  settings?: Settings
}
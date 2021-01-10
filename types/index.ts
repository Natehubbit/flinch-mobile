import { DownloadResumable } from 'expo-file-system'
import { ExpoPushToken } from 'expo-notifications'
import firebase from 'firebase'

export type Currency = 'NGN'|'GHS'|'$'

export type User = {
    id:string;
    displayName:string;
    email:string;
    imageUrl:string;
    loggedIn:boolean;
    profileUpdated:boolean;
    celebrity:{
        isCeleb: boolean;
        id:string;
        data?: Celeb
    };
    role: UserRole;
    token: ExpoPushToken;
} | null;

export interface NotificationMessage {
    to?: ExpoPushToken | ExpoPushToken[]|string;
    data?: object;
    title?: string;
    subtitle?: string;
    body?: string;
    sent:boolean;
    read:boolean;
    recipientId:string;
}

export type UserRole = 'celebrity'|'user';

export type UserResponse =
    Partial<User>

export type CelebResponse =
    Partial<Celeb>

export interface AppLoader {
    authLoader:boolean;
    celebsLoader:boolean;
    bookingLoader:boolean;
    paymentLoader:boolean;
    requestsLoader:boolean;
    responseLoader:boolean;
    videosResponseLoader:boolean;
}

export type UploadProgressRef = firebase.storage.UploadTask|null;

export type LoaderString = keyof AppLoader

export interface Notification {
    title: string;
    body: string;
}
export interface PaymentMode {
    label:string;
    icon:string;
}

export interface Toast {
    show:boolean;
    msg:string;
    label:string;
    duration?:number;
    mode?:'default'|'danger'|'info'|'success'
    onPress?:()=>void;
    onDismiss?:()=>void;
}

export interface Request {
    id?: string;
    instructions: string;
    recipient: string;
    occasion: string;
    requestor: UserMeta;
    celebrity: UserMeta;
    response: RequestResponse;
    payment: RequestPayment;
    status: RequestStatus;
    price: Price;
    timestamp: number;
}

export interface RequestPayment {
    id:string;
    amount:number;
    payed:boolean;
    currency:Currency;
    timestamp:number;
}

export interface UserMeta {
    id:string;
    name:string;
    imageUrl?:string;
}

export interface RequestResponse {
    videoUri:string;
    duration:number;
    status:ResponseStatus;
    timestamp:number;
    thumbnailUri:string;
}

export interface Download {
    id: string;
    hook: DownloadResumable;
    progress: number;
    state: 'pending'|'downloading'|'paused'|'done'
}

export interface ResponsePayload extends RequestResponse {
    id: string;
    celebrity: string;
    date: string;
    recipient: string;
    thumbnailUri: string;
}

export type ResponseStatus = 'pending'|'rejected'|'approved'

export type RequestKeys = keyof Request

export interface BookForm {
    occasion:string;
    recipient:string;
    instructions:string;
}

export type PaymentType = 'mobile_money'|'card'

export interface Trx {
    trxref:string;
    reference:string;
}

export interface PaymentInitData {
    amount:string; // in pesewas
    currency:Currency;
    label:string;
    metadata:PaymentMetaData;
    email:string;
    callback_url:string;
    channels:Array<PaymentType>;
}

interface PaymentMetaData {
  id:string;
  customerName:string;
  requestId: string;
  data: Request;
}

export interface PaymentInitResponse {
    authorization_url: string;
    access_code: string;
    reference: string;
}

export type RequestStatus = 'urgent'|'failed'|'success'|'pending'

export interface ResponseState {
    approved: ResponsePayload[];
    rejected: ResponsePayload[]
    all: ResponsePayload[]
  }

export interface ApprovedActionPayload {
    key: keyof ResponseState;
    data: ResponsePayload[];
  }

export interface UpdateDownloadActionPayload {
    id:string;
    key:keyof Download;
    val:any;
}

export interface Selector {
    value: string;
    title?: string;
    show: boolean;
    options?: string[];
    onSelect?: () => void;
}

export interface Celeb {
    id:string;
    alias:string;
    bio:string;
    craft:string;
    imageUrl:string;
    popularity:number;
    price:Price;
    objectID?:string;
    role?:'celebrity'|'user';
    token?: ExpoPushToken;
}

export interface Price {
    amount: number;
    currency: Currency;
};

export interface BookParam {
    id: string,
    price: Price,
    alia: string,
    imageUrl: string,
    token: string,
}

export type Celebs = Celeb[]

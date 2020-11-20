import firebase from 'firebase'
export type User = {
    id:string;
    displayName:string;
    email:string;
    imageUrl:string;
    loggedIn:boolean;
    profileUpdated:boolean;
    isCelebrity:boolean;
    role:'celebrity'|'user';
} | null;

export interface AppLoader {
    authLoader:boolean;
    celebsLoader:boolean;
    bookingLoader:boolean;
    paymentLoader:boolean;
    requestsLoader:boolean;
    responseLoader:boolean;
}

export type UploadProgressRef = firebase.storage.UploadTask|null;

export type LoaderString = keyof AppLoader

export interface PaymentMode {
    label:string;
    icon:string;
}

export interface Toast {
    show:boolean;
    msg:string;
    label:string;
    duration?:number;
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
    price: number;
    timestamp: number;
}

export interface RequestPayment {
    id:string;
    amount:number;
    payed:boolean;
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
    currency:'GHS';
    label:string;
    metadata:PaymentMetaData;
    email:string;
    callback_url:string;
    channels:Array<PaymentType>;
}

interface PaymentMetaData {
  id:string;
  customerName:string;
}

export interface PaymentInitResponse {
    authorization_url: string;
    access_code: string;
    reference: string;
}

export type RequestStatus = 'urgent'|'failed'|'success'|'pending'

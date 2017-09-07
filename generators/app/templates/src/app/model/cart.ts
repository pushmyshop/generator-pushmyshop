import { Product } from './product';
export class Cart {
    id: string
    products : Product[] = [];
    
    pickingDate : Date;
    pickingHour : any;
    pickingName : string;
    pickingPhone : string;
}
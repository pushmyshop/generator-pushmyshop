import { Product } from './product';
export class Cart {
    id: string
    products : Product[] = [];

    pickingDate : string;
    pickingHour : string;
    pickingTimeHours : string;
    pickingTimeMinutes : string;
    pickingName : string;
    pickingPhone : string;

    isValidated : boolean = false;
}

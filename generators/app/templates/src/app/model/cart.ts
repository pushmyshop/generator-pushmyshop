import { Product } from './product';
export class Cart {
    id: string
    products : Product[] = [];

    pickingDate : Date;
    pickingHour : string;
    pickingTimeHours : string;
    pickingTimeMinutes : string;
    pickingName : string;
    pickingPhone : string;
}

import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {CartService} from "../service/cart.service";
import {PushService} from "../service/push.service";
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'popin-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderDialog {

  dateFormControl = new FormControl('', [Validators.required]);
  heureFormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(23)]);
  minuteFormControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(59)]);
  nomFormControl = new FormControl('', [Validators.required]);
  telFormControl = new FormControl('', [Validators.required]);

  orderValidated = false;


  constructor(private dialogRef: MdDialogRef<OrderDialog>
    ,@Inject(MD_DIALOG_DATA) public data: any
    , private _cartService: CartService
    , private _pushService: PushService
    , private _dateAdapter: DateAdapter<NativeDateAdapter>
    , private _router : Router) {
    _dateAdapter.setLocale('fr-FR');
  }

  validerReservation() {
    if(this.dateFormControl.valid && this.heureFormControl.valid
      && this.minuteFormControl.valid && this.nomFormControl.valid
      && this.telFormControl.valid) {

      this.data.pickingHour = this.data.pickingTimeHours + ':' + this.data.pickingTimeMinutes;
      this._cartService.validateCart(this.data.cart).then(cart => {
        this._cartService.resetCart();
        this.orderValidated = true;
        this._pushService.subscribeToPush(this.data.cart);
      })
    }
  }

  close(): void {
    if(!this.orderValidated){
      this.dialogRef.close();
    }else {
      this._router.navigateByUrl("/");
      this.dialogRef.close();
    }
  }
}

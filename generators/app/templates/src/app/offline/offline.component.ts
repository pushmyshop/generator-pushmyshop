import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";
import {CartService} from "../service/cart.service";
import {PushService} from "../service/push.service";
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Compagny} from "../model/compagny";

@Component({
  selector: 'popin-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css']
})
export class OfflineDialog {

  constructor(private dialogRef: MdDialogRef<OfflineDialog>
    ,@Inject(MD_DIALOG_DATA) public data: any) {
  }

  close(): void {
    this.dialogRef.close();
  }

  static alertOffline(dialog: MdDialog, compagny : Compagny): void {
    dialog.open(OfflineDialog, {
      width: '50%',
      data: { compagny: compagny }
    });
  }
}

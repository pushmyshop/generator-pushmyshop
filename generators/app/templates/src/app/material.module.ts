import { NgModule } from '@angular/core';


import {
  MdButtonModule,
  MdCardModule, MdCheckboxModule, MdDatepickerModule, MdDialogModule, MdFormFieldModule, MdIconModule, MdInputModule,
  MdListModule, MdNativeDateModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MdIconModule, MdCheckboxModule, MdToolbarModule,
    MdListModule, MdCardModule, MdDialogModule, MdButtonModule,
    MdFormFieldModule, MdInputModule, MdDatepickerModule, MdNativeDateModule],
  exports: [MdIconModule, MdCheckboxModule, MdToolbarModule,
    MdListModule, MdCardModule, MdDialogModule, MdButtonModule,
    MdFormFieldModule, MdInputModule, MdDatepickerModule, MdNativeDateModule],
})
export class MaterialModule { }

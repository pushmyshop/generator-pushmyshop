import { NgModule } from '@angular/core';


import {
  MdButtonModule,
  MdCardModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdListModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MdIconModule, MdCheckboxModule, MdToolbarModule, MdListModule, MdCardModule, MdDialogModule, MdButtonModule],
  exports: [MdIconModule, MdCheckboxModule, MdToolbarModule, MdListModule, MdCardModule, MdDialogModule, MdButtonModule],
})
export class MaterialModule { }

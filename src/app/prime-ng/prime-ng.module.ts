import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    MessagesModule,
    MenubarModule,
    PasswordModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RippleModule,
    SlideMenuModule,
    TableModule,
    TabViewModule,
    ToastModule
  ]
})
export class PrimeNgModule { }

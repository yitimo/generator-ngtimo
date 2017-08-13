import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<% if (needMaterial) { %>import {
    MdButtonModule, MdMenuModule, MdInputModule, MdTableModule,
    MdToolbarModule, MdDialogModule, MdProgressSpinnerModule,
    MdPaginatorModule, MdIconModule, MdSidenavModule, MdCardModule
} from '@angular/material';
import { CdkTableModule, ObserveContentModule } from '@angular/cdk';<% } %>

@NgModule({
    declarations: [ ],
    imports: [ CommonModule, MdDialogModule, MdButtonModule ],
    exports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        MdButtonModule, MdMenuModule,
        MdToolbarModule, MdDialogModule,
        MdInputModule, MdProgressSpinnerModule,
        MdTableModule, CdkTableModule, MdPaginatorModule,
        MdIconModule, MdSidenavModule, MdCardModule
    ],
    providers: []
})
export class SharedModule {}

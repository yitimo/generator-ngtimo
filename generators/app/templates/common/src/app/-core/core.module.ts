import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guards/auth.guard';
import { GlobalService } from './services/global';
import { StorageService } from './services/storage';
import { Http } from './services/http';

@NgModule({
    declarations: [],
    imports: [ CommonModule, HttpModule ],
    exports: [],
    providers: [ AuthGuard, StorageService, GlobalService, Http ],
})
export class CoreModule {}

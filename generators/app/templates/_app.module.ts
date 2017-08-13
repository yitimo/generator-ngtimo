import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ENV_PROVIDERS } from './environment';
import { AppComponent } from './app.component';
<% if (addCommon) { %>import { AppRoutingModule } from './app.route';
import { CoreModule } from './-core';
import { SharedModule } from './-shared';<% } %>
import 'hammerjs';
import '../styles/global.css';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,<% if (addCommon) { %>
    AppRoutingModule, CoreModule, SharedModule<% } %>
  ],
  providers: [
    ENV_PROVIDERS
  ],
  entryComponents: []
})
export class AppModule {}

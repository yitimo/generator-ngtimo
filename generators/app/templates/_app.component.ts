import {
    Component, OnInit, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    Hello~
    <% if (addCommon) { %><router-outlet></router-outlet><% } %>
  `,
})
export class AppComponent {}

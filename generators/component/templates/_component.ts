import { Component, OnInit } from '@angular/core';
<%if(needService){%>import { <%=ComponentName%>Service } from './<%=componentName%>.service';
<%}%>
@Component({
    selector: '<%=componentName%>',
    <%if(needInline){%>templateUrl: './<%=componentName%>.component.html',
    styleUrls: ['./<%=componentName%>.component.css']<%}else{%>template: `
        <%=ComponentName%>
    `,
    styles: [`
    
    `]<%}%>
})
export class <%=ComponentName%>Component implements OnInit {
    constructor(<%if(needService){%>
        private <%=componentName%>: <%=ComponentName%>Service
    <%}%>) {
        //
    }

    public ngOnInit() {
        //
    }
}

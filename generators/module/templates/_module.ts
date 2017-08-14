import { NgModule } from '@angular/core';
<%if(needRoute){%>import { CommonModule } from '@angular/common';
<%}%>import { DefaultComponent } from './default';
import { <%=ModuleName%>Service } from './<%=moduleName%>.service';
import { <%=ModuleName%>Component } from './<%=moduleName%>.component';
<%if(needRoute){%>import { <%=ModuleName%>RoutingModule } from './<%=moduleName%>.route';
<%}%>
@NgModule({
    declarations: [ <%=ModuleName%>Component<%if(needRoute){%>, DefaultComponent<%}%> ],
    imports: [ CommonModule<%if(needRoute){%>, <%=ModuleName%>RoutingModule<%}%> ],
    exports: [],
    providers: [<%=ModuleName%>Service],
})
export class <%=ModuleName%>Module {}

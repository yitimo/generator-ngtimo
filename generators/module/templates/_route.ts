import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { <%=ModuleName%>Component } from './<%=moduleName%>.component';
import { DefaultComponent } from './default';

const routes: Routes = [
    {
        path: '<%=moduleName%>',
        component: <%=ModuleName%>Component,
        children: [
            { path: '', component: DefaultComponent },
            { path: 'default', component: DefaultComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class <%=ModuleName%>RoutingModule {}

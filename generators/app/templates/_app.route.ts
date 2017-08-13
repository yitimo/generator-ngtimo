import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';

const routes: Routes = [
    // { path: '', redirectTo: '/home/index', pathMatch: 'full' }
    // { path: '**', redirectTo: '/home/index', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}

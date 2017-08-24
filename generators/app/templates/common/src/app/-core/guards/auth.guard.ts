/**
 * 可以在这里写一个路由守卫
 */

 import { Injectable } from '@angular/core';
 import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { Observable } from 'rxjs/Observable';
 
 @Injectable()
 export class AuthGuard implements CanActivate {
     canActivate(
         route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot
     ): Promise<boolean> | boolean {
         return true;
     }
 }
 
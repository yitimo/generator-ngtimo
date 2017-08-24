/**
 * 此为示例
 * 你可以在这里重写angular的Http服务以适应你项目的具体请求处理
 */

 import { Injectable } from '@angular/core';
 import { Http as NgHttp } from '@angular/http';
 
 @Injectable()
 export class Http {
    constructor(
        private ngHttp: NgHttp
    ) {}
 }

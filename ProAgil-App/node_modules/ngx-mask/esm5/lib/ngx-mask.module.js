/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { config, INITIAL_CONFIG, initialConfig, NEW_CONFIG } from './config';
import { MaskApplierService } from './mask-applier.service';
import { MaskDirective } from './mask.directive';
import { MaskPipe } from './mask.pipe';
var NgxMaskModule = /** @class */ (function () {
    function NgxMaskModule() {
    }
    /**
     * @param {?=} configValue
     * @return {?}
     */
    NgxMaskModule.forRoot = /**
     * @param {?=} configValue
     * @return {?}
     */
    function (configValue) {
        return {
            ngModule: NgxMaskModule,
            providers: [
                {
                    provide: NEW_CONFIG,
                    useValue: configValue,
                },
                {
                    provide: INITIAL_CONFIG,
                    useValue: initialConfig,
                },
                {
                    provide: config,
                    useFactory: _configFactory,
                    deps: [INITIAL_CONFIG, NEW_CONFIG],
                },
                MaskApplierService,
            ],
        };
    };
    /**
     * @param {?=} _configValue
     * @return {?}
     */
    NgxMaskModule.forChild = /**
     * @param {?=} _configValue
     * @return {?}
     */
    function (_configValue) {
        return {
            ngModule: NgxMaskModule,
        };
    };
    NgxMaskModule.decorators = [
        { type: NgModule, args: [{
                    exports: [MaskDirective, MaskPipe],
                    declarations: [MaskDirective, MaskPipe],
                },] }
    ];
    return NgxMaskModule;
}());
export { NgxMaskModule };
/**
 * \@internal
 * @param {?} initConfig
 * @param {?} configValue
 * @return {?}
 */
export function _configFactory(initConfig, configValue) {
    return configValue instanceof Function ? tslib_1.__assign({}, initConfig, configValue()) : tslib_1.__assign({}, initConfig, configValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hc2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbmd4LW1hc2subW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBaUIsTUFBTSxVQUFVLENBQUM7QUFDNUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkM7SUFBQTtJQStCQSxDQUFDOzs7OztJQTFCZSxxQkFBTzs7OztJQUFyQixVQUFzQixXQUFtRDtRQUN2RSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxVQUFVO29CQUNuQixRQUFRLEVBQUUsV0FBVztpQkFDdEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxhQUFhO2lCQUN4QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsTUFBTTtvQkFDZixVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQztpQkFDbkM7Z0JBQ0Qsa0JBQWtCO2FBQ25CO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7O0lBQ2Esc0JBQVE7Ozs7SUFBdEIsVUFBdUIsWUFBNEI7UUFDakQsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1NBQ3hCLENBQUM7SUFDSixDQUFDOztnQkE5QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7b0JBQ2xDLFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDOztJQTRCRCxvQkFBQztDQUFBLEFBL0JELElBK0JDO1NBM0JZLGFBQWE7Ozs7Ozs7QUFnQzFCLE1BQU0sVUFBVSxjQUFjLENBQzVCLFVBQXlCLEVBQ3pCLFdBQWtEO0lBRWxELE9BQU8sV0FBVyxZQUFZLFFBQVEsQ0FBQyxDQUFDLHNCQUFNLFVBQVUsRUFBSyxXQUFXLEVBQUUsRUFBRyxDQUFDLHNCQUFNLFVBQVUsRUFBSyxXQUFXLENBQUUsQ0FBQztBQUNuSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29uZmlnLCBJTklUSUFMX0NPTkZJRywgaW5pdGlhbENvbmZpZywgTkVXX0NPTkZJRywgb3B0aW9uc0NvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IE1hc2tBcHBsaWVyU2VydmljZSB9IGZyb20gJy4vbWFzay1hcHBsaWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFza0RpcmVjdGl2ZSB9IGZyb20gJy4vbWFzay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWFza1BpcGUgfSBmcm9tICcuL21hc2sucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtNYXNrRGlyZWN0aXZlLCBNYXNrUGlwZV0sXG4gIGRlY2xhcmF0aW9uczogW01hc2tEaXJlY3RpdmUsIE1hc2tQaXBlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWFza01vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWdWYWx1ZT86IG9wdGlvbnNDb25maWcgfCAoKCkgPT4gb3B0aW9uc0NvbmZpZykpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1hc2tNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5FV19DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1ZhbHVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IGluaXRpYWxDb25maWcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBjb25maWcsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmZpZ0ZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0lOSVRJQUxfQ09ORklHLCBORVdfQ09ORklHXSxcbiAgICAgICAgfSxcbiAgICAgICAgTWFza0FwcGxpZXJTZXJ2aWNlLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQoX2NvbmZpZ1ZhbHVlPzogb3B0aW9uc0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWFza01vZHVsZSxcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29uZmlnRmFjdG9yeShcbiAgaW5pdENvbmZpZzogb3B0aW9uc0NvbmZpZyxcbiAgY29uZmlnVmFsdWU6IG9wdGlvbnNDb25maWcgfCAoKCkgPT4gb3B0aW9uc0NvbmZpZylcbik6IG9wdGlvbnNDb25maWcge1xuICByZXR1cm4gY29uZmlnVmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHsgLi4uaW5pdENvbmZpZywgLi4uY29uZmlnVmFsdWUoKSB9IDogeyAuLi5pbml0Q29uZmlnLCAuLi5jb25maWdWYWx1ZSB9O1xufVxuIl19
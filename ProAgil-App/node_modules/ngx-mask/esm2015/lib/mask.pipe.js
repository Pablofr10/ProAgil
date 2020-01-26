/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { MaskApplierService } from './mask-applier.service';
export class MaskPipe {
    /**
     * @param {?} _maskService
     */
    constructor(_maskService) {
        this._maskService = _maskService;
    }
    /**
     * @param {?} value
     * @param {?} mask
     * @param {?=} thousandSeparator
     * @return {?}
     */
    transform(value, mask, thousandSeparator = null) {
        if (!value && typeof value !== 'number') {
            return '';
        }
        if (thousandSeparator) {
            this._maskService.thousandSeparator = thousandSeparator;
        }
        if (typeof mask === 'string') {
            return this._maskService.applyMask(`${value}`, mask);
        }
        return this._maskService.applyMaskWithPattern(`${value}`, mask);
    }
}
MaskPipe.decorators = [
    { type: Pipe, args: [{
                name: 'mask',
                pure: true,
            },] }
];
/** @nocollapse */
MaskPipe.ctorParameters = () => [
    { type: MaskApplierService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MaskPipe.prototype._maskService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvbWFzay5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU81RCxNQUFNLE9BQU8sUUFBUTs7OztJQUNuQixZQUEyQixZQUFnQztRQUFoQyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7SUFBRyxDQUFDOzs7Ozs7O0lBRXhELFNBQVMsQ0FDZCxLQUFzQixFQUN0QixJQUE0QyxFQUM1QyxvQkFBbUMsSUFBSTtRQUV2QyxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7O1lBdEJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsTUFBTTtnQkFDWixJQUFJLEVBQUUsSUFBSTthQUNYOzs7O1lBTlEsa0JBQWtCOzs7Ozs7O0lBUU4sZ0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXNrQXBwbGllclNlcnZpY2UgfSBmcm9tICcuL21hc2stYXBwbGllci5zZXJ2aWNlJztcbmltcG9ydCB7IElDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ21hc2snLFxuICBwdXJlOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXNrUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFza1NlcnZpY2U6IE1hc2tBcHBsaWVyU2VydmljZSkge31cblxuICBwdWJsaWMgdHJhbnNmb3JtKFxuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbWFzazogc3RyaW5nIHwgW3N0cmluZywgSUNvbmZpZ1sncGF0dGVybnMnXV0sXG4gICAgdGhvdXNhbmRTZXBhcmF0b3I6IHN0cmluZyB8IG51bGwgPSBudWxsXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKCF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmICh0aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgdGhpcy5fbWFza1NlcnZpY2UudGhvdXNhbmRTZXBhcmF0b3IgPSB0aG91c2FuZFNlcGFyYXRvcjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBtYXNrID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhgJHt2YWx1ZX1gLCBtYXNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFza1dpdGhQYXR0ZXJuKGAke3ZhbHVlfWAsIG1hc2spO1xuICB9XG59XG4iXX0=
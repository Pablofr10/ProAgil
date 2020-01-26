/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * @record
 */
export function IConfig() { }
if (false) {
    /** @type {?} */
    IConfig.prototype.suffix;
    /** @type {?} */
    IConfig.prototype.prefix;
    /** @type {?} */
    IConfig.prototype.thousandSeparator;
    /** @type {?} */
    IConfig.prototype.decimalMarker;
    /** @type {?} */
    IConfig.prototype.clearIfNotMatch;
    /** @type {?} */
    IConfig.prototype.showTemplate;
    /** @type {?} */
    IConfig.prototype.showMaskTyped;
    /** @type {?} */
    IConfig.prototype.placeHolderCharacter;
    /** @type {?} */
    IConfig.prototype.shownMaskExpression;
    /** @type {?} */
    IConfig.prototype.dropSpecialCharacters;
    /** @type {?} */
    IConfig.prototype.specialCharacters;
    /** @type {?} */
    IConfig.prototype.hiddenInput;
    /** @type {?} */
    IConfig.prototype.validation;
    /** @type {?} */
    IConfig.prototype.separatorLimit;
    /** @type {?} */
    IConfig.prototype.patterns;
}
/** @type {?} */
export var config = new InjectionToken('config');
/** @type {?} */
export var NEW_CONFIG = new InjectionToken('NEW_CONFIG');
/** @type {?} */
export var INITIAL_CONFIG = new InjectionToken('INITIAL_CONFIG');
/** @type {?} */
export var initialConfig = {
    suffix: '',
    prefix: '',
    thousandSeparator: ' ',
    decimalMarker: '.',
    clearIfNotMatch: false,
    showTemplate: false,
    showMaskTyped: false,
    placeHolderCharacter: '_',
    dropSpecialCharacters: true,
    hiddenInput: undefined,
    shownMaskExpression: '',
    separatorLimit: '',
    validation: true,
    // tslint:disable-next-line: quotemark
    specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '"', "'"],
    patterns: {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true,
        },
        X: {
            pattern: new RegExp('\\d'),
            symbol: '*',
        },
        A: {
            pattern: new RegExp('[a-zA-Z0-9]'),
        },
        S: {
            pattern: new RegExp('[a-zA-Z]'),
        },
        d: {
            pattern: new RegExp('\\d'),
        },
        m: {
            pattern: new RegExp('\\d'),
        },
        M: {
            pattern: new RegExp('\\d'),
        },
        H: {
            pattern: new RegExp('\\d'),
        },
        h: {
            pattern: new RegExp('\\d'),
        },
        s: {
            pattern: new RegExp('\\d'),
        },
    },
};
/** @type {?} */
export var timeMasks = ['Hh:m0:s0', 'Hh:m0', 'm0:s0'];
/** @type {?} */
export var withoutValidation = [
    'percent',
    'Hh',
    's0',
    'm0',
    'separator',
    'd0/M0/0000',
    'd0/M0',
    'd0',
    'M0',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJsaWIvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRS9DLDZCQXNCQzs7O0lBckJDLHlCQUFlOztJQUNmLHlCQUFlOztJQUNmLG9DQUEwQjs7SUFDMUIsZ0NBQXlCOztJQUN6QixrQ0FBeUI7O0lBQ3pCLCtCQUFzQjs7SUFDdEIsZ0NBQXVCOztJQUN2Qix1Q0FBNkI7O0lBQzdCLHNDQUE0Qjs7SUFDNUIsd0NBQTBDOztJQUMxQyxvQ0FBNEI7O0lBQzVCLDhCQUFpQzs7SUFDakMsNkJBQW9COztJQUNwQixpQ0FBdUI7O0lBQ3ZCLDJCQU1FOzs7QUFJSixNQUFNLEtBQU8sTUFBTSxHQUE0QixJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUM7O0FBQzNFLE1BQU0sS0FBTyxVQUFVLEdBQTRCLElBQUksY0FBYyxDQUFDLFlBQVksQ0FBQzs7QUFDbkYsTUFBTSxLQUFPLGNBQWMsR0FBNEIsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLENBQUM7O0FBRTNGLE1BQU0sS0FBTyxhQUFhLEdBQVk7SUFDcEMsTUFBTSxFQUFFLEVBQUU7SUFDVixNQUFNLEVBQUUsRUFBRTtJQUNWLGlCQUFpQixFQUFFLEdBQUc7SUFDdEIsYUFBYSxFQUFFLEdBQUc7SUFDbEIsZUFBZSxFQUFFLEtBQUs7SUFDdEIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsb0JBQW9CLEVBQUUsR0FBRztJQUN6QixxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLFdBQVcsRUFBRSxTQUFTO0lBQ3RCLG1CQUFtQixFQUFFLEVBQUU7SUFDdkIsY0FBYyxFQUFFLEVBQUU7SUFDbEIsVUFBVSxFQUFFLElBQUk7O0lBRWhCLGlCQUFpQixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN6RixRQUFRLEVBQUU7UUFDUixHQUFHLEVBQUU7WUFDSCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMxQixRQUFRLEVBQUUsSUFBSTtTQUNmO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMxQixNQUFNLEVBQUUsR0FBRztTQUNaO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUNuQztRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDaEM7UUFDRCxDQUFDLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFDRCxDQUFDLEVBQUU7WUFDRCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsQ0FBQyxFQUFFO1lBQ0QsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELENBQUMsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDM0I7S0FDRjtDQUNGOztBQUVELE1BQU0sS0FBTyxTQUFTLEdBQWEsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQzs7QUFFakUsTUFBTSxLQUFPLGlCQUFpQixHQUFhO0lBQ3pDLFNBQVM7SUFDVCxJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixXQUFXO0lBQ1gsWUFBWTtJQUNaLE9BQU87SUFDUCxJQUFJO0lBQ0osSUFBSTtDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnIHtcbiAgc3VmZml4OiBzdHJpbmc7XG4gIHByZWZpeDogc3RyaW5nO1xuICB0aG91c2FuZFNlcGFyYXRvcjogc3RyaW5nO1xuICBkZWNpbWFsTWFya2VyOiAnLicgfCAnLCc7XG4gIGNsZWFySWZOb3RNYXRjaDogYm9vbGVhbjtcbiAgc2hvd1RlbXBsYXRlOiBib29sZWFuO1xuICBzaG93TWFza1R5cGVkOiBib29sZWFuO1xuICBwbGFjZUhvbGRlckNoYXJhY3Rlcjogc3RyaW5nO1xuICBzaG93bk1hc2tFeHByZXNzaW9uOiBzdHJpbmc7XG4gIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogYm9vbGVhbiB8IHN0cmluZ1tdO1xuICBzcGVjaWFsQ2hhcmFjdGVyczogc3RyaW5nW107XG4gIGhpZGRlbklucHV0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICB2YWxpZGF0aW9uOiBib29sZWFuO1xuICBzZXBhcmF0b3JMaW1pdDogc3RyaW5nO1xuICBwYXR0ZXJuczoge1xuICAgIFtjaGFyYWN0ZXI6IHN0cmluZ106IHtcbiAgICAgIHBhdHRlcm46IFJlZ0V4cDtcbiAgICAgIG9wdGlvbmFsPzogYm9vbGVhbjtcbiAgICAgIHN5bWJvbD86IHN0cmluZztcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBvcHRpb25zQ29uZmlnID0gUGFydGlhbDxJQ29uZmlnPjtcbmV4cG9ydCBjb25zdCBjb25maWc6IEluamVjdGlvblRva2VuPElDb25maWc+ID0gbmV3IEluamVjdGlvblRva2VuKCdjb25maWcnKTtcbmV4cG9ydCBjb25zdCBORVdfQ09ORklHOiBJbmplY3Rpb25Ub2tlbjxJQ29uZmlnPiA9IG5ldyBJbmplY3Rpb25Ub2tlbignTkVXX0NPTkZJRycpO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfQ09ORklHOiBJbmplY3Rpb25Ub2tlbjxJQ29uZmlnPiA9IG5ldyBJbmplY3Rpb25Ub2tlbignSU5JVElBTF9DT05GSUcnKTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxDb25maWc6IElDb25maWcgPSB7XG4gIHN1ZmZpeDogJycsXG4gIHByZWZpeDogJycsXG4gIHRob3VzYW5kU2VwYXJhdG9yOiAnICcsXG4gIGRlY2ltYWxNYXJrZXI6ICcuJyxcbiAgY2xlYXJJZk5vdE1hdGNoOiBmYWxzZSxcbiAgc2hvd1RlbXBsYXRlOiBmYWxzZSxcbiAgc2hvd01hc2tUeXBlZDogZmFsc2UsXG4gIHBsYWNlSG9sZGVyQ2hhcmFjdGVyOiAnXycsXG4gIGRyb3BTcGVjaWFsQ2hhcmFjdGVyczogdHJ1ZSxcbiAgaGlkZGVuSW5wdXQ6IHVuZGVmaW5lZCxcbiAgc2hvd25NYXNrRXhwcmVzc2lvbjogJycsXG4gIHNlcGFyYXRvckxpbWl0OiAnJyxcbiAgdmFsaWRhdGlvbjogdHJ1ZSxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBxdW90ZW1hcmtcbiAgc3BlY2lhbENoYXJhY3RlcnM6IFsnLScsICcvJywgJygnLCAnKScsICcuJywgJzonLCAnICcsICcrJywgJywnLCAnQCcsICdbJywgJ10nLCAnXCInLCBcIidcIl0sXG4gIHBhdHRlcm5zOiB7XG4gICAgJzAnOiB7XG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgIH0sXG4gICAgJzknOiB7XG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgfSxcbiAgICBYOiB7XG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgICAgc3ltYm9sOiAnKicsXG4gICAgfSxcbiAgICBBOiB7XG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdbYS16QS1aMC05XScpLFxuICAgIH0sXG4gICAgUzoge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnW2EtekEtWl0nKSxcbiAgICB9LFxuICAgIGQ6IHtcbiAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgfSxcbiAgICBtOiB7XG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgIH0sXG4gICAgTToge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICB9LFxuICAgIEg6IHtcbiAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgfSxcbiAgICBoOiB7XG4gICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgIH0sXG4gICAgczoge1xuICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxcXGQnKSxcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHRpbWVNYXNrczogc3RyaW5nW10gPSBbJ0hoOm0wOnMwJywgJ0hoOm0wJywgJ20wOnMwJ107XG5cbmV4cG9ydCBjb25zdCB3aXRob3V0VmFsaWRhdGlvbjogc3RyaW5nW10gPSBbXG4gICdwZXJjZW50JyxcbiAgJ0hoJyxcbiAgJ3MwJyxcbiAgJ20wJyxcbiAgJ3NlcGFyYXRvcicsXG4gICdkMC9NMC8wMDAwJyxcbiAgJ2QwL00wJyxcbiAgJ2QwJyxcbiAgJ00wJyxcbl07XG4iXX0=
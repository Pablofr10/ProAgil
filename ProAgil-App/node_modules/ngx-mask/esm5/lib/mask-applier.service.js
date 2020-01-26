/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { config } from './config';
var MaskApplierService = /** @class */ (function () {
    function MaskApplierService(_config) {
        var _this = this;
        this._config = _config;
        this.maskExpression = '';
        this.actualValue = '';
        this.shownMaskExpression = '';
        this._formatWithSeparators = (/**
         * @param {?} str
         * @param {?} thousandSeparatorChar
         * @param {?} decimalChar
         * @param {?} precision
         * @return {?}
         */
        function (str, thousandSeparatorChar, decimalChar, precision) {
            /** @type {?} */
            var x = str.split(decimalChar);
            /** @type {?} */
            var decimals = x.length > 1 ? "" + decimalChar + x[1] : '';
            /** @type {?} */
            var res = x[0];
            /** @type {?} */
            var separatorLimit = _this.separatorLimit.replace(/\s/g, '');
            if (separatorLimit && +separatorLimit) {
                if (res[0] === '-') {
                    res = "-" + res.slice(1, res.length).slice(0, separatorLimit.length);
                }
                else {
                    res = res.slice(0, separatorLimit.length);
                }
            }
            /** @type {?} */
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(res)) {
                res = res.replace(rgx, '$1' + thousandSeparatorChar + '$2');
            }
            if (precision === undefined) {
                return res + decimals;
            }
            else if (precision === 0) {
                return res;
            }
            return res + decimals.substr(0, precision + 1);
        });
        this.percentage = (/**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            return Number(str) >= 0 && Number(str) <= 100;
        });
        this.getPrecision = (/**
         * @param {?} maskExpression
         * @return {?}
         */
        function (maskExpression) {
            /** @type {?} */
            var x = maskExpression.split('.');
            if (x.length > 1) {
                return Number(x[x.length - 1]);
            }
            return Infinity;
        });
        this.checkInputPrecision = (/**
         * @param {?} inputValue
         * @param {?} precision
         * @param {?} decimalMarker
         * @return {?}
         */
        function (inputValue, precision, decimalMarker) {
            if (precision < Infinity) {
                /** @type {?} */
                var precisionRegEx = new RegExp(_this._charToRegExpExpression(decimalMarker) + ("\\d{" + precision + "}.*$"));
                /** @type {?} */
                var precisionMatch = inputValue.match(precisionRegEx);
                if (precisionMatch && precisionMatch[0].length - 1 > precision) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
                else if (precision === 0 && inputValue.endsWith(decimalMarker)) {
                    inputValue = inputValue.substring(0, inputValue.length - 1);
                }
            }
            return inputValue;
        });
        this._shift = new Set();
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = this._config.specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.prefix = this._config.prefix;
        this.suffix = this._config.suffix;
        this.thousandSeparator = this._config.thousandSeparator;
        this.decimalMarker = this._config.decimalMarker;
        this.hiddenInput = this._config.hiddenInput;
        this.showMaskTyped = this._config.showMaskTyped;
        this.placeHolderCharacter = this._config.placeHolderCharacter;
        this.validation = this._config.validation;
        this.separatorLimit = this._config.separatorLimit;
    }
    /**
     * @param {?} inputValue
     * @param {?} maskAndPattern
     * @return {?}
     */
    MaskApplierService.prototype.applyMaskWithPattern = /**
     * @param {?} inputValue
     * @param {?} maskAndPattern
     * @return {?}
     */
    function (inputValue, maskAndPattern) {
        var _a = tslib_1.__read(maskAndPattern, 2), mask = _a[0], customPattern = _a[1];
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    };
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskApplierService.prototype.applyMask = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = (/**
         * @return {?}
         */
        function () { }); }
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        /** @type {?} */
        var cursor = 0;
        /** @type {?} */
        var result = '';
        /** @type {?} */
        var multi = false;
        /** @type {?} */
        var backspaceShift = false;
        /** @type {?} */
        var shift = 1;
        /** @type {?} */
        var stepBack = false;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        if (!!this.suffix && inputValue.endsWith(this.suffix)) {
            inputValue = inputValue.slice(0, inputValue.length - this.suffix.length);
        }
        /** @type {?} */
        var inputArray = inputValue.toString().split('');
        if (maskExpression === 'IP') {
            this.ipError = !!(inputArray.filter((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i === '.'; })).length < 3 && inputArray.length < 7);
            maskExpression = '099.099.099.099';
        }
        if (maskExpression.startsWith('percent')) {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                inputValue = this._stripToDecimal(inputValue);
                /** @type {?} */
                var precision = this.getPrecision(maskExpression);
                inputValue = this.checkInputPrecision(inputValue, precision, '.');
            }
            if (inputValue.indexOf('.') > 0 && !this.percentage(inputValue.substring(0, inputValue.indexOf('.')))) {
                /** @type {?} */
                var base = inputValue.substring(0, inputValue.indexOf('.') - 1);
                inputValue = "" + base + inputValue.substring(inputValue.indexOf('.'), inputValue.length);
            }
            if (this.percentage(inputValue)) {
                result = inputValue;
            }
            else {
                result = inputValue.substring(0, inputValue.length - 1);
            }
        }
        else if (maskExpression.startsWith('separator')) {
            if (inputValue.match('[wа-яА-Я]') ||
                inputValue.match('[ЁёА-я]') ||
                inputValue.match('[a-z]|[A-Z]') ||
                inputValue.match(/[-@#!$%\\^&*()_£¬'+|~=`{}\[\]:";<>.?\/]/) ||
                inputValue.match('[^A-Za-z0-9,]')) {
                inputValue = this._stripToDecimal(inputValue);
            }
            inputValue =
                inputValue.length > 1 && inputValue[0] === '0' && inputValue[1] !== this.decimalMarker
                    ? inputValue.slice(1, inputValue.length)
                    : inputValue;
            // TODO: we had different rexexps here for the different cases... but tests dont seam to bother - check this
            //  separator: no COMMA, dot-sep: no SPACE, COMMA OK, comma-sep: no SPACE, COMMA OK
            /** @type {?} */
            var thousandSeperatorCharEscaped = this._charToRegExpExpression(this.thousandSeparator);
            /** @type {?} */
            var decimalMarkerEscaped = this._charToRegExpExpression(this.decimalMarker);
            /** @type {?} */
            var invalidChars = '@#!$%^&*()_+|~=`{}\\[\\]:\\s,";<>?\\/'
                .replace(thousandSeperatorCharEscaped, '')
                .replace(decimalMarkerEscaped, '');
            /** @type {?} */
            var invalidCharRegexp = new RegExp('[' + invalidChars + ']');
            if (inputValue.match(invalidCharRegexp)) {
                inputValue = inputValue.substring(0, inputValue.length - 1);
            }
            /** @type {?} */
            var precision = this.getPrecision(maskExpression);
            inputValue = this.checkInputPrecision(inputValue, precision, this.decimalMarker);
            /** @type {?} */
            var strForSep = inputValue.replace(new RegExp(thousandSeperatorCharEscaped, 'g'), '');
            result = this._formatWithSeparators(strForSep, this.thousandSeparator, this.decimalMarker, precision);
            /** @type {?} */
            var commaShift = result.indexOf(',') - inputValue.indexOf(',');
            /** @type {?} */
            var shiftStep = result.length - inputValue.length;
            if (shiftStep > 0 && result[position] !== ',') {
                backspaceShift = true;
                /** @type {?} */
                var _shift = 0;
                do {
                    this._shift.add(position + _shift);
                    _shift++;
                } while (_shift < shiftStep);
            }
            else if ((commaShift !== 0 && position > 0 && !(result.indexOf(',') >= position && position > 3)) ||
                (!(result.indexOf('.') >= position && position > 3) && shiftStep <= 0)) {
                this._shift.clear();
                backspaceShift = true;
                shift = shiftStep;
                position += shiftStep;
                this._shift.add(position);
            }
            else {
                this._shift.clear();
            }
        }
        else {
            for (
            // tslint:disable-next-line
            var i = 0, inputSymbol = inputArray[0]; i < inputArray.length; i++, inputSymbol = inputArray[i]) {
                if (cursor === maskExpression.length) {
                    break;
                }
                if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
                    result += inputSymbol;
                    cursor += 2;
                }
                else if (maskExpression[cursor + 1] === '*' &&
                    multi &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                    multi = false;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '*') {
                    result += inputSymbol;
                    multi = true;
                }
                else if (maskExpression[cursor + 1] === '?' &&
                    this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                    result += inputSymbol;
                    cursor += 3;
                }
                else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) ||
                    (this.hiddenInput &&
                        this.maskAvailablePatterns[maskExpression[cursor]] &&
                        this.maskAvailablePatterns[maskExpression[cursor]].symbol === inputSymbol)) {
                    if (maskExpression[cursor] === 'H') {
                        if (Number(inputSymbol) > 2) {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'h') {
                        if (result === '2' && Number(inputSymbol) > 3) {
                            cursor += 1;
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'm') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 's') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    /** @type {?} */
                    var daysCount = 31;
                    if (maskExpression[cursor] === 'd') {
                        if (Number(inputValue.slice(cursor, cursor + 2)) > daysCount || inputValue[cursor + 1] === '/') {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'M') {
                        /** @type {?} */
                        var monthsCount = 12;
                        // mask without day
                        /** @type {?} */
                        var withoutDays = cursor === 0 &&
                            (Number(inputSymbol) > 2 ||
                                Number(inputValue.slice(cursor, cursor + 2)) > monthsCount ||
                                inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for input
                        /** @type {?} */
                        var day1monthInput = inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            ((inputValue[cursor - 2] === '/' &&
                                (Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount && inputValue[cursor] !== '/')) ||
                                inputValue[cursor] === '/' ||
                                ((inputValue[cursor - 3] === '/' &&
                                    (Number(inputValue.slice(cursor - 2, cursor)) > monthsCount && inputValue[cursor - 1] !== '/')) ||
                                    inputValue[cursor - 1] === '/'));
                        // 10<day<31 && month<12 for input
                        /** @type {?} */
                        var day2monthInput = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] === '/' &&
                            (Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for paste whole data
                        /** @type {?} */
                        var day1monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) > daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            (!inputValue.slice(cursor - 2, cursor).includes('/') &&
                                Number(inputValue.slice(cursor - 2, cursor)) > monthsCount);
                        // 10<day<31 && month<12 for paste whole data
                        /** @type {?} */
                        var day2monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] !== '/' &&
                            Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount;
                        if (withoutDays || day1monthInput || day2monthInput || day1monthPaste || day2monthPaste) {
                            cursor += 1;
                            /** @type {?} */
                            var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    result += inputSymbol;
                    cursor++;
                }
                else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                    result += maskExpression[cursor];
                    cursor++;
                    /** @type {?} */
                    var shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                    this._shift.add(shiftStep + this.prefix.length || 0);
                    i--;
                }
                else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1 &&
                    this.maskAvailablePatterns[maskExpression[cursor]] &&
                    this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                    if (!!inputArray[cursor] && maskExpression !== '099.099.099.099') {
                        result += inputArray[cursor];
                    }
                    cursor++;
                    i--;
                }
                else if (this.maskExpression[cursor + 1] === '*' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.maskExpression[cursor + 1] === '?' &&
                    this._findSpecialChar(this.maskExpression[cursor + 2]) &&
                    this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] &&
                    multi) {
                    cursor += 3;
                    result += inputSymbol;
                }
                else if (this.showMaskTyped && this.maskSpecialCharacters.indexOf(inputSymbol) < 0 && inputSymbol !== this.placeHolderCharacter) {
                    stepBack = true;
                }
            }
        }
        if (result.length + 1 === maskExpression.length &&
            this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        /** @type {?} */
        var newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        /** @type {?} */
        var actualShift = this._shift.has(position) ? shift : 0;
        if (stepBack) {
            actualShift--;
        }
        cb(actualShift, backspaceShift);
        if (shift < 0) {
            this._shift.clear();
        }
        /** @type {?} */
        var res = "" + this.prefix + result + this.suffix;
        if (result.length === 0) {
            res = "" + this.prefix + result;
        }
        return res;
    };
    /**
     * @param {?} inputSymbol
     * @return {?}
     */
    MaskApplierService.prototype._findSpecialChar = /**
     * @param {?} inputSymbol
     * @return {?}
     */
    function (inputSymbol) {
        return this.maskSpecialCharacters.find((/**
         * @param {?} val
         * @return {?}
         */
        function (val) { return val === inputSymbol; }));
    };
    /**
     * @protected
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    MaskApplierService.prototype._checkSymbolMask = /**
     * @protected
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    function (inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern ? this.customPattern : this.maskAvailablePatterns;
        return (this.maskAvailablePatterns[maskSymbol] &&
            this.maskAvailablePatterns[maskSymbol].pattern &&
            this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol));
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    MaskApplierService.prototype._stripToDecimal = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str
            .split('')
            .filter((/**
         * @param {?} i
         * @param {?} idx
         * @return {?}
         */
        function (i, idx) {
            return i.match('^-?\\d') || i === '.' || i === ',' || (i === '-' && idx === 0);
        }))
            .join('');
    };
    /**
     * @private
     * @param {?} char
     * @return {?}
     */
    MaskApplierService.prototype._charToRegExpExpression = /**
     * @private
     * @param {?} char
     * @return {?}
     */
    function (char) {
        /** @type {?} */
        var charsToEscape = '[\\^$.|?*+()';
        return char === ' ' ? '\\s' : charsToEscape.indexOf(char) >= 0 ? '\\' + char : char;
    };
    MaskApplierService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MaskApplierService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
    ]; };
    return MaskApplierService;
}());
export { MaskApplierService };
if (false) {
    /** @type {?} */
    MaskApplierService.prototype.dropSpecialCharacters;
    /** @type {?} */
    MaskApplierService.prototype.hiddenInput;
    /** @type {?} */
    MaskApplierService.prototype.showTemplate;
    /** @type {?} */
    MaskApplierService.prototype.clearIfNotMatch;
    /** @type {?} */
    MaskApplierService.prototype.maskExpression;
    /** @type {?} */
    MaskApplierService.prototype.actualValue;
    /** @type {?} */
    MaskApplierService.prototype.shownMaskExpression;
    /** @type {?} */
    MaskApplierService.prototype.maskSpecialCharacters;
    /** @type {?} */
    MaskApplierService.prototype.maskAvailablePatterns;
    /** @type {?} */
    MaskApplierService.prototype.prefix;
    /** @type {?} */
    MaskApplierService.prototype.suffix;
    /** @type {?} */
    MaskApplierService.prototype.thousandSeparator;
    /** @type {?} */
    MaskApplierService.prototype.decimalMarker;
    /** @type {?} */
    MaskApplierService.prototype.customPattern;
    /** @type {?} */
    MaskApplierService.prototype.ipError;
    /** @type {?} */
    MaskApplierService.prototype.showMaskTyped;
    /** @type {?} */
    MaskApplierService.prototype.placeHolderCharacter;
    /** @type {?} */
    MaskApplierService.prototype.validation;
    /** @type {?} */
    MaskApplierService.prototype.separatorLimit;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype._shift;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype._formatWithSeparators;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.percentage;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.getPrecision;
    /**
     * @type {?}
     * @private
     */
    MaskApplierService.prototype.checkInputPrecision;
    /**
     * @type {?}
     * @protected
     */
    MaskApplierService.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1hcHBsaWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLWFwcGxpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxNQUFNLEVBQVcsTUFBTSxVQUFVLENBQUM7QUFFM0M7SUF3QkUsNEJBQTZDLE9BQWdCO1FBQTdELGlCQWVDO1FBZjRDLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFsQnRELG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLHdCQUFtQixHQUFXLEVBQUUsQ0FBQztRQWlWaEMsMEJBQXFCOzs7Ozs7O1FBQUcsVUFDOUIsR0FBVyxFQUNYLHFCQUE2QixFQUM3QixXQUFtQixFQUNuQixTQUFpQjs7Z0JBRVgsQ0FBQyxHQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDOztnQkFDcEMsUUFBUSxHQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7O2dCQUNoRSxHQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ2hCLGNBQWMsR0FBVyxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQ3JFLElBQUksY0FBYyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ2hCLEdBQUcsR0FBRyxNQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFF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LENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0RixDQUFDOztnQkFqYUYsVUFBVTs7OztnREF3QlcsTUFBTSxTQUFDLE1BQU07O0lBMlluQyx5QkFBQztDQUFBLEFBbmFELElBbWFDO1NBbGFZLGtCQUFrQjs7O0lBQzdCLG1EQUErRDs7SUFDL0QseUNBQTJDOztJQUMzQywwQ0FBOEM7O0lBQzlDLDZDQUFvRDs7SUFDcEQsNENBQW1DOztJQUNuQyx5Q0FBZ0M7O0lBQ2hDLGlEQUF3Qzs7SUFDeEMsbURBQTREOztJQUM1RCxtREFBbUQ7O0lBQ25ELG9DQUFrQzs7SUFDbEMsb0NBQWtDOztJQUNsQywrQ0FBd0Q7O0lBQ3hELDJDQUFnRDs7SUFDaEQsMkNBQTJDOztJQUMzQyxxQ0FBeUI7O0lBQ3pCLDJDQUFnRDs7SUFDaEQsa0RBQThEOztJQUM5RCx3Q0FBeUM7O0lBQ3pDLDRDQUFpRDs7Ozs7SUFFakQsb0NBQTZCOzs7OztJQW1VN0IsbURBMkJFOzs7OztJQUVGLHdDQUVFOzs7OztJQUVGLDBDQU9FOzs7OztJQUVGLGlEQWdCRTs7Ozs7SUEzWGlCLHFDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25maWcsIElDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXNrQXBwbGllclNlcnZpY2Uge1xuICBwdWJsaWMgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydkcm9wU3BlY2lhbENoYXJhY3RlcnMnXTtcbiAgcHVibGljIGhpZGRlbklucHV0OiBJQ29uZmlnWydoaWRkZW5JbnB1dCddO1xuICBwdWJsaWMgc2hvd1RlbXBsYXRlITogSUNvbmZpZ1snc2hvd1RlbXBsYXRlJ107XG4gIHB1YmxpYyBjbGVhcklmTm90TWF0Y2ghOiBJQ29uZmlnWydjbGVhcklmTm90TWF0Y2gnXTtcbiAgcHVibGljIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIGFjdHVhbFZhbHVlOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIHNob3duTWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgbWFza1NwZWNpYWxDaGFyYWN0ZXJzITogSUNvbmZpZ1snc3BlY2lhbENoYXJhY3RlcnMnXTtcbiAgcHVibGljIG1hc2tBdmFpbGFibGVQYXR0ZXJucyE6IElDb25maWdbJ3BhdHRlcm5zJ107XG4gIHB1YmxpYyBwcmVmaXghOiBJQ29uZmlnWydwcmVmaXgnXTtcbiAgcHVibGljIHN1ZmZpeCE6IElDb25maWdbJ3N1ZmZpeCddO1xuICBwdWJsaWMgdGhvdXNhbmRTZXBhcmF0b3IhOiBJQ29uZmlnWyd0aG91c2FuZFNlcGFyYXRvciddO1xuICBwdWJsaWMgZGVjaW1hbE1hcmtlciE6IElDb25maWdbJ2RlY2ltYWxNYXJrZXInXTtcbiAgcHVibGljIGN1c3RvbVBhdHRlcm4hOiBJQ29uZmlnWydwYXR0ZXJucyddO1xuICBwdWJsaWMgaXBFcnJvcj86IGJvb2xlYW47XG4gIHB1YmxpYyBzaG93TWFza1R5cGVkITogSUNvbmZpZ1snc2hvd01hc2tUeXBlZCddO1xuICBwdWJsaWMgcGxhY2VIb2xkZXJDaGFyYWN0ZXIhOiBJQ29uZmlnWydwbGFjZUhvbGRlckNoYXJhY3RlciddO1xuICBwdWJsaWMgdmFsaWRhdGlvbjogSUNvbmZpZ1sndmFsaWRhdGlvbiddO1xuICBwdWJsaWMgc2VwYXJhdG9yTGltaXQ6IElDb25maWdbJ3NlcGFyYXRvckxpbWl0J107XG5cbiAgcHJpdmF0ZSBfc2hpZnQhOiBTZXQ8bnVtYmVyPjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnKSB7XG4gICAgdGhpcy5fc2hpZnQgPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2ggPSB0aGlzLl9jb25maWcuY2xlYXJJZk5vdE1hdGNoO1xuICAgIHRoaXMuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5fY29uZmlnLmRyb3BTcGVjaWFsQ2hhcmFjdGVycztcbiAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZy5zcGVjaWFsQ2hhcmFjdGVycztcbiAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHRoaXMuX2NvbmZpZy5wYXR0ZXJucztcbiAgICB0aGlzLnByZWZpeCA9IHRoaXMuX2NvbmZpZy5wcmVmaXg7XG4gICAgdGhpcy5zdWZmaXggPSB0aGlzLl9jb25maWcuc3VmZml4O1xuICAgIHRoaXMudGhvdXNhbmRTZXBhcmF0b3IgPSB0aGlzLl9jb25maWcudGhvdXNhbmRTZXBhcmF0b3I7XG4gICAgdGhpcy5kZWNpbWFsTWFya2VyID0gdGhpcy5fY29uZmlnLmRlY2ltYWxNYXJrZXI7XG4gICAgdGhpcy5oaWRkZW5JbnB1dCA9IHRoaXMuX2NvbmZpZy5oaWRkZW5JbnB1dDtcbiAgICB0aGlzLnNob3dNYXNrVHlwZWQgPSB0aGlzLl9jb25maWcuc2hvd01hc2tUeXBlZDtcbiAgICB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyID0gdGhpcy5fY29uZmlnLnBsYWNlSG9sZGVyQ2hhcmFjdGVyO1xuICAgIHRoaXMudmFsaWRhdGlvbiA9IHRoaXMuX2NvbmZpZy52YWxpZGF0aW9uO1xuICAgIHRoaXMuc2VwYXJhdG9yTGltaXQgPSB0aGlzLl9jb25maWcuc2VwYXJhdG9yTGltaXQ7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlNYXNrV2l0aFBhdHRlcm4oaW5wdXRWYWx1ZTogc3RyaW5nLCBtYXNrQW5kUGF0dGVybjogW3N0cmluZywgSUNvbmZpZ1sncGF0dGVybnMnXV0pOiBzdHJpbmcge1xuICAgIGNvbnN0IFttYXNrLCBjdXN0b21QYXR0ZXJuXSA9IG1hc2tBbmRQYXR0ZXJuO1xuICAgIHRoaXMuY3VzdG9tUGF0dGVybiA9IGN1c3RvbVBhdHRlcm47XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlNYXNrKGlucHV0VmFsdWUsIG1hc2spO1xuICB9XG4gIHB1YmxpYyBhcHBseU1hc2soaW5wdXRWYWx1ZTogc3RyaW5nLCBtYXNrRXhwcmVzc2lvbjogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyID0gMCwgY2I6IEZ1bmN0aW9uID0gKCkgPT4geyB9KTogc3RyaW5nIHtcbiAgICBpZiAoaW5wdXRWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGlucHV0VmFsdWUgPT09IG51bGwgfHwgbWFza0V4cHJlc3Npb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgY3Vyc29yID0gMDtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgbGV0IG11bHRpID0gZmFsc2U7XG4gICAgbGV0IGJhY2tzcGFjZVNoaWZ0ID0gZmFsc2U7XG4gICAgbGV0IHNoaWZ0ID0gMTtcbiAgICBsZXQgc3RlcEJhY2sgPSBmYWxzZTtcbiAgICBpZiAoaW5wdXRWYWx1ZS5zbGljZSgwLCB0aGlzLnByZWZpeC5sZW5ndGgpID09PSB0aGlzLnByZWZpeCkge1xuICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc2xpY2UodGhpcy5wcmVmaXgubGVuZ3RoLCBpbnB1dFZhbHVlLmxlbmd0aCk7XG4gICAgfVxuICAgIGlmICghIXRoaXMuc3VmZml4ICYmIGlucHV0VmFsdWUuZW5kc1dpdGgodGhpcy5zdWZmaXgpKSB7XG4gICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zbGljZSgwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIHRoaXMuc3VmZml4Lmxlbmd0aCk7XG4gICAgfVxuICAgIGNvbnN0IGlucHV0QXJyYXk6IHN0cmluZ1tdID0gaW5wdXRWYWx1ZS50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICBpZiAobWFza0V4cHJlc3Npb24gPT09ICdJUCcpIHtcbiAgICAgIHRoaXMuaXBFcnJvciA9ICEhKGlucHV0QXJyYXkuZmlsdGVyKChpOiBzdHJpbmcpID0+IGkgPT09ICcuJykubGVuZ3RoIDwgMyAmJiBpbnB1dEFycmF5Lmxlbmd0aCA8IDcpO1xuICAgICAgbWFza0V4cHJlc3Npb24gPSAnMDk5LjA5OS4wOTkuMDk5JztcbiAgICB9XG4gICAgaWYgKG1hc2tFeHByZXNzaW9uLnN0YXJ0c1dpdGgoJ3BlcmNlbnQnKSkge1xuICAgICAgaWYgKGlucHV0VmFsdWUubWF0Y2goJ1thLXpdfFtBLVpdJykgfHwgaW5wdXRWYWx1ZS5tYXRjaCgvWy0hJCVeJiooKV8rfH49YHt9XFxbXFxdOlwiOyc8Pj8sXFwvXS8pKSB7XG4gICAgICAgIGlucHV0VmFsdWUgPSB0aGlzLl9zdHJpcFRvRGVjaW1hbChpbnB1dFZhbHVlKTtcbiAgICAgICAgY29uc3QgcHJlY2lzaW9uOiBudW1iZXIgPSB0aGlzLmdldFByZWNpc2lvbihtYXNrRXhwcmVzc2lvbik7XG4gICAgICAgIGlucHV0VmFsdWUgPSB0aGlzLmNoZWNrSW5wdXRQcmVjaXNpb24oaW5wdXRWYWx1ZSwgcHJlY2lzaW9uLCAnLicpO1xuICAgICAgfVxuICAgICAgaWYgKGlucHV0VmFsdWUuaW5kZXhPZignLicpID4gMCAmJiAhdGhpcy5wZXJjZW50YWdlKGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUuaW5kZXhPZignLicpKSkpIHtcbiAgICAgICAgY29uc3QgYmFzZTogc3RyaW5nID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5pbmRleE9mKCcuJykgLSAxKTtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGAke2Jhc2V9JHtpbnB1dFZhbHVlLnN1YnN0cmluZyhpbnB1dFZhbHVlLmluZGV4T2YoJy4nKSwgaW5wdXRWYWx1ZS5sZW5ndGgpfWA7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wZXJjZW50YWdlKGlucHV0VmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdCA9IGlucHV0VmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobWFza0V4cHJlc3Npb24uc3RhcnRzV2l0aCgnc2VwYXJhdG9yJykpIHtcbiAgICAgIGlmIChcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgnW3fQsC3Rj9CQLdCvXScpIHx8XG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2goJ1vQgdGR0JAt0Y9dJykgfHxcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgnW2Etel18W0EtWl0nKSB8fFxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKC9bLUAjISQlXFxcXF4mKigpX8KjwqwnK3x+PWB7fVxcW1xcXTpcIjs8Pi4/XFwvXS8pIHx8XG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2goJ1teQS1aYS16MC05LF0nKVxuICAgICAgKSB7XG4gICAgICAgIGlucHV0VmFsdWUgPSB0aGlzLl9zdHJpcFRvRGVjaW1hbChpbnB1dFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXRWYWx1ZSA9XG4gICAgICAgIGlucHV0VmFsdWUubGVuZ3RoID4gMSAmJiBpbnB1dFZhbHVlWzBdID09PSAnMCcgJiYgaW5wdXRWYWx1ZVsxXSAhPT0gdGhpcy5kZWNpbWFsTWFya2VyXG4gICAgICAgICAgPyBpbnB1dFZhbHVlLnNsaWNlKDEsIGlucHV0VmFsdWUubGVuZ3RoKVxuICAgICAgICAgIDogaW5wdXRWYWx1ZTtcblxuICAgICAgLy8gVE9ETzogd2UgaGFkIGRpZmZlcmVudCByZXhleHBzIGhlcmUgZm9yIHRoZSBkaWZmZXJlbnQgY2FzZXMuLi4gYnV0IHRlc3RzIGRvbnQgc2VhbSB0byBib3RoZXIgLSBjaGVjayB0aGlzXG4gICAgICAvLyAgc2VwYXJhdG9yOiBubyBDT01NQSwgZG90LXNlcDogbm8gU1BBQ0UsIENPTU1BIE9LLCBjb21tYS1zZXA6IG5vIFNQQUNFLCBDT01NQSBPS1xuXG4gICAgICBjb25zdCB0aG91c2FuZFNlcGVyYXRvckNoYXJFc2NhcGVkOiBzdHJpbmcgPSB0aGlzLl9jaGFyVG9SZWdFeHBFeHByZXNzaW9uKHRoaXMudGhvdXNhbmRTZXBhcmF0b3IpO1xuICAgICAgY29uc3QgZGVjaW1hbE1hcmtlckVzY2FwZWQ6IHN0cmluZyA9IHRoaXMuX2NoYXJUb1JlZ0V4cEV4cHJlc3Npb24odGhpcy5kZWNpbWFsTWFya2VyKTtcbiAgICAgIGNvbnN0IGludmFsaWRDaGFyczogc3RyaW5nID0gJ0AjISQlXiYqKClfK3x+PWB7fVxcXFxbXFxcXF06XFxcXHMsXCI7PD4/XFxcXC8nXG4gICAgICAgIC5yZXBsYWNlKHRob3VzYW5kU2VwZXJhdG9yQ2hhckVzY2FwZWQsICcnKVxuICAgICAgICAucmVwbGFjZShkZWNpbWFsTWFya2VyRXNjYXBlZCwgJycpO1xuXG4gICAgICBjb25zdCBpbnZhbGlkQ2hhclJlZ2V4cDogUmVnRXhwID0gbmV3IFJlZ0V4cCgnWycgKyBpbnZhbGlkQ2hhcnMgKyAnXScpO1xuXG4gICAgICBpZiAoaW5wdXRWYWx1ZS5tYXRjaChpbnZhbGlkQ2hhclJlZ2V4cCkpIHtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5nZXRQcmVjaXNpb24obWFza0V4cHJlc3Npb24pO1xuICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuY2hlY2tJbnB1dFByZWNpc2lvbihpbnB1dFZhbHVlLCBwcmVjaXNpb24sIHRoaXMuZGVjaW1hbE1hcmtlcik7XG4gICAgICBjb25zdCBzdHJGb3JTZXA6IHN0cmluZyA9IGlucHV0VmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKHRob3VzYW5kU2VwZXJhdG9yQ2hhckVzY2FwZWQsICdnJyksICcnKTtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2Zvcm1hdFdpdGhTZXBhcmF0b3JzKHN0ckZvclNlcCwgdGhpcy50aG91c2FuZFNlcGFyYXRvciwgdGhpcy5kZWNpbWFsTWFya2VyLCBwcmVjaXNpb24pO1xuXG4gICAgICBjb25zdCBjb21tYVNoaWZ0OiBudW1iZXIgPSByZXN1bHQuaW5kZXhPZignLCcpIC0gaW5wdXRWYWx1ZS5pbmRleE9mKCcsJyk7XG4gICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IHJlc3VsdC5sZW5ndGggLSBpbnB1dFZhbHVlLmxlbmd0aDtcblxuICAgICAgaWYgKHNoaWZ0U3RlcCA+IDAgJiYgcmVzdWx0W3Bvc2l0aW9uXSAhPT0gJywnKSB7XG4gICAgICAgIGJhY2tzcGFjZVNoaWZ0ID0gdHJ1ZTtcbiAgICAgICAgbGV0IF9zaGlmdCA9IDA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQocG9zaXRpb24gKyBfc2hpZnQpO1xuICAgICAgICAgIF9zaGlmdCsrO1xuICAgICAgICB9IHdoaWxlIChfc2hpZnQgPCBzaGlmdFN0ZXApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKGNvbW1hU2hpZnQgIT09IDAgJiYgcG9zaXRpb24gPiAwICYmICEocmVzdWx0LmluZGV4T2YoJywnKSA+PSBwb3NpdGlvbiAmJiBwb3NpdGlvbiA+IDMpKSB8fFxuICAgICAgICAoIShyZXN1bHQuaW5kZXhPZignLicpID49IHBvc2l0aW9uICYmIHBvc2l0aW9uID4gMykgJiYgc2hpZnRTdGVwIDw9IDApXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fc2hpZnQuY2xlYXIoKTtcbiAgICAgICAgYmFja3NwYWNlU2hpZnQgPSB0cnVlO1xuICAgICAgICBzaGlmdCA9IHNoaWZ0U3RlcDtcbiAgICAgICAgcG9zaXRpb24gKz0gc2hpZnRTdGVwO1xuICAgICAgICB0aGlzLl9zaGlmdC5hZGQocG9zaXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2hpZnQuY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGxldCBpOiBudW1iZXIgPSAwLCBpbnB1dFN5bWJvbDogc3RyaW5nID0gaW5wdXRBcnJheVswXTtcbiAgICAgICAgaSA8IGlucHV0QXJyYXkubGVuZ3RoO1xuICAgICAgICBpKysgLCBpbnB1dFN5bWJvbCA9IGlucHV0QXJyYXlbaV1cbiAgICAgICkge1xuICAgICAgICBpZiAoY3Vyc29yID09PSBtYXNrRXhwcmVzc2lvbi5sZW5ndGgpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3JdKSAmJiBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJz8nKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgIGN1cnNvciArPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdID09PSAnKicgJiZcbiAgICAgICAgICBtdWx0aSAmJlxuICAgICAgICAgIHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pXG4gICAgICAgICkge1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBjdXJzb3IgKz0gMztcbiAgICAgICAgICBtdWx0aSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yXSkgJiYgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJykge1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBtdWx0aSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/JyAmJlxuICAgICAgICAgIHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pXG4gICAgICAgICkge1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBjdXJzb3IgKz0gMztcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pIHx8XG4gICAgICAgICAgKHRoaXMuaGlkZGVuSW5wdXQgJiZcbiAgICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dICYmXG4gICAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXS5zeW1ib2wgPT09IGlucHV0U3ltYm9sKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ0gnKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDIpIHtcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAnaCcpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09ICcyJyAmJiBOdW1iZXIoaW5wdXRTeW1ib2wpID4gMykge1xuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdtJykge1xuICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFN5bWJvbCkgPiA1KSB7XG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ3MnKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDUpIHtcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRheXNDb3VudCA9IDMxO1xuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAnZCcpIHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IsIGN1cnNvciArIDIpKSA+IGRheXNDb3VudCB8fCBpbnB1dFZhbHVlW2N1cnNvciArIDFdID09PSAnLycpIHtcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAnTScpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoc0NvdW50ID0gMTI7XG4gICAgICAgICAgICAvLyBtYXNrIHdpdGhvdXQgZGF5XG4gICAgICAgICAgICBjb25zdCB3aXRob3V0RGF5czogYm9vbGVhbiA9XG4gICAgICAgICAgICAgIGN1cnNvciA9PT0gMCAmJlxuICAgICAgICAgICAgICAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDIgfHxcbiAgICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IsIGN1cnNvciArIDIpKSA+IG1vbnRoc0NvdW50IHx8XG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3IgKyAxXSA9PT0gJy8nKTtcbiAgICAgICAgICAgIC8vIGRheTwxMCAmJiBtb250aDwxMiBmb3IgaW5wdXRcbiAgICAgICAgICAgIGNvbnN0IGRheTFtb250aElucHV0OiBib29sZWFuID1cbiAgICAgICAgICAgICAgaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKS5pbmNsdWRlcygnLycpICYmXG4gICAgICAgICAgICAgICgoaW5wdXRWYWx1ZVtjdXJzb3IgLSAyXSA9PT0gJy8nICYmXG4gICAgICAgICAgICAgICAgKE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDEsIGN1cnNvciArIDEpKSA+IG1vbnRoc0NvdW50ICYmIGlucHV0VmFsdWVbY3Vyc29yXSAhPT0gJy8nKSkgfHxcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlW2N1cnNvcl0gPT09ICcvJyB8fFxuICAgICAgICAgICAgICAgICgoaW5wdXRWYWx1ZVtjdXJzb3IgLSAzXSA9PT0gJy8nICYmXG4gICAgICAgICAgICAgICAgICAoTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMiwgY3Vyc29yKSkgPiBtb250aHNDb3VudCAmJiBpbnB1dFZhbHVlW2N1cnNvciAtIDFdICE9PSAnLycpKSB8fFxuICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3IgLSAxXSA9PT0gJy8nKSk7XG4gICAgICAgICAgICAvLyAxMDxkYXk8MzEgJiYgbW9udGg8MTIgZm9yIGlucHV0XG4gICAgICAgICAgICBjb25zdCBkYXkybW9udGhJbnB1dDogYm9vbGVhbiA9XG4gICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpKSA8PSBkYXlzQ291bnQgJiZcbiAgICAgICAgICAgICAgIWlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkuaW5jbHVkZXMoJy8nKSAmJlxuICAgICAgICAgICAgICBpbnB1dFZhbHVlW2N1cnNvciAtIDFdID09PSAnLycgJiZcbiAgICAgICAgICAgICAgKE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciwgY3Vyc29yICsgMikpID4gbW9udGhzQ291bnQgfHwgaW5wdXRWYWx1ZVtjdXJzb3IgKyAxXSA9PT0gJy8nKTtcbiAgICAgICAgICAgIC8vIGRheTwxMCAmJiBtb250aDwxMiBmb3IgcGFzdGUgd2hvbGUgZGF0YVxuICAgICAgICAgICAgY29uc3QgZGF5MW1vbnRoUGFzdGU6IGJvb2xlYW4gPVxuICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKSkgPiBkYXlzQ291bnQgJiZcbiAgICAgICAgICAgICAgIWlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkuaW5jbHVkZXMoJy8nKSAmJlxuICAgICAgICAgICAgICAoIWlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMiwgY3Vyc29yKS5pbmNsdWRlcygnLycpICYmXG4gICAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMiwgY3Vyc29yKSkgPiBtb250aHNDb3VudCk7XG4gICAgICAgICAgICAvLyAxMDxkYXk8MzEgJiYgbW9udGg8MTIgZm9yIHBhc3RlIHdob2xlIGRhdGFcbiAgICAgICAgICAgIGNvbnN0IGRheTJtb250aFBhc3RlOiBib29sZWFuID1cbiAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkpIDw9IGRheXNDb3VudCAmJlxuICAgICAgICAgICAgICAhaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKS5pbmNsdWRlcygnLycpICYmXG4gICAgICAgICAgICAgIGlucHV0VmFsdWVbY3Vyc29yIC0gMV0gIT09ICcvJyAmJlxuICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IgKyAxKSkgPiBtb250aHNDb3VudDtcblxuICAgICAgICAgICAgaWYgKHdpdGhvdXREYXlzIHx8IGRheTFtb250aElucHV0IHx8IGRheTJtb250aElucHV0IHx8IGRheTFtb250aFBhc3RlIHx8IGRheTJtb250aFBhc3RlKSB7XG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xuICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgY3Vyc29yKys7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihtYXNrRXhwcmVzc2lvbltjdXJzb3JdKSAhPT0gLTEpIHtcbiAgICAgICAgICByZXN1bHQgKz0gbWFza0V4cHJlc3Npb25bY3Vyc29yXTtcbiAgICAgICAgICBjdXJzb3IrKztcbiAgICAgICAgICBjb25zdCBzaGlmdFN0ZXA6IG51bWJlciA9IC9bKj9dL2cudGVzdChtYXNrRXhwcmVzc2lvbi5zbGljZSgwLCBjdXJzb3IpKSA/IGlucHV0QXJyYXkubGVuZ3RoIDogY3Vyc29yO1xuICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgaS0tO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmluZGV4T2YoaW5wdXRTeW1ib2wpID4gLTEgJiZcbiAgICAgICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrRXhwcmVzc2lvbltjdXJzb3JdXSAmJlxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dLm9wdGlvbmFsXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICghIWlucHV0QXJyYXlbY3Vyc29yXSAmJiBtYXNrRXhwcmVzc2lvbiAhPT0gJzA5OS4wOTkuMDk5LjA5OScpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBpbnB1dEFycmF5W2N1cnNvcl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnNvcisrO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdID09PSAnKicgJiZcbiAgICAgICAgICB0aGlzLl9maW5kU3BlY2lhbENoYXIodGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSkgJiZcbiAgICAgICAgICB0aGlzLl9maW5kU3BlY2lhbENoYXIoaW5wdXRTeW1ib2wpID09PSB0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdICYmXG4gICAgICAgICAgbXVsdGlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY3Vyc29yICs9IDM7XG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/JyAmJlxuICAgICAgICAgIHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcih0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdKSAmJlxuICAgICAgICAgIHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcihpbnB1dFN5bWJvbCkgPT09IHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0gJiZcbiAgICAgICAgICBtdWx0aVxuICAgICAgICApIHtcbiAgICAgICAgICBjdXJzb3IgKz0gMztcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG93TWFza1R5cGVkICYmIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmluZGV4T2YoaW5wdXRTeW1ib2wpIDwgMCAmJiBpbnB1dFN5bWJvbCAhPT0gdGhpcy5wbGFjZUhvbGRlckNoYXJhY3Rlcikge1xuICAgICAgICAgIHN0ZXBCYWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoXG4gICAgICByZXN1bHQubGVuZ3RoICsgMSA9PT0gbWFza0V4cHJlc3Npb24ubGVuZ3RoICYmXG4gICAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKG1hc2tFeHByZXNzaW9uW21hc2tFeHByZXNzaW9uLmxlbmd0aCAtIDFdKSAhPT0gLTFcbiAgICApIHtcbiAgICAgIHJlc3VsdCArPSBtYXNrRXhwcmVzc2lvblttYXNrRXhwcmVzc2lvbi5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBsZXQgbmV3UG9zaXRpb246IG51bWJlciA9IHBvc2l0aW9uICsgMTtcblxuICAgIHdoaWxlICh0aGlzLl9zaGlmdC5oYXMobmV3UG9zaXRpb24pKSB7XG4gICAgICBzaGlmdCsrO1xuICAgICAgbmV3UG9zaXRpb24rKztcbiAgICB9XG5cbiAgICBsZXQgYWN0dWFsU2hpZnQ6IG51bWJlciA9IHRoaXMuX3NoaWZ0Lmhhcyhwb3NpdGlvbikgPyBzaGlmdCA6IDA7XG4gICAgaWYgKHN0ZXBCYWNrKSB7XG4gICAgICBhY3R1YWxTaGlmdC0tO1xuICAgIH1cblxuICAgIGNiKGFjdHVhbFNoaWZ0LCBiYWNrc3BhY2VTaGlmdCk7XG4gICAgaWYgKHNoaWZ0IDwgMCkge1xuICAgICAgdGhpcy5fc2hpZnQuY2xlYXIoKTtcbiAgICB9XG4gICAgbGV0IHJlcyA9IGAke3RoaXMucHJlZml4fSR7cmVzdWx0fSR7dGhpcy5zdWZmaXh9YDtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVzID0gYCR7dGhpcy5wcmVmaXh9JHtyZXN1bHR9YDtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBwdWJsaWMgX2ZpbmRTcGVjaWFsQ2hhcihpbnB1dFN5bWJvbDogc3RyaW5nKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuZmluZCgodmFsOiBzdHJpbmcpID0+IHZhbCA9PT0gaW5wdXRTeW1ib2wpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2w6IHN0cmluZywgbWFza1N5bWJvbDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSB0aGlzLmN1c3RvbVBhdHRlcm4gPyB0aGlzLmN1c3RvbVBhdHRlcm4gOiB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucztcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza1N5bWJvbF0gJiZcbiAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tTeW1ib2xdLnBhdHRlcm4gJiZcbiAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tTeW1ib2xdLnBhdHRlcm4udGVzdChpbnB1dFN5bWJvbClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybWF0V2l0aFNlcGFyYXRvcnMgPSAoXG4gICAgc3RyOiBzdHJpbmcsXG4gICAgdGhvdXNhbmRTZXBhcmF0b3JDaGFyOiBzdHJpbmcsXG4gICAgZGVjaW1hbENoYXI6IHN0cmluZyxcbiAgICBwcmVjaXNpb246IG51bWJlclxuICApID0+IHtcbiAgICBjb25zdCB4OiBzdHJpbmdbXSA9IHN0ci5zcGxpdChkZWNpbWFsQ2hhcik7XG4gICAgY29uc3QgZGVjaW1hbHM6IHN0cmluZyA9IHgubGVuZ3RoID4gMSA/IGAke2RlY2ltYWxDaGFyfSR7eFsxXX1gIDogJyc7XG4gICAgbGV0IHJlczogc3RyaW5nID0geFswXTtcbiAgICBjb25zdCBzZXBhcmF0b3JMaW1pdDogc3RyaW5nID0gdGhpcy5zZXBhcmF0b3JMaW1pdC5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIGlmIChzZXBhcmF0b3JMaW1pdCAmJiArc2VwYXJhdG9yTGltaXQpIHtcbiAgICAgIGlmIChyZXNbMF0gPT09ICctJykge1xuICAgICAgICAgIHJlcyA9IGAtJHtyZXMuc2xpY2UoMSwgcmVzLmxlbmd0aCkuc2xpY2UoMCwgc2VwYXJhdG9yTGltaXQubGVuZ3RoKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSByZXMuc2xpY2UoMCwgc2VwYXJhdG9yTGltaXQubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgcmd4OiBSZWdFeHAgPSAvKFxcZCspKFxcZHszfSkvO1xuICAgIHdoaWxlIChyZ3gudGVzdChyZXMpKSB7XG4gICAgICByZXMgPSByZXMucmVwbGFjZShyZ3gsICckMScgKyB0aG91c2FuZFNlcGFyYXRvckNoYXIgKyAnJDInKTtcbiAgICB9XG4gICAgaWYgKHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzICsgZGVjaW1hbHM7XG4gICAgfSBlbHNlIGlmIChwcmVjaXNpb24gPT09IDApIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIHJldHVybiByZXMgKyBkZWNpbWFscy5zdWJzdHIoMCwgcHJlY2lzaW9uICsgMSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBwZXJjZW50YWdlID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIE51bWJlcihzdHIpID49IDAgJiYgTnVtYmVyKHN0cikgPD0gMTAwO1xuICB9O1xuXG4gIHByaXZhdGUgZ2V0UHJlY2lzaW9uID0gKG1hc2tFeHByZXNzaW9uOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHg6IHN0cmluZ1tdID0gbWFza0V4cHJlc3Npb24uc3BsaXQoJy4nKTtcbiAgICBpZiAoeC5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gTnVtYmVyKHhbeC5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEluZmluaXR5O1xuICB9O1xuXG4gIHByaXZhdGUgY2hlY2tJbnB1dFByZWNpc2lvbiA9IChcbiAgICBpbnB1dFZhbHVlOiBzdHJpbmcsXG4gICAgcHJlY2lzaW9uOiBudW1iZXIsXG4gICAgZGVjaW1hbE1hcmtlcjogSUNvbmZpZ1snZGVjaW1hbE1hcmtlciddXG4gICk6IHN0cmluZyA9PiB7XG4gICAgaWYgKHByZWNpc2lvbiA8IEluZmluaXR5KSB7XG4gICAgICBjb25zdCBwcmVjaXNpb25SZWdFeDogUmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLl9jaGFyVG9SZWdFeHBFeHByZXNzaW9uKGRlY2ltYWxNYXJrZXIpICsgYFxcXFxkeyR7cHJlY2lzaW9ufX0uKiRgKTtcblxuICAgICAgY29uc3QgcHJlY2lzaW9uTWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXkgfCBudWxsID0gaW5wdXRWYWx1ZS5tYXRjaChwcmVjaXNpb25SZWdFeCk7XG4gICAgICBpZiAocHJlY2lzaW9uTWF0Y2ggJiYgcHJlY2lzaW9uTWF0Y2hbMF0ubGVuZ3RoIC0gMSA+IHByZWNpc2lvbikge1xuICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgIH0gZWxzZSBpZiAocHJlY2lzaW9uID09PSAwICYmIGlucHV0VmFsdWUuZW5kc1dpdGgoZGVjaW1hbE1hcmtlcikpIHtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnB1dFZhbHVlO1xuICB9O1xuXG4gIHByaXZhdGUgX3N0cmlwVG9EZWNpbWFsKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAuc3BsaXQoJycpXG4gICAgICAuZmlsdGVyKChpOiBzdHJpbmcsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBpLm1hdGNoKCdeLT9cXFxcZCcpIHx8IGkgPT09ICcuJyB8fCBpID09PSAnLCcgfHwgKGkgPT09ICctJyAmJiBpZHggPT09IDApO1xuICAgICAgfSlcbiAgICAgIC5qb2luKCcnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoYXJUb1JlZ0V4cEV4cHJlc3Npb24oY2hhcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjaGFyc1RvRXNjYXBlID0gJ1tcXFxcXiQufD8qKygpJztcbiAgICByZXR1cm4gY2hhciA9PT0gJyAnID8gJ1xcXFxzJyA6IGNoYXJzVG9Fc2NhcGUuaW5kZXhPZihjaGFyKSA+PSAwID8gJ1xcXFwnICsgY2hhciA6IGNoYXI7XG4gIH1cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1maWxlLWxpbmUtY291bnRcbn1cbiJdfQ==
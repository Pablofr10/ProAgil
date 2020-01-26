/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { config } from './config';
export class MaskApplierService {
    /**
     * @param {?} _config
     */
    constructor(_config) {
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
        (str, thousandSeparatorChar, decimalChar, precision) => {
            /** @type {?} */
            const x = str.split(decimalChar);
            /** @type {?} */
            const decimals = x.length > 1 ? `${decimalChar}${x[1]}` : '';
            /** @type {?} */
            let res = x[0];
            /** @type {?} */
            const separatorLimit = this.separatorLimit.replace(/\s/g, '');
            if (separatorLimit && +separatorLimit) {
                if (res[0] === '-') {
                    res = `-${res.slice(1, res.length).slice(0, separatorLimit.length)}`;
                }
                else {
                    res = res.slice(0, separatorLimit.length);
                }
            }
            /** @type {?} */
            const rgx = /(\d+)(\d{3})/;
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
        (str) => {
            return Number(str) >= 0 && Number(str) <= 100;
        });
        this.getPrecision = (/**
         * @param {?} maskExpression
         * @return {?}
         */
        (maskExpression) => {
            /** @type {?} */
            const x = maskExpression.split('.');
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
        (inputValue, precision, decimalMarker) => {
            if (precision < Infinity) {
                /** @type {?} */
                const precisionRegEx = new RegExp(this._charToRegExpExpression(decimalMarker) + `\\d{${precision}}.*$`);
                /** @type {?} */
                const precisionMatch = inputValue.match(precisionRegEx);
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
    applyMaskWithPattern(inputValue, maskAndPattern) {
        const [mask, customPattern] = maskAndPattern;
        this.customPattern = customPattern;
        return this.applyMask(inputValue, mask);
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    applyMask(inputValue, maskExpression, position = 0, cb = (/**
     * @return {?}
     */
    () => { })) {
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        /** @type {?} */
        let cursor = 0;
        /** @type {?} */
        let result = '';
        /** @type {?} */
        let multi = false;
        /** @type {?} */
        let backspaceShift = false;
        /** @type {?} */
        let shift = 1;
        /** @type {?} */
        let stepBack = false;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        if (!!this.suffix && inputValue.endsWith(this.suffix)) {
            inputValue = inputValue.slice(0, inputValue.length - this.suffix.length);
        }
        /** @type {?} */
        const inputArray = inputValue.toString().split('');
        if (maskExpression === 'IP') {
            this.ipError = !!(inputArray.filter((/**
             * @param {?} i
             * @return {?}
             */
            (i) => i === '.')).length < 3 && inputArray.length < 7);
            maskExpression = '099.099.099.099';
        }
        if (maskExpression.startsWith('percent')) {
            if (inputValue.match('[a-z]|[A-Z]') || inputValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)) {
                inputValue = this._stripToDecimal(inputValue);
                /** @type {?} */
                const precision = this.getPrecision(maskExpression);
                inputValue = this.checkInputPrecision(inputValue, precision, '.');
            }
            if (inputValue.indexOf('.') > 0 && !this.percentage(inputValue.substring(0, inputValue.indexOf('.')))) {
                /** @type {?} */
                const base = inputValue.substring(0, inputValue.indexOf('.') - 1);
                inputValue = `${base}${inputValue.substring(inputValue.indexOf('.'), inputValue.length)}`;
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
            const thousandSeperatorCharEscaped = this._charToRegExpExpression(this.thousandSeparator);
            /** @type {?} */
            const decimalMarkerEscaped = this._charToRegExpExpression(this.decimalMarker);
            /** @type {?} */
            const invalidChars = '@#!$%^&*()_+|~=`{}\\[\\]:\\s,";<>?\\/'
                .replace(thousandSeperatorCharEscaped, '')
                .replace(decimalMarkerEscaped, '');
            /** @type {?} */
            const invalidCharRegexp = new RegExp('[' + invalidChars + ']');
            if (inputValue.match(invalidCharRegexp)) {
                inputValue = inputValue.substring(0, inputValue.length - 1);
            }
            /** @type {?} */
            const precision = this.getPrecision(maskExpression);
            inputValue = this.checkInputPrecision(inputValue, precision, this.decimalMarker);
            /** @type {?} */
            const strForSep = inputValue.replace(new RegExp(thousandSeperatorCharEscaped, 'g'), '');
            result = this._formatWithSeparators(strForSep, this.thousandSeparator, this.decimalMarker, precision);
            /** @type {?} */
            const commaShift = result.indexOf(',') - inputValue.indexOf(',');
            /** @type {?} */
            const shiftStep = result.length - inputValue.length;
            if (shiftStep > 0 && result[position] !== ',') {
                backspaceShift = true;
                /** @type {?} */
                let _shift = 0;
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
            let i = 0, inputSymbol = inputArray[0]; i < inputArray.length; i++, inputSymbol = inputArray[i]) {
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
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
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
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 's') {
                        if (Number(inputSymbol) > 5) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    /** @type {?} */
                    const daysCount = 31;
                    if (maskExpression[cursor] === 'd') {
                        if (Number(inputValue.slice(cursor, cursor + 2)) > daysCount || inputValue[cursor + 1] === '/') {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
                            this._shift.add(shiftStep + this.prefix.length || 0);
                            i--;
                            continue;
                        }
                    }
                    if (maskExpression[cursor] === 'M') {
                        /** @type {?} */
                        const monthsCount = 12;
                        // mask without day
                        /** @type {?} */
                        const withoutDays = cursor === 0 &&
                            (Number(inputSymbol) > 2 ||
                                Number(inputValue.slice(cursor, cursor + 2)) > monthsCount ||
                                inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for input
                        /** @type {?} */
                        const day1monthInput = inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            ((inputValue[cursor - 2] === '/' &&
                                (Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount && inputValue[cursor] !== '/')) ||
                                inputValue[cursor] === '/' ||
                                ((inputValue[cursor - 3] === '/' &&
                                    (Number(inputValue.slice(cursor - 2, cursor)) > monthsCount && inputValue[cursor - 1] !== '/')) ||
                                    inputValue[cursor - 1] === '/'));
                        // 10<day<31 && month<12 for input
                        /** @type {?} */
                        const day2monthInput = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] === '/' &&
                            (Number(inputValue.slice(cursor, cursor + 2)) > monthsCount || inputValue[cursor + 1] === '/');
                        // day<10 && month<12 for paste whole data
                        /** @type {?} */
                        const day1monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) > daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            (!inputValue.slice(cursor - 2, cursor).includes('/') &&
                                Number(inputValue.slice(cursor - 2, cursor)) > monthsCount);
                        // 10<day<31 && month<12 for paste whole data
                        /** @type {?} */
                        const day2monthPaste = Number(inputValue.slice(cursor - 3, cursor - 1)) <= daysCount &&
                            !inputValue.slice(cursor - 3, cursor - 1).includes('/') &&
                            inputValue[cursor - 1] !== '/' &&
                            Number(inputValue.slice(cursor - 1, cursor + 1)) > monthsCount;
                        if (withoutDays || day1monthInput || day2monthInput || day1monthPaste || day2monthPaste) {
                            cursor += 1;
                            /** @type {?} */
                            const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
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
                    const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputArray.length : cursor;
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
        let newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        /** @type {?} */
        let actualShift = this._shift.has(position) ? shift : 0;
        if (stepBack) {
            actualShift--;
        }
        cb(actualShift, backspaceShift);
        if (shift < 0) {
            this._shift.clear();
        }
        /** @type {?} */
        let res = `${this.prefix}${result}${this.suffix}`;
        if (result.length === 0) {
            res = `${this.prefix}${result}`;
        }
        return res;
    }
    /**
     * @param {?} inputSymbol
     * @return {?}
     */
    _findSpecialChar(inputSymbol) {
        return this.maskSpecialCharacters.find((/**
         * @param {?} val
         * @return {?}
         */
        (val) => val === inputSymbol));
    }
    /**
     * @protected
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    _checkSymbolMask(inputSymbol, maskSymbol) {
        this.maskAvailablePatterns = this.customPattern ? this.customPattern : this.maskAvailablePatterns;
        return (this.maskAvailablePatterns[maskSymbol] &&
            this.maskAvailablePatterns[maskSymbol].pattern &&
            this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    _stripToDecimal(str) {
        return str
            .split('')
            .filter((/**
         * @param {?} i
         * @param {?} idx
         * @return {?}
         */
        (i, idx) => {
            return i.match('^-?\\d') || i === '.' || i === ',' || (i === '-' && idx === 0);
        }))
            .join('');
    }
    /**
     * @private
     * @param {?} char
     * @return {?}
     */
    _charToRegExpExpression(char) {
        /** @type {?} */
        const charsToEscape = '[\\^$.|?*+()';
        return char === ' ' ? '\\s' : charsToEscape.indexOf(char) >= 0 ? '\\' + char : char;
    }
}
MaskApplierService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MaskApplierService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [config,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1hcHBsaWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFzay8iLCJzb3VyY2VzIjpbImxpYi9tYXNrLWFwcGxpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLE1BQU0sRUFBVyxNQUFNLFVBQVUsQ0FBQztBQUczQyxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBdUI3QixZQUE2QyxPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBbEJ0RCxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6Qix3QkFBbUIsR0FBVyxFQUFFLENBQUM7UUFpVmhDLDBCQUFxQjs7Ozs7OztRQUFHLENBQzlCLEdBQVcsRUFDWCxxQkFBNkIsRUFDN0IsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsRUFBRTs7a0JBQ0ksQ0FBQyxHQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDOztrQkFDcEMsUUFBUSxHQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7Z0JBQ2hFLEdBQUcsR0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDaEIsY0FBYyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDckUsSUFBSSxjQUFjLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3JDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDaEIsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxD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QUM7OztZQWphRixVQUFVOzs7OzRDQXdCVyxNQUFNLFNBQUMsTUFBTTs7OztJQXRCakMsbURBQStEOztJQUMvRCx5Q0FBMkM7O0lBQzNDLDBDQUE4Qzs7SUFDOUMsNkNBQW9EOztJQUNwRCw0Q0FBbUM7O0lBQ25DLHlDQUFnQzs7SUFDaEMsaURBQXdDOztJQUN4QyxtREFBNEQ7O0lBQzVELG1EQUFtRDs7SUFDbkQsb0NBQWtDOztJQUNsQyxvQ0FBa0M7O0lBQ2xDLCtDQUF3RDs7SUFDeEQsMkNBQWdEOztJQUNoRCwyQ0FBMkM7O0lBQzNDLHFDQUF5Qjs7SUFDekIsMkNBQWdEOztJQUNoRCxrREFBOEQ7O0lBQzlELHdDQUF5Qzs7SUFDekMsNENBQWlEOzs7OztJQUVqRCxvQ0FBNkI7Ozs7O0lBbVU3QixtREEyQkU7Ozs7O0lBRUYsd0NBRUU7Ozs7O0lBRUYsMENBT0U7Ozs7O0lBRUYsaURBZ0JFOzs7OztJQTNYaUIscUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hc2tBcHBsaWVyU2VydmljZSB7XG4gIHB1YmxpYyBkcm9wU3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ2Ryb3BTcGVjaWFsQ2hhcmFjdGVycyddO1xuICBwdWJsaWMgaGlkZGVuSW5wdXQ6IElDb25maWdbJ2hpZGRlbklucHV0J107XG4gIHB1YmxpYyBzaG93VGVtcGxhdGUhOiBJQ29uZmlnWydzaG93VGVtcGxhdGUnXTtcbiAgcHVibGljIGNsZWFySWZOb3RNYXRjaCE6IElDb25maWdbJ2NsZWFySWZOb3RNYXRjaCddO1xuICBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgYWN0dWFsVmFsdWU6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgc2hvd25NYXNrRXhwcmVzc2lvbjogc3RyaW5nID0gJyc7XG4gIHB1YmxpYyBtYXNrU3BlY2lhbENoYXJhY3RlcnMhOiBJQ29uZmlnWydzcGVjaWFsQ2hhcmFjdGVycyddO1xuICBwdWJsaWMgbWFza0F2YWlsYWJsZVBhdHRlcm5zITogSUNvbmZpZ1sncGF0dGVybnMnXTtcbiAgcHVibGljIHByZWZpeCE6IElDb25maWdbJ3ByZWZpeCddO1xuICBwdWJsaWMgc3VmZml4ITogSUNvbmZpZ1snc3VmZml4J107XG4gIHB1YmxpYyB0aG91c2FuZFNlcGFyYXRvciE6IElDb25maWdbJ3Rob3VzYW5kU2VwYXJhdG9yJ107XG4gIHB1YmxpYyBkZWNpbWFsTWFya2VyITogSUNvbmZpZ1snZGVjaW1hbE1hcmtlciddO1xuICBwdWJsaWMgY3VzdG9tUGF0dGVybiE6IElDb25maWdbJ3BhdHRlcm5zJ107XG4gIHB1YmxpYyBpcEVycm9yPzogYm9vbGVhbjtcbiAgcHVibGljIHNob3dNYXNrVHlwZWQhOiBJQ29uZmlnWydzaG93TWFza1R5cGVkJ107XG4gIHB1YmxpYyBwbGFjZUhvbGRlckNoYXJhY3RlciE6IElDb25maWdbJ3BsYWNlSG9sZGVyQ2hhcmFjdGVyJ107XG4gIHB1YmxpYyB2YWxpZGF0aW9uOiBJQ29uZmlnWyd2YWxpZGF0aW9uJ107XG4gIHB1YmxpYyBzZXBhcmF0b3JMaW1pdDogSUNvbmZpZ1snc2VwYXJhdG9yTGltaXQnXTtcblxuICBwcml2YXRlIF9zaGlmdCE6IFNldDxudW1iZXI+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihASW5qZWN0KGNvbmZpZykgcHJvdGVjdGVkIF9jb25maWc6IElDb25maWcpIHtcbiAgICB0aGlzLl9zaGlmdCA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmNsZWFySWZOb3RNYXRjaCA9IHRoaXMuX2NvbmZpZy5jbGVhcklmTm90TWF0Y2g7XG4gICAgdGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLl9jb25maWcuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzO1xuICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdGhpcy5fY29uZmlnLnNwZWNpYWxDaGFyYWN0ZXJzO1xuICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gdGhpcy5fY29uZmlnLnBhdHRlcm5zO1xuICAgIHRoaXMucHJlZml4ID0gdGhpcy5fY29uZmlnLnByZWZpeDtcbiAgICB0aGlzLnN1ZmZpeCA9IHRoaXMuX2NvbmZpZy5zdWZmaXg7XG4gICAgdGhpcy50aG91c2FuZFNlcGFyYXRvciA9IHRoaXMuX2NvbmZpZy50aG91c2FuZFNlcGFyYXRvcjtcbiAgICB0aGlzLmRlY2ltYWxNYXJrZXIgPSB0aGlzLl9jb25maWcuZGVjaW1hbE1hcmtlcjtcbiAgICB0aGlzLmhpZGRlbklucHV0ID0gdGhpcy5fY29uZmlnLmhpZGRlbklucHV0O1xuICAgIHRoaXMuc2hvd01hc2tUeXBlZCA9IHRoaXMuX2NvbmZpZy5zaG93TWFza1R5cGVkO1xuICAgIHRoaXMucGxhY2VIb2xkZXJDaGFyYWN0ZXIgPSB0aGlzLl9jb25maWcucGxhY2VIb2xkZXJDaGFyYWN0ZXI7XG4gICAgdGhpcy52YWxpZGF0aW9uID0gdGhpcy5fY29uZmlnLnZhbGlkYXRpb247XG4gICAgdGhpcy5zZXBhcmF0b3JMaW1pdCA9IHRoaXMuX2NvbmZpZy5zZXBhcmF0b3JMaW1pdDtcbiAgfVxuXG4gIHB1YmxpYyBhcHBseU1hc2tXaXRoUGF0dGVybihpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tBbmRQYXR0ZXJuOiBbc3RyaW5nLCBJQ29uZmlnWydwYXR0ZXJucyddXSk6IHN0cmluZyB7XG4gICAgY29uc3QgW21hc2ssIGN1c3RvbVBhdHRlcm5dID0gbWFza0FuZFBhdHRlcm47XG4gICAgdGhpcy5jdXN0b21QYXR0ZXJuID0gY3VzdG9tUGF0dGVybjtcbiAgICByZXR1cm4gdGhpcy5hcHBseU1hc2soaW5wdXRWYWx1ZSwgbWFzayk7XG4gIH1cbiAgcHVibGljIGFwcGx5TWFzayhpbnB1dFZhbHVlOiBzdHJpbmcsIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwLCBjYjogRnVuY3Rpb24gPSAoKSA9PiB7IH0pOiBzdHJpbmcge1xuICAgIGlmIChpbnB1dFZhbHVlID09PSB1bmRlZmluZWQgfHwgaW5wdXRWYWx1ZSA9PT0gbnVsbCB8fCBtYXNrRXhwcmVzc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGxldCBjdXJzb3IgPSAwO1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBsZXQgbXVsdGkgPSBmYWxzZTtcbiAgICBsZXQgYmFja3NwYWNlU2hpZnQgPSBmYWxzZTtcbiAgICBsZXQgc2hpZnQgPSAxO1xuICAgIGxldCBzdGVwQmFjayA9IGZhbHNlO1xuICAgIGlmIChpbnB1dFZhbHVlLnNsaWNlKDAsIHRoaXMucHJlZml4Lmxlbmd0aCkgPT09IHRoaXMucHJlZml4KSB7XG4gICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zbGljZSh0aGlzLnByZWZpeC5sZW5ndGgsIGlucHV0VmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKCEhdGhpcy5zdWZmaXggJiYgaW5wdXRWYWx1ZS5lbmRzV2l0aCh0aGlzLnN1ZmZpeCkpIHtcbiAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnNsaWNlKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gdGhpcy5zdWZmaXgubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgaW5wdXRBcnJheTogc3RyaW5nW10gPSBpbnB1dFZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgIGlmIChtYXNrRXhwcmVzc2lvbiA9PT0gJ0lQJykge1xuICAgICAgdGhpcy5pcEVycm9yID0gISEoaW5wdXRBcnJheS5maWx0ZXIoKGk6IHN0cmluZykgPT4gaSA9PT0gJy4nKS5sZW5ndGggPCAzICYmIGlucHV0QXJyYXkubGVuZ3RoIDwgNyk7XG4gICAgICBtYXNrRXhwcmVzc2lvbiA9ICcwOTkuMDk5LjA5OS4wOTknO1xuICAgIH1cbiAgICBpZiAobWFza0V4cHJlc3Npb24uc3RhcnRzV2l0aCgncGVyY2VudCcpKSB7XG4gICAgICBpZiAoaW5wdXRWYWx1ZS5tYXRjaCgnW2Etel18W0EtWl0nKSB8fCBpbnB1dFZhbHVlLm1hdGNoKC9bLSEkJV4mKigpXyt8fj1ge31cXFtcXF06XCI7Jzw+PyxcXC9dLykpIHtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuX3N0cmlwVG9EZWNpbWFsKGlucHV0VmFsdWUpO1xuICAgICAgICBjb25zdCBwcmVjaXNpb246IG51bWJlciA9IHRoaXMuZ2V0UHJlY2lzaW9uKG1hc2tFeHByZXNzaW9uKTtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuY2hlY2tJbnB1dFByZWNpc2lvbihpbnB1dFZhbHVlLCBwcmVjaXNpb24sICcuJyk7XG4gICAgICB9XG4gICAgICBpZiAoaW5wdXRWYWx1ZS5pbmRleE9mKCcuJykgPiAwICYmICF0aGlzLnBlcmNlbnRhZ2UoaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5pbmRleE9mKCcuJykpKSkge1xuICAgICAgICBjb25zdCBiYXNlOiBzdHJpbmcgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmluZGV4T2YoJy4nKSAtIDEpO1xuICAgICAgICBpbnB1dFZhbHVlID0gYCR7YmFzZX0ke2lucHV0VmFsdWUuc3Vic3RyaW5nKGlucHV0VmFsdWUuaW5kZXhPZignLicpLCBpbnB1dFZhbHVlLmxlbmd0aCl9YDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBlcmNlbnRhZ2UoaW5wdXRWYWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0ID0gaW5wdXRWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGlucHV0VmFsdWUuc3Vic3RyaW5nKDAsIGlucHV0VmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtYXNrRXhwcmVzc2lvbi5zdGFydHNXaXRoKCdzZXBhcmF0b3InKSkge1xuICAgICAgaWYgKFxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKCdbd9CwLdGP0JAt0K9dJykgfHxcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgnW9CB0ZHQkC3Rj10nKSB8fFxuICAgICAgICBpbnB1dFZhbHVlLm1hdGNoKCdbYS16XXxbQS1aXScpIHx8XG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2goL1stQCMhJCVcXFxcXiYqKClfwqPCrCcrfH49YHt9XFxbXFxdOlwiOzw+Lj9cXC9dLykgfHxcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCgnW15BLVphLXowLTksXScpXG4gICAgICApIHtcbiAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuX3N0cmlwVG9EZWNpbWFsKGlucHV0VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dFZhbHVlID1cbiAgICAgICAgaW5wdXRWYWx1ZS5sZW5ndGggPiAxICYmIGlucHV0VmFsdWVbMF0gPT09ICcwJyAmJiBpbnB1dFZhbHVlWzFdICE9PSB0aGlzLmRlY2ltYWxNYXJrZXJcbiAgICAgICAgICA/IGlucHV0VmFsdWUuc2xpY2UoMSwgaW5wdXRWYWx1ZS5sZW5ndGgpXG4gICAgICAgICAgOiBpbnB1dFZhbHVlO1xuXG4gICAgICAvLyBUT0RPOiB3ZSBoYWQgZGlmZmVyZW50IHJleGV4cHMgaGVyZSBmb3IgdGhlIGRpZmZlcmVudCBjYXNlcy4uLiBidXQgdGVzdHMgZG9udCBzZWFtIHRvIGJvdGhlciAtIGNoZWNrIHRoaXNcbiAgICAgIC8vICBzZXBhcmF0b3I6IG5vIENPTU1BLCBkb3Qtc2VwOiBubyBTUEFDRSwgQ09NTUEgT0ssIGNvbW1hLXNlcDogbm8gU1BBQ0UsIENPTU1BIE9LXG5cbiAgICAgIGNvbnN0IHRob3VzYW5kU2VwZXJhdG9yQ2hhckVzY2FwZWQ6IHN0cmluZyA9IHRoaXMuX2NoYXJUb1JlZ0V4cEV4cHJlc3Npb24odGhpcy50aG91c2FuZFNlcGFyYXRvcik7XG4gICAgICBjb25zdCBkZWNpbWFsTWFya2VyRXNjYXBlZDogc3RyaW5nID0gdGhpcy5fY2hhclRvUmVnRXhwRXhwcmVzc2lvbih0aGlzLmRlY2ltYWxNYXJrZXIpO1xuICAgICAgY29uc3QgaW52YWxpZENoYXJzOiBzdHJpbmcgPSAnQCMhJCVeJiooKV8rfH49YHt9XFxcXFtcXFxcXTpcXFxccyxcIjs8Pj9cXFxcLydcbiAgICAgICAgLnJlcGxhY2UodGhvdXNhbmRTZXBlcmF0b3JDaGFyRXNjYXBlZCwgJycpXG4gICAgICAgIC5yZXBsYWNlKGRlY2ltYWxNYXJrZXJFc2NhcGVkLCAnJyk7XG5cbiAgICAgIGNvbnN0IGludmFsaWRDaGFyUmVnZXhwOiBSZWdFeHAgPSBuZXcgUmVnRXhwKCdbJyArIGludmFsaWRDaGFycyArICddJyk7XG5cbiAgICAgIGlmIChpbnB1dFZhbHVlLm1hdGNoKGludmFsaWRDaGFyUmVnZXhwKSkge1xuICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJlY2lzaW9uOiBudW1iZXIgPSB0aGlzLmdldFByZWNpc2lvbihtYXNrRXhwcmVzc2lvbik7XG4gICAgICBpbnB1dFZhbHVlID0gdGhpcy5jaGVja0lucHV0UHJlY2lzaW9uKGlucHV0VmFsdWUsIHByZWNpc2lvbiwgdGhpcy5kZWNpbWFsTWFya2VyKTtcbiAgICAgIGNvbnN0IHN0ckZvclNlcDogc3RyaW5nID0gaW5wdXRWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhvdXNhbmRTZXBlcmF0b3JDaGFyRXNjYXBlZCwgJ2cnKSwgJycpO1xuICAgICAgcmVzdWx0ID0gdGhpcy5fZm9ybWF0V2l0aFNlcGFyYXRvcnMoc3RyRm9yU2VwLCB0aGlzLnRob3VzYW5kU2VwYXJhdG9yLCB0aGlzLmRlY2ltYWxNYXJrZXIsIHByZWNpc2lvbik7XG5cbiAgICAgIGNvbnN0IGNvbW1hU2hpZnQ6IG51bWJlciA9IHJlc3VsdC5pbmRleE9mKCcsJykgLSBpbnB1dFZhbHVlLmluZGV4T2YoJywnKTtcbiAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gcmVzdWx0Lmxlbmd0aCAtIGlucHV0VmFsdWUubGVuZ3RoO1xuXG4gICAgICBpZiAoc2hpZnRTdGVwID4gMCAmJiByZXN1bHRbcG9zaXRpb25dICE9PSAnLCcpIHtcbiAgICAgICAgYmFja3NwYWNlU2hpZnQgPSB0cnVlO1xuICAgICAgICBsZXQgX3NoaWZ0ID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChwb3NpdGlvbiArIF9zaGlmdCk7XG4gICAgICAgICAgX3NoaWZ0Kys7XG4gICAgICAgIH0gd2hpbGUgKF9zaGlmdCA8IHNoaWZ0U3RlcCk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAoY29tbWFTaGlmdCAhPT0gMCAmJiBwb3NpdGlvbiA+IDAgJiYgIShyZXN1bHQuaW5kZXhPZignLCcpID49IHBvc2l0aW9uICYmIHBvc2l0aW9uID4gMykpIHx8XG4gICAgICAgICghKHJlc3VsdC5pbmRleE9mKCcuJykgPj0gcG9zaXRpb24gJiYgcG9zaXRpb24gPiAzKSAmJiBzaGlmdFN0ZXAgPD0gMClcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9zaGlmdC5jbGVhcigpO1xuICAgICAgICBiYWNrc3BhY2VTaGlmdCA9IHRydWU7XG4gICAgICAgIHNoaWZ0ID0gc2hpZnRTdGVwO1xuICAgICAgICBwb3NpdGlvbiArPSBzaGlmdFN0ZXA7XG4gICAgICAgIHRoaXMuX3NoaWZ0LmFkZChwb3NpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zaGlmdC5jbGVhcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IDAsIGlucHV0U3ltYm9sOiBzdHJpbmcgPSBpbnB1dEFycmF5WzBdO1xuICAgICAgICBpIDwgaW5wdXRBcnJheS5sZW5ndGg7XG4gICAgICAgIGkrKyAsIGlucHV0U3ltYm9sID0gaW5wdXRBcnJheVtpXVxuICAgICAgKSB7XG4gICAgICAgIGlmIChjdXJzb3IgPT09IG1hc2tFeHByZXNzaW9uLmxlbmd0aCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pICYmIG1hc2tFeHByZXNzaW9uW2N1cnNvciArIDFdID09PSAnPycpIHtcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgY3Vyc29yICs9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJyAmJlxuICAgICAgICAgIG11bHRpICYmXG4gICAgICAgICAgdGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgIGN1cnNvciArPSAzO1xuICAgICAgICAgIG11bHRpID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3JdKSAmJiBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJyonKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgIG11bHRpID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJz8nICYmXG4gICAgICAgICAgdGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgIGN1cnNvciArPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yXSkgfHxcbiAgICAgICAgICAodGhpcy5oaWRkZW5JbnB1dCAmJlxuICAgICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25bY3Vyc29yXV0gJiZcbiAgICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dLnN5bWJvbCA9PT0gaW5wdXRTeW1ib2wpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAnSCcpIHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gMikge1xuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdoJykge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJzInICYmIE51bWJlcihpbnB1dFN5bWJvbCkgPiAzKSB7XG4gICAgICAgICAgICAgIGN1cnNvciArPSAxO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yXSA9PT0gJ20nKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKGlucHV0U3ltYm9sKSA+IDUpIHtcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXNrRXhwcmVzc2lvbltjdXJzb3JdID09PSAncycpIHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gNSkge1xuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGF5c0NvdW50ID0gMzE7XG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdkJykge1xuICAgICAgICAgICAgaWYgKE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciwgY3Vyc29yICsgMikpID4gZGF5c0NvdW50IHx8IGlucHV0VmFsdWVbY3Vyc29yICsgMV0gPT09ICcvJykge1xuICAgICAgICAgICAgICBjdXJzb3IgKz0gMTtcbiAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvWyo/XS9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSkgPyBpbnB1dEFycmF5Lmxlbmd0aCA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0gPT09ICdNJykge1xuICAgICAgICAgICAgY29uc3QgbW9udGhzQ291bnQgPSAxMjtcbiAgICAgICAgICAgIC8vIG1hc2sgd2l0aG91dCBkYXlcbiAgICAgICAgICAgIGNvbnN0IHdpdGhvdXREYXlzOiBib29sZWFuID1cbiAgICAgICAgICAgICAgY3Vyc29yID09PSAwICYmXG4gICAgICAgICAgICAgIChOdW1iZXIoaW5wdXRTeW1ib2wpID4gMiB8fFxuICAgICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciwgY3Vyc29yICsgMikpID4gbW9udGhzQ291bnQgfHxcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlW2N1cnNvciArIDFdID09PSAnLycpO1xuICAgICAgICAgICAgLy8gZGF5PDEwICYmIG1vbnRoPDEyIGZvciBpbnB1dFxuICAgICAgICAgICAgY29uc3QgZGF5MW1vbnRoSW5wdXQ6IGJvb2xlYW4gPVxuICAgICAgICAgICAgICBpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpLmluY2x1ZGVzKCcvJykgJiZcbiAgICAgICAgICAgICAgKChpbnB1dFZhbHVlW2N1cnNvciAtIDJdID09PSAnLycgJiZcbiAgICAgICAgICAgICAgICAoTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMSwgY3Vyc29yICsgMSkpID4gbW9udGhzQ291bnQgJiYgaW5wdXRWYWx1ZVtjdXJzb3JdICE9PSAnLycpKSB8fFxuICAgICAgICAgICAgICAgIGlucHV0VmFsdWVbY3Vyc29yXSA9PT0gJy8nIHx8XG4gICAgICAgICAgICAgICAgKChpbnB1dFZhbHVlW2N1cnNvciAtIDNdID09PSAnLycgJiZcbiAgICAgICAgICAgICAgICAgIChOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAyLCBjdXJzb3IpKSA+IG1vbnRoc0NvdW50ICYmIGlucHV0VmFsdWVbY3Vyc29yIC0gMV0gIT09ICcvJykpIHx8XG4gICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlW2N1cnNvciAtIDFdID09PSAnLycpKTtcbiAgICAgICAgICAgIC8vIDEwPGRheTwzMSAmJiBtb250aDwxMiBmb3IgaW5wdXRcbiAgICAgICAgICAgIGNvbnN0IGRheTJtb250aElucHV0OiBib29sZWFuID1cbiAgICAgICAgICAgICAgTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yIC0gMywgY3Vyc29yIC0gMSkpIDw9IGRheXNDb3VudCAmJlxuICAgICAgICAgICAgICAhaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKS5pbmNsdWRlcygnLycpICYmXG4gICAgICAgICAgICAgIGlucHV0VmFsdWVbY3Vyc29yIC0gMV0gPT09ICcvJyAmJlxuICAgICAgICAgICAgICAoTnVtYmVyKGlucHV0VmFsdWUuc2xpY2UoY3Vyc29yLCBjdXJzb3IgKyAyKSkgPiBtb250aHNDb3VudCB8fCBpbnB1dFZhbHVlW2N1cnNvciArIDFdID09PSAnLycpO1xuICAgICAgICAgICAgLy8gZGF5PDEwICYmIG1vbnRoPDEyIGZvciBwYXN0ZSB3aG9sZSBkYXRhXG4gICAgICAgICAgICBjb25zdCBkYXkxbW9udGhQYXN0ZTogYm9vbGVhbiA9XG4gICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpKSA+IGRheXNDb3VudCAmJlxuICAgICAgICAgICAgICAhaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKS5pbmNsdWRlcygnLycpICYmXG4gICAgICAgICAgICAgICghaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAyLCBjdXJzb3IpLmluY2x1ZGVzKCcvJykgJiZcbiAgICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAyLCBjdXJzb3IpKSA+IG1vbnRoc0NvdW50KTtcbiAgICAgICAgICAgIC8vIDEwPGRheTwzMSAmJiBtb250aDwxMiBmb3IgcGFzdGUgd2hvbGUgZGF0YVxuICAgICAgICAgICAgY29uc3QgZGF5Mm1vbnRoUGFzdGU6IGJvb2xlYW4gPVxuICAgICAgICAgICAgICBOdW1iZXIoaW5wdXRWYWx1ZS5zbGljZShjdXJzb3IgLSAzLCBjdXJzb3IgLSAxKSkgPD0gZGF5c0NvdW50ICYmXG4gICAgICAgICAgICAgICFpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDMsIGN1cnNvciAtIDEpLmluY2x1ZGVzKCcvJykgJiZcbiAgICAgICAgICAgICAgaW5wdXRWYWx1ZVtjdXJzb3IgLSAxXSAhPT0gJy8nICYmXG4gICAgICAgICAgICAgIE51bWJlcihpbnB1dFZhbHVlLnNsaWNlKGN1cnNvciAtIDEsIGN1cnNvciArIDEpKSA+IG1vbnRoc0NvdW50O1xuXG4gICAgICAgICAgICBpZiAod2l0aG91dERheXMgfHwgZGF5MW1vbnRoSW5wdXQgfHwgZGF5Mm1vbnRoSW5wdXQgfHwgZGF5MW1vbnRoUGFzdGUgfHwgZGF5Mm1vbnRoUGFzdGUpIHtcbiAgICAgICAgICAgICAgY3Vyc29yICs9IDE7XG4gICAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XG4gICAgICAgICAgICAgIHRoaXMuX3NoaWZ0LmFkZChzaGlmdFN0ZXAgKyB0aGlzLnByZWZpeC5sZW5ndGggfHwgMCk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgICBjdXJzb3IrKztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5pbmRleE9mKG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pICE9PSAtMSkge1xuICAgICAgICAgIHJlc3VsdCArPSBtYXNrRXhwcmVzc2lvbltjdXJzb3JdO1xuICAgICAgICAgIGN1cnNvcisrO1xuICAgICAgICAgIGNvbnN0IHNoaWZ0U3RlcDogbnVtYmVyID0gL1sqP10vZy50ZXN0KG1hc2tFeHByZXNzaW9uLnNsaWNlKDAsIGN1cnNvcikpID8gaW5wdXRBcnJheS5sZW5ndGggOiBjdXJzb3I7XG4gICAgICAgICAgdGhpcy5fc2hpZnQuYWRkKHNoaWZ0U3RlcCArIHRoaXMucHJlZml4Lmxlbmd0aCB8fCAwKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihpbnB1dFN5bWJvbCkgPiAtMSAmJlxuICAgICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dICYmXG4gICAgICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25bY3Vyc29yXV0ub3B0aW9uYWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCEhaW5wdXRBcnJheVtjdXJzb3JdICYmIG1hc2tFeHByZXNzaW9uICE9PSAnMDk5LjA5OS4wOTkuMDk5Jykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGlucHV0QXJyYXlbY3Vyc29yXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3Vyc29yKys7XG4gICAgICAgICAgaS0tO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJyAmJlxuICAgICAgICAgIHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcih0aGlzLm1hc2tFeHByZXNzaW9uW2N1cnNvciArIDJdKSAmJlxuICAgICAgICAgIHRoaXMuX2ZpbmRTcGVjaWFsQ2hhcihpbnB1dFN5bWJvbCkgPT09IHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0gJiZcbiAgICAgICAgICBtdWx0aVxuICAgICAgICApIHtcbiAgICAgICAgICBjdXJzb3IgKz0gMztcbiAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJz8nICYmXG4gICAgICAgICAgdGhpcy5fZmluZFNwZWNpYWxDaGFyKHRoaXMubWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pICYmXG4gICAgICAgICAgdGhpcy5fZmluZFNwZWNpYWxDaGFyKGlucHV0U3ltYm9sKSA9PT0gdGhpcy5tYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAyXSAmJlxuICAgICAgICAgIG11bHRpXG4gICAgICAgICkge1xuICAgICAgICAgIGN1cnNvciArPSAzO1xuICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFN5bWJvbDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNob3dNYXNrVHlwZWQgJiYgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihpbnB1dFN5bWJvbCkgPCAwICYmIGlucHV0U3ltYm9sICE9PSB0aGlzLnBsYWNlSG9sZGVyQ2hhcmFjdGVyKSB7XG4gICAgICAgICAgc3RlcEJhY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHJlc3VsdC5sZW5ndGggKyAxID09PSBtYXNrRXhwcmVzc2lvbi5sZW5ndGggJiZcbiAgICAgIHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmluZGV4T2YobWFza0V4cHJlc3Npb25bbWFza0V4cHJlc3Npb24ubGVuZ3RoIC0gMV0pICE9PSAtMVxuICAgICkge1xuICAgICAgcmVzdWx0ICs9IG1hc2tFeHByZXNzaW9uW21hc2tFeHByZXNzaW9uLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGxldCBuZXdQb3NpdGlvbjogbnVtYmVyID0gcG9zaXRpb24gKyAxO1xuXG4gICAgd2hpbGUgKHRoaXMuX3NoaWZ0LmhhcyhuZXdQb3NpdGlvbikpIHtcbiAgICAgIHNoaWZ0Kys7XG4gICAgICBuZXdQb3NpdGlvbisrO1xuICAgIH1cblxuICAgIGxldCBhY3R1YWxTaGlmdDogbnVtYmVyID0gdGhpcy5fc2hpZnQuaGFzKHBvc2l0aW9uKSA/IHNoaWZ0IDogMDtcbiAgICBpZiAoc3RlcEJhY2spIHtcbiAgICAgIGFjdHVhbFNoaWZ0LS07XG4gICAgfVxuXG4gICAgY2IoYWN0dWFsU2hpZnQsIGJhY2tzcGFjZVNoaWZ0KTtcbiAgICBpZiAoc2hpZnQgPCAwKSB7XG4gICAgICB0aGlzLl9zaGlmdC5jbGVhcigpO1xuICAgIH1cbiAgICBsZXQgcmVzID0gYCR7dGhpcy5wcmVmaXh9JHtyZXN1bHR9JHt0aGlzLnN1ZmZpeH1gO1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXMgPSBgJHt0aGlzLnByZWZpeH0ke3Jlc3VsdH1gO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHB1YmxpYyBfZmluZFNwZWNpYWxDaGFyKGlucHV0U3ltYm9sOiBzdHJpbmcpOiB1bmRlZmluZWQgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycy5maW5kKCh2YWw6IHN0cmluZykgPT4gdmFsID09PSBpbnB1dFN5bWJvbCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbDogc3RyaW5nLCBtYXNrU3ltYm9sOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJucyA9IHRoaXMuY3VzdG9tUGF0dGVybiA/IHRoaXMuY3VzdG9tUGF0dGVybiA6IHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zO1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLm1hc2tBdmFpbGFibGVQYXR0ZXJuc1ttYXNrU3ltYm9sXSAmJlxuICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza1N5bWJvbF0ucGF0dGVybiAmJlxuICAgICAgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza1N5bWJvbF0ucGF0dGVybi50ZXN0KGlucHV0U3ltYm9sKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtYXRXaXRoU2VwYXJhdG9ycyA9IChcbiAgICBzdHI6IHN0cmluZyxcbiAgICB0aG91c2FuZFNlcGFyYXRvckNoYXI6IHN0cmluZyxcbiAgICBkZWNpbWFsQ2hhcjogc3RyaW5nLFxuICAgIHByZWNpc2lvbjogbnVtYmVyXG4gICkgPT4ge1xuICAgIGNvbnN0IHg6IHN0cmluZ1tdID0gc3RyLnNwbGl0KGRlY2ltYWxDaGFyKTtcbiAgICBjb25zdCBkZWNpbWFsczogc3RyaW5nID0geC5sZW5ndGggPiAxID8gYCR7ZGVjaW1hbENoYXJ9JHt4WzFdfWAgOiAnJztcbiAgICBsZXQgcmVzOiBzdHJpbmcgPSB4WzBdO1xuICAgIGNvbnN0IHNlcGFyYXRvckxpbWl0OiBzdHJpbmcgPSB0aGlzLnNlcGFyYXRvckxpbWl0LnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgaWYgKHNlcGFyYXRvckxpbWl0ICYmICtzZXBhcmF0b3JMaW1pdCkge1xuICAgICAgaWYgKHJlc1swXSA9PT0gJy0nKSB7XG4gICAgICAgICAgcmVzID0gYC0ke3Jlcy5zbGljZSgxLCByZXMubGVuZ3RoKS5zbGljZSgwLCBzZXBhcmF0b3JMaW1pdC5sZW5ndGgpfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IHJlcy5zbGljZSgwLCBzZXBhcmF0b3JMaW1pdC5sZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZ3g6IFJlZ0V4cCA9IC8oXFxkKykoXFxkezN9KS87XG4gICAgd2hpbGUgKHJneC50ZXN0KHJlcykpIHtcbiAgICAgIHJlcyA9IHJlcy5yZXBsYWNlKHJneCwgJyQxJyArIHRob3VzYW5kU2VwYXJhdG9yQ2hhciArICckMicpO1xuICAgIH1cbiAgICBpZiAocHJlY2lzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiByZXMgKyBkZWNpbWFscztcbiAgICB9IGVsc2UgaWYgKHByZWNpc2lvbiA9PT0gMCkge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgcmV0dXJuIHJlcyArIGRlY2ltYWxzLnN1YnN0cigwLCBwcmVjaXNpb24gKyAxKTtcbiAgfTtcblxuICBwcml2YXRlIHBlcmNlbnRhZ2UgPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gTnVtYmVyKHN0cikgPj0gMCAmJiBOdW1iZXIoc3RyKSA8PSAxMDA7XG4gIH07XG5cbiAgcHJpdmF0ZSBnZXRQcmVjaXNpb24gPSAobWFza0V4cHJlc3Npb246IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgeDogc3RyaW5nW10gPSBtYXNrRXhwcmVzc2lvbi5zcGxpdCgnLicpO1xuICAgIGlmICh4Lmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBOdW1iZXIoeFt4Lmxlbmd0aCAtIDFdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSW5maW5pdHk7XG4gIH07XG5cbiAgcHJpdmF0ZSBjaGVja0lucHV0UHJlY2lzaW9uID0gKFxuICAgIGlucHV0VmFsdWU6IHN0cmluZyxcbiAgICBwcmVjaXNpb246IG51bWJlcixcbiAgICBkZWNpbWFsTWFya2VyOiBJQ29uZmlnWydkZWNpbWFsTWFya2VyJ11cbiAgKTogc3RyaW5nID0+IHtcbiAgICBpZiAocHJlY2lzaW9uIDwgSW5maW5pdHkpIHtcbiAgICAgIGNvbnN0IHByZWNpc2lvblJlZ0V4OiBSZWdFeHAgPSBuZXcgUmVnRXhwKHRoaXMuX2NoYXJUb1JlZ0V4cEV4cHJlc3Npb24oZGVjaW1hbE1hcmtlcikgKyBgXFxcXGR7JHtwcmVjaXNpb259fS4qJGApO1xuXG4gICAgICBjb25zdCBwcmVjaXNpb25NYXRjaDogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwgPSBpbnB1dFZhbHVlLm1hdGNoKHByZWNpc2lvblJlZ0V4KTtcbiAgICAgIGlmIChwcmVjaXNpb25NYXRjaCAmJiBwcmVjaXNpb25NYXRjaFswXS5sZW5ndGggLSAxID4gcHJlY2lzaW9uKSB7XG4gICAgICAgIGlucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnN1YnN0cmluZygwLCBpbnB1dFZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgfSBlbHNlIGlmIChwcmVjaXNpb24gPT09IDAgJiYgaW5wdXRWYWx1ZS5lbmRzV2l0aChkZWNpbWFsTWFya2VyKSkge1xuICAgICAgICBpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS5zdWJzdHJpbmcoMCwgaW5wdXRWYWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0VmFsdWU7XG4gIH07XG5cbiAgcHJpdmF0ZSBfc3RyaXBUb0RlY2ltYWwoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdHJcbiAgICAgIC5zcGxpdCgnJylcbiAgICAgIC5maWx0ZXIoKGk6IHN0cmluZywgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIGkubWF0Y2goJ14tP1xcXFxkJykgfHwgaSA9PT0gJy4nIHx8IGkgPT09ICcsJyB8fCAoaSA9PT0gJy0nICYmIGlkeCA9PT0gMCk7XG4gICAgICB9KVxuICAgICAgLmpvaW4oJycpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hhclRvUmVnRXhwRXhwcmVzc2lvbihjaGFyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNoYXJzVG9Fc2NhcGUgPSAnW1xcXFxeJC58PyorKCknO1xuICAgIHJldHVybiBjaGFyID09PSAnICcgPyAnXFxcXHMnIDogY2hhcnNUb0VzY2FwZS5pbmRleE9mKGNoYXIpID49IDAgPyAnXFxcXCcgKyBjaGFyIDogY2hhcjtcbiAgfVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWZpbGUtbGluZS1jb3VudFxufVxuIl19
import { ModuleWithProviders } from '@angular/core';
import { optionsConfig } from './config';
export declare class NgxMaskModule {
    static forRoot(configValue?: optionsConfig | (() => optionsConfig)): ModuleWithProviders;
    static forChild(_configValue?: optionsConfig): ModuleWithProviders;
}
/**
 * @internal
 */
export declare function _configFactory(initConfig: optionsConfig, configValue: optionsConfig | (() => optionsConfig)): optionsConfig;

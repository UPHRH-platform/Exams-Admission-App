import { Injectable } from '@angular/core';
import * as urlConfig from "./url.config.json";
import * as rolesConfig from './roles.config.json';
import * as tabsConfig from './tabs.config.json';
import * as dropDownsConfig from './dropdowns.config.json'
/**
 * Service to fetch config details.
 *
 */
@Injectable()
export class ConfigService {
  /**
   * property containing url config
   *
   */
  urlConFig = (<any>urlConfig);
  /**
   * property containing roles config
   *
   */
  rolesConfig = (<any>rolesConfig);
   /**
   * property containing tabs config
   *
   */
   tabsConfig = (<any>tabsConfig);

   dropDownsConfig = (<any>dropDownsConfig)
}


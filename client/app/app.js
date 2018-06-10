'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import constants from './app.constants';
import util from '../components/util/util.module';
import search from './search/search.module';

import './app.less';

angular.module('userSearchApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, constants, util, search
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['userSearchApp'], {
      strictDi: true
    });
  });

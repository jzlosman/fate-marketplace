(function () {
  'use strict';
/* global angular */
angular.module('shared.services').factory('redirect', [
    '$localStorage', '$state', '$q', '$log', function($localStorage, $state, $q, $log) {
      var clearRedirect, getParams, getRedirect, getState, isRedirectSet, redirect, setRedirect;
      setRedirect = function(state, params) {
        $localStorage.returnToState = state;
        return $localStorage.returnToStateParams = params;
      };
      getRedirect = function() {
        if (!isRedirectSet()) {
          return null;
        }
        return {
          state: $localStorage.returnToState,
          params: $localStorage.returnToStateParams
        };
      };
      getState = function() {
        if (!isRedirectSet()) {
          return null;
        }
        return $localStorage.returnToState;
      };
      getParams = function() {
        if (!isRedirectSet()) {
          return null;
        }
        return $localStorage.returnToStateParams;
      };
      clearRedirect = function() {
        delete $localStorage.returnToState;
        return delete $localStorage.returnToStateParams;
      };
      isRedirectSet = function() {
        return ($localStorage.returnToState != null) && ($localStorage.returnToStateParams != null);
      };
      redirect = function() {
        if (isRedirectSet()) {
          $log.log('state is ', getState(), getParams());
          $state.go(getState().name, getParams());
          clearRedirect();
          return true;
        } else {
          return false;
        }
      };
      return {
        setRedirect: setRedirect,
        getRedirect: getRedirect,
        getState: getState,
        getParams: getParams,
        clearRedirect: clearRedirect,
        isRedirectSet: isRedirectSet,
        redirect: redirect
      };
    }
  ]);
})();
define(['angular', './mine-listing'], function (angular, mines) {

  'use strict';

  var Services = angular.module('multimine-search-tool.services', []);

  Services.factory('queryParams', ['$window', function (window) {
    var queryString, result = {};
    // Indifferent access - always returns an array.
    result.getValues = function (key) {
      var val = this[key];
      if (val.push) {
        return val.slice();
      } else {
        return [val];
      }
    };
    // Parse the query string
    if (queryString = (window && window.location && window.location.search)) {
      queryString.slice(1).split('&').forEach(function (pair) {
        var parts = pair.split('=')
          , key = parts[0]
          , value = window.unescape(parts[1]);
        if (result[key]) { // multiple values - lift to array.
          if (result[key].push) {
            result[key].push(value);
          } else {
            result[key] = [result[key], value];
          }
        } else { // Single value (so far) - set as scalar.
          result[key] = value;
        }
      });
    }
    return result;
  }]);

  // Service with same signature as the Mines service provided
  // by steps: {all: () -> Promise<Array<ServiceConfig>>}
  Services.factory('Mines', ['$q', function ($q) {

    return {all: all};

    function all () {
      return $q.when(mines);
    }

  }]);
});

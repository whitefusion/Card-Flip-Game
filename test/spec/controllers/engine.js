'use strict';

describe('Controller: EngineJsCtrl', function () {

  // load the controller's module
  beforeEach(module('memoGameApp'));

  var EngineJsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EngineJsCtrl = $controller('EngineJsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EngineJsCtrl.awesomeThings.length).toBe(3);
  });
});

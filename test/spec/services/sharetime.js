'use strict';

describe('Service: shareTime', function () {

  // load the service's module
  beforeEach(module('memoGameApp'));

  // instantiate service
  var shareTime;
  beforeEach(inject(function (_shareTime_) {
    shareTime = _shareTime_;
  }));

  it('should do something', function () {
    expect(!!shareTime).toBe(true);
  });

});

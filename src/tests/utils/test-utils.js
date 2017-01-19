function decorateSpyWithPromiseResult($q, jasmineSpy) {
    var defer = $q.defer();
    jasmineSpy.defer = defer;
    jasmineSpy.and.returnValue(defer.promise);
}
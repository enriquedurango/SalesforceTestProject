"use strict";

angular.module("accountService.mock", []).factory('accountService', function($q){
    var accountService  = jasmine.createSpyObj('accountService', ['getAccounts', 'getAccountById']);
    decorateSpyWithPromiseResult($q, accountService.getAccounts);
    decorateSpyWithPromiseResult($q, accountService.getAccountById);
    return accountService;
});
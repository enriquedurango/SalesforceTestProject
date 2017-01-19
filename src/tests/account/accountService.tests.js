describe('accountModule.accountService', function() {
	  
	var $rootScope, mockAccount, accountService;

	beforeEach(module('accountModule'));

    beforeEach(inject(["$rootScope", "accountService",
        function ($rootScope_, accountService_) {
            $rootScope = $rootScope_;
            accountService = accountService_;
        }]));
	  
	  beforeEach(function () {
		  mockAccount = {Name: "06", BillingStreet: "item06", 
        		  BillingCity :"", BillingState:"", BillingPostalCode:""};
	  });
  
	  it('get accounts', function() {
		  //Arrange

		  
		  //Act

			 
	      //Assert

	  });
	  	  
	  
});
global with sharing class AccountController {
  	public String accountId { get; set; }
    public static Account account { get; set; }
    public AccountController(){}

   @RemoteAction
   global static List<Account> getAccounts() {
       return [select name, Id, billingstreet,
           billingcity, billingstate, billingpostalcode
           from account order by name];
   }    
 
    @RemoteAction
    global static Account getAccountById(String accountId) {
        account = [SELECT Id, Name, Phone, Type, NumberOfEmployees, billingstreet,
           billingcity, billingstate, billingpostalcode
           FROM Account WHERE Id = :accountId];
        return account;
    }

	@RemoteAction
    global static boolean updateAccount(Account modifiedAccount) {
    	try{
    		if(modifiedAccount != null){
    			update modifiedAccount;	
    			return true;
    		} else {
    			return false;
    		}
    	}    
        catch(Exception e) {
		    System.debug('An unexpected error has occurred: ' + e.getMessage());
		    return false;
		}
    }
    
    @RemoteAction
    global static List<Contact> getContactsByAccountId(String accountId) {
        return [SELECT Id, Name, Phone, Email
            FROM Contact WHERE accountId = :accountId];
    }

}
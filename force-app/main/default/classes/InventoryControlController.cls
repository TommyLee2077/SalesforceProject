public with sharing class InventoryControlController {
    public InventoryControlController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<SelectOption> getItemTypeList(){
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('allType','すべて'));
        Schema.DescribeFieldResult itemTypeList = InventoryControl__c.ItemType__c.getDescribe();
        List<Schema.PicklistEntry> itemTypePickListEntry = itemTypeList.getPicklistValues();

        for( Schema.PicklistEntry pickListVal : itemTypePickListEntry){
            options.add(new SelectOption(pickListVal.getValue(),pickListVal.getLabel()));
        }

        System.debug(options);
        return options;
    }

    @AuraEnabled
    public static string methodName(){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
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
    public static List<InventoryControl__c> getICList(String ItemType,String ItemName,Boolean isExist){
        try {
            String soql = 'SELECT';
            soql += ' Id,ItemType__c,ItemName__c,Supplier__c,Price__c,StockQuantity__c,PrimeCost__c,CostTotalAmount__c';
            soql += ' FROM InventoryControl__c';
            if(ItemType != 'allType'){
                soql += ' WHERE ItemType__c = :ItemType';
            }else{
                soql += ' WHERE ItemType__c != null';
            }
            if(!String.isBlank(ItemName)){
                 soql += ' AND ItemName__c LIKE \'%' + ItemName + '%\'';
            }
            if(isExist){
                soql += ' AND StockQuantity__c > 0';
            }
            return Database.query(soql);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
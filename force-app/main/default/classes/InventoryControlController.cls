public with sharing class InventoryControlController {
    public InventoryControlController() {

    }

    //品目種別の選択肢リストの値を取得
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

    //検索処理
    @AuraEnabled
    public static string getIC(String searchString){
        try {
            //continue
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
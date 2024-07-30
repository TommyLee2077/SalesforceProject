public with sharing class SelectOption {
    @AuraEnabled
    public string value {get;set;}
    @AuraEnabled
    public string label {get;set;}
    public SelectOption(String value,String label) {
        this.value = value;
        this.label = label;
    }

}
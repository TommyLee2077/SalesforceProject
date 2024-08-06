import { LightningElement } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import getItemTypeList from '@salesforce/apex/InventoryControlController.getItemTypeList';
import getICList from '@salesforce/apex/InventoryControlController.getICList';

const columns = [
  {label:'品目種別',fieldName:'ItemType__c'},
  {label:'品目名',fieldName:'ItemName__c'},
  {label:'仕入先名',fieldName:'Supplier__c'},
  {label:'価格',fieldName:'Price__c'},
  {label:'在庫数',fieldName:'StockQuantity__c',type:'number',editable:true},
  {label:'原価',fieldName:'PrimeCost__c'},
  {label:'原価合計額',fieldName:'CostTotalAmount__c'}
];

export default class InventoryControl extends LightningElement {

  //品目種別の値
  selectedType = 'allType';
  //品目種別の選択肢
  options;

  //品目名
  searchName;
  
  //チェックボックス初期値
  checkedValue = ['False'];
  isExist = false;

  searchDisabled = false;

  //dataTable表示制御
  displayDatatable = false;

  columns = columns;
  ICData = [];

  get checkBoxOptions(){
    return [
      {label:'在庫あり',value:'True'}
    ]
  }

  /*
  The connectedCallback() lifecycle hook fires when a component is inserted into the DOM. 
  The disconnectedCallback() lifecycle hook fires when a component is removed from the DOM
  */
  async connectedCallback(){
    this.options = await this.getoptions();
    
    console.log(this.options);
    console.log(this.checkedValue[0])
  }

  async getoptions(){
    try{
      const itemTypeList = await getItemTypeList();
      return itemTypeList;
    } catch(e){
      console.log(e);
    }
  }

  handleOptionsChange(event){
    try{
      this.selectedType = event.detail.value;

      console.log(this.selectedType);
    } catch(e){
      console.log(e);
    }
  }

  handleSeachNameChange(event){
    try{
      this.searchName = event.detail.value;
      console.log(this.searchName);
    } catch(e){
      console.log(e);
    }
  }

  handleCheckChange(event){
    try{
      this.checkedValue = event.detail.value;
      this.isExist = this.checkedValue[0]?true:false;
      console.log(this.isExist);
    }catch(e){
      console.log(e);
    }
  }

  async search(){
    
    console.log(this.selectedType,this.searchName,this.isExist)
    this.ICData = await getICList({ItemType:this.selectedType,ItemName:this.searchName,isExist:this.isExist});
    console.log(this.ICData);
    this.displayDatatable = true;
  }


}
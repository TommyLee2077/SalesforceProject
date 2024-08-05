import { LightningElement } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import getItemTypeList from '@salesforce/apex/InventoryControlController.getItemTypeList';


export default class InventoryControl extends LightningElement {

  //品目種別の値
  selectedType;
  //品目種別の選択肢
  options;

  //品目名
  searchName;
  
  //チェックボックス初期値
  checkedValue = ['isFalse'];

  searchDisabled = false;

  get checkBoxOptions(){
    return [
      {label:'在庫あり',value:'isTrue'}
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
      console.log(this.checkedValue[0]);
    }catch(e){
      console.log(e);
    }
  }

  search(){

  }


}
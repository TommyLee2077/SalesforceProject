import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getItemTypeList from '@salesforce/apex/InventoryControlController.getItemTypeList';

export default class InventoryControl extends NavigationMixin(LightningElement) {

  //品目種別の値
  selectedType;
  //品目種別の選択肢
  options;

  //仕入先検索文字
  searchString;

  /*
  The connectedCallback() lifecycle hook fires when a component is inserted into the DOM. 
  The disconnectedCallback() lifecycle hook fires when a component is removed from the DOM
  */
  async connectedCallback(){
    this.options = await this.getoptions();
    console.log(this.options);
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
      this.selectedType = event.target.value;
      console.log(this.selectedType);
    } catch(e){
      console.log(e);
    }
  }

  handleSeachStringChange(event){
    try{
      this.searchString = event.target.value;
      console.log(this.searchString);
    } catch(e){
      console.log(e);
    }
  }
}
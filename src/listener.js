import { checkoutBtnHandler, manageInventoryBtnHandler, sideBarCloseBtnHandler } from "./handlers";
import { newItemAddBtnHandler } from "./inventory";
import { CreateRecordFormHandler, recordGroupHandler } from "./record";
import { checkoutBtn, manageInventoryBtn, newItemAddBtn, productRecordForm, recordGroup, sideBarCloseBtn } from "./selectors";

const listener = () => {
    manageInventoryBtn.addEventListener("click",manageInventoryBtnHandler);
    sideBarCloseBtn.addEventListener("click",sideBarCloseBtnHandler);
    newItemAddBtn.addEventListener("click",newItemAddBtnHandler);
    productRecordForm.addEventListener("submit",CreateRecordFormHandler);
    recordGroup.addEventListener("click",recordGroupHandler);
    checkoutBtn.addEventListener("click",checkoutBtnHandler)

};


export default listener;
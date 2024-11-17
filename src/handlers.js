import { productSideBar } from "./selectors";

export const manageInventoryBtnHandler = () => {
    productSideBar.classList.remove("translate-x-full");
}
export const sideBarCloseBtnHandler = () => {
    productSideBar.classList.add("translate-x-full","duration-200");
}

export const checkoutBtnHandler = () => {
    console.log("u checkout");
    window.print();
}
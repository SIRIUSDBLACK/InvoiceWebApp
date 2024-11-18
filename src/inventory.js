import { itemsGroup, newItemAddBtn, newItemName, newItemNameInput, newItemPrice, newItemPriceInput, newItemStockInput, newItemTemplate, productSelect } from "./selectors";
import { v4 as uuidv4 } from 'uuid';
import { products } from "./state";

export const newItemAddBtnHandler = () => {
    const createId = uuidv4();
        createNewItem(createId,newItemNameInput.value,newItemPriceInput.value,newItemStockInput.value);      
        productSelect.append(new Option(`${newItemNameInput.value} - ${newItemPriceInput.value} - [${newItemStockInput.value}]` ,createId));
        
        products.push({
            id : createId,
            name : newItemNameInput.value,
            price : newItemPriceInput.value,
            stock : newItemStockInput.value,
        })
        newItemNameInput.value = "";
        newItemPriceInput.value = "";
        newItemStockInput.value = "";
}

export const productRender = (products) => {
    productSelect.innerHTML = `<option value="" selected>Select Product</option>`;
    itemsGroup.innerHTML = "";
    products.forEach(({id,name,price,stock}) => {
        let option ;
        if(stock==0){
            option = new Option(`${name} - ${price} - [Out of stock!!]`,id)
            option.disabled = true;
        }else{
            option = new Option(`${name} - ${price} - [${stock}]`,id)
        }
        itemsGroup.append(createNewItem(id,name,price,stock));
        productSelect.append(option);
    });
}

export const createNewItem = (id,name,price,stock) => {

    const newItemCard = newItemTemplate.content.cloneNode(true);
    const newItemCardName = newItemCard.querySelector(".newItemName");
    const newItemCardPrice = newItemCard.querySelector(".newItemPrice");
    const newItemCardStock = newItemCard.querySelector(".newItemStock");
    const newItem =  newItemCard.querySelector(".newItem"); 
    newItem.id = id;
    
    newItemCardName.innerText = name;
    newItemCardPrice.innerText = price + " mmk";
    newItemCardStock.innerText = stock;
    itemsGroup.append(newItemCard);

    return newItemCard;
};


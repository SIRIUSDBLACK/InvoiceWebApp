import { itemsGroup, newItemAddBtn, newItemName, newItemNameInput, newItemPrice, newItemPriceInput, newItemTemplate, productSelect } from "./selectors";
import { v4 as uuidv4 } from 'uuid';
import { products } from "./state";

export const newItemAddBtnHandler = () => {
    const createId = uuidv4();
        createNewItem(createId,newItemNameInput.value,newItemPriceInput.value);      
        productSelect.append(new Option(`${newItemNameInput.value} - ${newItemPriceInput.value}`,createId));
        
        products.push({
            id : createId,
            name : newItemNameInput.value,
            price : newItemPriceInput.value,
        })
        console.log(products);

        newItemNameInput.value = null;
        newItemPriceInput.value = null;
}

export const productRender = (products) => {
    products.forEach(({id,name,price}) => {
        itemsGroup.append(createNewItem(id,name,price))
        productSelect.append(new Option(`${name} - ${price}`,id));
    });
}

export const createNewItem = (id,name,price) => {

    const newItemCard = newItemTemplate.content.cloneNode(true);
    const newItemCardName = newItemCard.querySelector(".newItemName");
    const newItemCardPrice = newItemCard.querySelector(".newItemPrice");
    const newItem =  newItemCard.querySelector(".newItem"); 
    newItem.id = id;
    
    newItemCardName.innerText = name;
    newItemCardPrice.innerText = price + " mmk";
    itemsGroup.append(newItemCard);

    

    return newItemCard;
}

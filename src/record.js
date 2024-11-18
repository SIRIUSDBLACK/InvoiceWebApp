import Swal from "sweetalert2";
import { productRecordForm, recordGroup, recordNetTotal, recordRowTemplate, recordTotal, tax } from "./selectors"
import { products } from "./state";
import { v4 as uuidv4 } from 'uuid';
import { productRender } from "./inventory";

export const CreateRecordFormHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(productRecordForm);
    const currentProduct = products.find(({id}) => id == formData.get("product_select"));
    const currentProductQuantity = parseInt(formData.get("quantity"));
    const currentProductStock = parseInt(currentProduct.stock);
    if(currentProductStock<currentProductQuantity){
      Swal.fire("m ya buu m shi buu m thi buu !!!")
    }else{
      currentProduct.stock = UpdateStock(currentProductStock,currentProductQuantity);
      productRender(products);
      const isThisProductAlreadyAdded = recordGroup.querySelector(`[product-id='${currentProduct.id}']`);
      if(isThisProductAlreadyAdded){
        updateQuantity(isThisProductAlreadyAdded.getAttribute("row-id"),currentProductQuantity);
      }else{
        recordGroup.append(createRecordRow(currentProduct,currentProductQuantity));
      }
        
      productRecordForm.reset();
    }
    // console.log(currentProduct);
    // console.log(formData.get("product_select"));
    // console.log(formData.get("quantity"));
    // const currentRecordRow = recordGroup.querySelector("");
    // createRecordRow(currentProduct,currentProductQuantity);
};


export const createRecordRow = ({id,name,price},quantity) => {
    const recordRow = recordRowTemplate.content.cloneNode(true);
    const recordProductName = recordRow.querySelector(".record-product-name");
    const recordProductPrice = recordRow.querySelector(".record-product-price");
    const recordQuantity = recordRow.querySelector(".record-quantity");
    const recordCost = recordRow.querySelector(".record-cost");
    const currentRecordRow = recordRow.querySelector(".record-row");
    recordProductName.innerText = name;
    recordProductPrice.innerText = price;
    recordQuantity.innerText = quantity;
    recordCost.innerText = price * quantity;
    currentRecordRow.setAttribute("product-id",id);
    currentRecordRow.setAttribute("row-id",uuidv4());
    
    // let hasProductID = false;
    // let alreadyAddedItem = null;
    // recordGroup.querySelectorAll(".record-row").forEach((el) =>{
    //     const productID = el.getAttribute("product-id")
    //     if(productID == id){
    //         hasProductID = true;
    //         alreadyAddedItem = el;
    //     }
        
    // });
    // console.log(alreadyAddedItem);
    
    // if(hasProductID){
    //     const addedquantity = alreadyAddedItem.querySelector(".record-quantity")
    //     const addedprice = alreadyAddedItem.querySelector(".record-cost");
    //     addedquantity.innerText = parseFloat(addedquantity.innerText)+quantity;
    //     addedprice.innerText = parseFloat(addedprice.innerText) + (price*quantity); 
    // }else{
    //     recordProductName.innerText = name;
    //     recordProductPrice.innerText = price;
    //     recordQuantity.innerText = quantity;
    //     recordCost.innerText = price * quantity;
    //     currentRecordRow.setAttribute("product-id",id);
    //     recordGroup.append(recordRow);
    // }
    
    return recordRow;
};

export const calculateTax = (amount,percentage = 5) => {
    return (amount/100)*percentage;
}

export const calculateRecordTotal = () => {
    let total = 0;
    recordGroup.querySelectorAll(".record-cost").forEach((el) => total += parseFloat(el.innerText));
    return total;
};

export const recordRemove = (rowId) => {
    recordGroup.querySelector(`[row-id='${rowId}']`).remove();
};

export const recordGroupHandler = (event) => {
    if(event.target.classList.contains("record-remove")){
        const currentRecordRow = event.target.closest(".record-row"); 
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0c0a09",
            cancelButtonColor: "#737373",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              recordRemove(currentRecordRow.getAttribute("row-id"));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
          
        // recordRemove();
    };
    if(event.target.classList.contains("addMoreBtn")){
      const currentRecordRow = event.target.closest(".record-row");     
      updateQuantity(currentRecordRow.getAttribute("row-id"),1);
    }

    if(event.target.classList.contains("subMoreBtn")){  
      const currentRecordRow = event.target.closest(".record-row");     
      updateQuantity(currentRecordRow.getAttribute("row-id"),-1);          
    }

};

export const updateQuantity = (Rowid,newQuantity) => {
  const currentRecordRow = document.querySelector(`[row-id='${Rowid}']`);
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
  const recordCost = currentRecordRow.querySelector(".record-cost");
  if(newQuantity>0 || recordQuantity.innerText>1){
    recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;
    recordCost.innerText = recordProductPrice.innerText * recordQuantity.innerText;
  }
}

// export const addMoreBtnFn = (Rowid) => {
//     const currentRecordRow = document.querySelector(`[row-id='${Rowid}']`);
//     const recordQuantity = currentRecordRow.querySelector(".record-quantity");
//     const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
//     const recordCost = currentRecordRow.querySelector(".record-cost");
//     recordQuantity.innerText = parseInt(recordQuantity.innerText) + 1;
//     recordCost.innerText = recordProductPrice.innerText * recordQuantity.innerText;
// };

// export const subMoreBtnFn = (Rowid) => {
//   const currentRecordRow = document.querySelector(`[row-id='${Rowid}']`);
//   const recordQuantity = currentRecordRow.querySelector(".record-quantity");
//   const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
//   const recordCost = currentRecordRow.querySelector(".record-cost");
//   recordQuantity.innerText = parseInt(recordQuantity.innerText) - 1;
//   recordCost.innerText = recordProductPrice.innerText * recordQuantity.innerText;

// }

export const recordGroupObserver = () => {
    const observerOptions = {
        childList: true,
        subtree: true,
      };
    
    const updateRecordTotal = () => {
        const total = calculateRecordTotal();
        const Totaltax = calculateTax(total);
        recordTotal.innerText = total;
        tax.innerText = Totaltax;
        recordNetTotal.innerText = total + Totaltax;
    };
    const observer = new MutationObserver(updateRecordTotal);
        observer.observe(recordGroup, observerOptions);
};

export const UpdateStock = (stock,subQuantity) => {
      console.log("the items are subbed");
      return Number(stock - subQuantity);
      
}





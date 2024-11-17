import { productRender } from "./inventory";
import { products } from "./state";

const initialRender = () => {
    productRender(products);
};

export default initialRender;
import initialRender from "./initialRender";
import listener from "./listener"
import observer from "./observer";

class Invoice {
    init(){
        initialRender();
        listener();    
        observer();
    }
}

export default Invoice;
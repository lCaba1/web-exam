import { deleteOrder, getOrders } from "./model.js";
import { fillTable } from "./view.js";

(async () => {
    const response = await getOrders();

    fillTable(response).forEach(order => {

        order.querySelector('.js_delete').addEventListener('click', async () => {
            console.log(await deleteOrder(1382));



        });

    });



})();

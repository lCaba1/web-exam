import { getOrders } from "./model.js";
import { fillTable } from "./view.js";

(async () => {
    fillTable(await getOrders());

})();

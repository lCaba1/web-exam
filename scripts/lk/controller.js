import { deleteOrder, getOrders } from "./model.js";
import { cleanOrder, viewModal, fillTable } from "./view.js";

(async () => {
    const response = await getOrders();
    console.log(response);

    fillTable(response);





    document.querySelector('#modal_view').addEventListener('show.bs.modal', (event) => {
        viewModal(event.relatedTarget.closest('.js_meta').dataset.id);
    });

    

    document.querySelector('#modal_delete').addEventListener('show.bs.modal', function (event) {
        this.dataset.processing_id = event.relatedTarget.closest('.js_meta').dataset.id;
    });
    document.querySelector('#modal_delete_submit').addEventListener('click', async function () {
        await deleteOrder(this.closest('#modal_delete').dataset.processing_id);
        cleanOrder(this.closest('#modal_delete').dataset.processing_id);
    });
})();

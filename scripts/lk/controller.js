import {
    createMeta,
    deleteOrder,
    expiredOrder,
    getOrders,
    modalPriceUpdate,
    putOrder
} from "./model.js";

import {
    cleanOrder,
    viewModal,
    fillMeta,
    editModal,
    displayNotification,
    updateRow,
    fillRow,
    emptyLk
} from "./view.js";

(async () => {
    fillMeta(await getOrders());
    Array.from(document.querySelectorAll('.js_meta')).forEach(row => {
        fillRow(row);
    });

    await Promise.all(
        Array.from(document.querySelector('#table').children).map(async order => {
            if (expiredOrder(order)) {
                await deleteOrder(order.querySelector('.js_meta').dataset.id);
                cleanOrder(order.querySelector('.js_meta').dataset.id);
            }
        })
    );

    emptyLk();

    document.querySelector('#modal_view').addEventListener('show.bs.modal', (event) => {
        viewModal(event.relatedTarget.closest('.js_meta').dataset.id);
    });

    document.querySelector('#edit_delivery_date').addEventListener('change', () => {
        modalPriceUpdate();
    });
    document.querySelector('#edit_delivery_interval').addEventListener('change', () => {
        modalPriceUpdate();
    });
    document.querySelector('#modal_edit').addEventListener('show.bs.modal', function (event) {
        editModal(event.relatedTarget.closest('.js_meta').dataset.id);
    });
    document.querySelector('#edit_form').addEventListener('submit', async function (event) {
        try {
            const response = await putOrder(event, this.closest('#modal_edit').dataset.processing_id);
            if (response.error) displayNotification(response.error, 'alert-danger');
            else {
                document.querySelector('#close_edit_modal').click();
                setTimeout(function () { displayNotification('Заказ успешно отредактирован', 'alert-success') }, 350);
                updateRow((await createMeta([response]))[0]);
                fillRow(document.querySelector(`[data-id="${response.id}"]`));
            }
        } catch (error) { displayNotification(error.message, 'alert-danger'); }
    });

    document.querySelector('#modal_delete').addEventListener('show.bs.modal', function (event) {
        this.dataset.processing_id = event.relatedTarget.closest('.js_meta').dataset.id;
    });
    document.querySelector('#modal_delete_submit').addEventListener('click', async function () {
        await deleteOrder(this.closest('#modal_delete').dataset.processing_id);
        cleanOrder(this.closest('#modal_delete').dataset.processing_id);
        setTimeout(function () { displayNotification('Заказ успешно удалён', 'alert-success') }, 350);
        emptyLk();
    });
})();

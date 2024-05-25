import Modal from "../src/Modal/Modal";

(async () => {

    document.getElementById('open-modal').addEventListener('click', () => {
        const modal = new Modal({
            content: '<b style="font-size:30px">Hello</b>'
        });
    })

    
})();
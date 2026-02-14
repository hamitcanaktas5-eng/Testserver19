// Sidebar toggle
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

// Fiyat güncelle
function updatePrice() {
    const api     = document.getElementById('apiSelect').value;
    const svcEl   = document.getElementById('serviceSelect');
    const service = svcEl.value;
    const priceBox = document.getElementById('priceBox');
    const buyBtn   = document.getElementById('buyBtn');
    const priceVal = document.getElementById('priceValue');

    if (api && service) {
        const price = parseFloat(svcEl.options[svcEl.selectedIndex].dataset.price);
        priceVal.textContent = '₺' + price.toFixed(2);
        priceBox.classList.add('show');
        buyBtn.disabled = false;
    } else {
        priceBox.classList.remove('show');
        buyBtn.disabled = true;
    }
}

// Sipariş ver
async function handleOrder() {
    const apiEl  = document.getElementById('apiSelect');
    const svcEl  = document.getElementById('serviceSelect');
    const api    = apiEl.value;
    const service = svcEl.value;

    if (!api || !service) return;

    const price    = parseFloat(svcEl.options[svcEl.selectedIndex].dataset.price);
    const apiName  = apiEl.options[apiEl.selectedIndex].text.trim();
    const svcName  = svcEl.options[svcEl.selectedIndex].text.trim();
    const orderId  = 'VN' + Date.now();

    // TODO: Firebase bakiye kontrolü
    const balance = 0;
    if (balance < price) {
        RoxyUI.toast('Yetersiz bakiye! Lütfen bakiye yükleyin.', 'info');
        window.location.href = 'balance.html';
        return;
    }

    const ok = await RoxyUI.confirm('Sipariş Onayı', 'Siparişi onaylamak istiyor musunuz?', 'Onayla', 'İptal');

    if (ok) {
        const msg = encodeURIComponent(
            `Merhaba, sipariş numaram: ${orderId}\nAPI: ${apiName}\nServis: ${svcName}`
        );
        window.open(`https://wa.me/447795203704?text=${msg}`, '_blank');
        RoxyUI.toast('Siparişiniz alındı! WhatsApp üzerinden iletişime geçilecektir.', 'info');
        apiEl.value = ''; svcEl.value = '';
        updatePrice();
    }
}

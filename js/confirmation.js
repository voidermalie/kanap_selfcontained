//Display orderId in HTML
const orderId = new URLSearchParams(window.location.search).get('orderId');
const $orderId = document.querySelector('#orderId');
$orderId.textContent = orderId;
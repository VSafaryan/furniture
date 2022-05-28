const toDate = date => {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
})


let date = document.querySelector(".footer-date")
date.innerHTML = new Date().getFullYear()


let cash = document.getElementById('cashPayment');
let withoutBank = document.getElementById('withoutBankPayment');
let withBank = document.getElementById('withBankPayment');
let withBankAmeria = document.getElementById('withBankPaymentAmeria');

cash.onclick = function() {
    localStorage.clear();
}


// withBank.addEventListener("click",function() {
//     localStorage.removeItem("wishlist")
// })

withoutBank.onclick = function() {
    localStorage.clear();
}

withBank.onclick = function() {
    localStorage.clear();
}
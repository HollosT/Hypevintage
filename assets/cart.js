// Cart
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
})

const updateCart = () => {
    fetch('/cart.js')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.querySelector('#numberOfCartItems').innerHTML = data.items.length
    })
    .catch(err => {
        console.log(err);
    })
}
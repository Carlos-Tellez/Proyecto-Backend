import CartManagerM from "../DAO/DBManagers/Mongo/cart.js"


const producto = CartManagerM();
const btn = document.getElementById('agregar');
const idp = document.getElementById('idp')
const idc = "649cd48c8722f190e45974da"

btn.addEventListener('click', ()=> {

    // fetch( 'http://'+{idc}+'/products/'+{idp}+'', {method: 'POST'})
    producto.addProductInCart(idc,idp)

});
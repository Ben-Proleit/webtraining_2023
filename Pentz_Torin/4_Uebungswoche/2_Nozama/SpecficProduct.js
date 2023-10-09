
var _currentProduct


function InitSpecificProduct(pname, phint, desc, priceProduct, pic) {
    let desc = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore "
        + "magna aliquyam erat, sed diam voluptua.At vero eos et accusam et justo duo dolores et ea rebum.Stet "
        + "clita kasd "
        + "gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, "
        + "consetetur sadipscing "
        + "elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam "
        + "voluptua.At vero eos et "
        + "accusam et justo duo dolores et ea rebum.Stet clita kasd gubergren, no sea takimata sanctus est Lorem "
        + "ipsum dolor sit "
        + "amet. "
    desc = desc + desc + desc
    let priceProduct = "34,75€"
    let pic = "https://expertphotography.b-cdn.net/wp-content/uploads/2020/11/product-photography-tips-18-1.jpg"
    currentProduct = { name: pname, hint: phint, descrption: desc, price: priceProduct, picture: pic }
    LoadProducteInFE()
}

function LoadProducteInFE() {
    let ProductNameElement = document.getElementById("ProductName")
    ProductNameElement.innerText = currentProduct.name

    let ProductHint = document.getElementById("ProductHint")
    ProductHint.innerText = currentProduct.hint

    let PriceElement = document.getElementById("Price")
    PriceElement.innerText = currentProduct.price

    let DescriptionElement = document.getElementById("Description")
    DescriptionElement.innerText = currentProduct.descrption

    let imageElement = document.getElementById("ProductPicture")
    imageElement.src = currentProduct.picture
}

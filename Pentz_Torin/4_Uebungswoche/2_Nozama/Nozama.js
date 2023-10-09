var ShoppingCardContent = []
var currentProduct
//TODO: Delete
//#region ToDelete
InitSpecificProduct()


function InitSpecificProduct() {
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
    currentProduct = { name: "PRODUCTNAME", descrption: desc, price: priceProduct, picture: pic }
    LoadProducteInFE()
}

function LoadProducteInFE() {
    let imageElement = document.getElementById("ProductPicture")
    imageElement.src = currentProduct.picture
    let ProductNameElement = document.getElementById("ProductName")
    ProductNameElement.innerText = currentProduct.name

    //let ProductNameShortElement = document.getElementById("ProductNameShort")
    //imageElement = currentProduct.picture

    let PriceElement = document.getElementById("Price")
    PriceElement.innerText = currentProduct.price

    let DescriptionElement = document.getElementById("Description")
    DescriptionElement.innerText = currentProduct.descrption
}
//#endregion ToDelete

function AddToShoppingCardEvent() {
    let amount = Number(document.getElementById("ArticelAmount").value)
    for (let i = 0; i < amount; i++)
        ShoppingCardContent.push(currentProduct)
    console.log("Das aktuelle Produkt wurde " + amount + " mal zm Warenkorb hinzugefügt! ")
    document.getElementById("ArticelAmount").value = 1
}

function IncreaseAmount() {
    let amount = document.getElementById("ArticelAmount")

    if (amount.value != 9)
        amount.value = Number(amount.value) + 1

}

function DecreaseAmount() {
    let amount = document.getElementById("ArticelAmount")

    if (amount.value != 1)
        amount.value -= 1
}

function OpenShoppingCartEvent() {
    for (let i = 0; i < ShoppingCardContent.length; i++) {
        console.log(ShoppingCardContent[i].name)
        console.log(ShoppingCardContent[i].price)
    }
}
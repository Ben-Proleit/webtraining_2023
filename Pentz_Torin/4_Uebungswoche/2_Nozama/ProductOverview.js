var ProductList = []
var RandomImages = []
var Names = []
var Hints = []
var lorem = []
const PRODUCT_CONUT = 10
InitAll()


function InitAll() {
    LoreLoreLore()
    SetImages()
    SetNames()
    SetHints()
    console.log("Länge Names: " + Names.length)
    console.log("Länge Hints: " + Hints.length)
    console.log("Länge RandomImages: " + RandomImages.length)
    console.log("Länge lorem: " + lorem.length)

    for (let i = 0; i < PRODUCT_CONUT; i++) {
        ProductList.push(CreateProduct())
    }

    InitFrontEnd()
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//#region Init Lists
function LoreLoreLore() {

    lorem.push("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ");
    lorem.push("Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ");
    lorem.push("Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ");
    lorem.push("Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. ");
    lorem.push("Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. ");
    lorem.push("At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. ");
    lorem.push("Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus. ");

}

function SetImages() {
    RandomImages.push("https://expertphotography.b-cdn.net/wp-content/uploads/2020/11/product-photography-tips-18-1.jpg")
}

function SetNames() {
    Names.push("PRODUCTNAME")
}

function SetHints() {
    Hints.push("This is a long Contentdescription. It is acually very long, so it needs much space.")

}
//#endregion Init Lists


function CombineLorems(count) {
    let res = lorem[getRndInteger(0, 7)]
    //console.log("Generate Lorem res: " + res)
    for (let i = 0; i < count; i++) {
        res = res + lorem[getRndInteger(0, 7)]
        //console.log("Generate Lorem res: " + i + " " + res)

    }
    return res
}

function CreateProduct() {
    let randomNameIndex = getRndInteger(0, Names.length)
    let pname = Names[randomNameIndex]
    let phint = Hints[randomNameIndex]
    let pic = RandomImages[getRndInteger(0, RandomImages.length)]
    let desc = CombineLorems(getRndInteger(0, 5))
    let pPrice = getRndInteger(1, 100) + ',' + getRndInteger(0, 100) + '€'
    let newProduct = { name: pname, hint: phint, descrption: desc, price: pPrice, picture: pic }
    return newProduct
}

function InitFrontEnd() {
    console.log("Länge Produktliste: " + ProductList.length)
    for (let i = 0; i < ProductList.length; i++) {
        console.log(ProductList[i].name)
        console.log(ProductList[i].hint)
        console.log(ProductList[i].descrption)
        console.log(ProductList[i].price)
        console.log(ProductList[i].picture)
    }
}
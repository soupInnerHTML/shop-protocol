import {TShop} from "./types";

let testId = 1;

export function test(shop: TShop) {
    assert(!shop.deleteProduct("1"))
    assert(shop.addNewProduct({ id: "1", name: "1", producer: "Lex" }))
    assert(!shop.addNewProduct({ id: "1", name: "any name because we check id only", producer: "any producer" }))
    assert(shop.deleteProduct("1"))
    assert(shop.addNewProduct({ id: "3", name: "Some Product3", producer: "Some Producer2" }))
    assert(shop.addNewProduct({ id: "4", name: "Some Product1", producer: "Some Producer3" }))
    assert(shop.addNewProduct({ id: "2", name: "Some Product2", producer: "Some Producer2" }))
    assert(shop.addNewProduct({ id: "1", name: "Some Product1", producer: "Some Producer1" }))
    assert(shop.addNewProduct({ id: "5", name: "Other Product5", producer: "Other Producer4" }))
    assert(shop.addNewProduct({ id: "6", name: "Other Product6", producer: "Other Producer4" }))
    assert(shop.addNewProduct({ id: "7", name: "Other Product7", producer: "Other Producer4" }))
    assert(shop.addNewProduct({ id: "8", name: "Other Product8", producer: "Other Producer4" }))
    assert(shop.addNewProduct({ id: "9", name: "Other Product9", producer: "Other Producer4" }))
    assert(shop.addNewProduct({ id: "10", name: "Other Product10", producer: "Other Producer4" }))
    assert(shop.addNewProduct({ id: "11", name: "Other Product11", producer: "Other Producer4" }))

    var byNames: string[] = shop.listProductsByName("Product")
    assert(byNames.length == 10)

    byNames = shop.listProductsByName("Some Product")
    assert(byNames.length == 4)
    assert(byNames.indexOf("Some Producer3 - Some Product1") >= 0)
    assert(byNames.indexOf("Some Product2") >= 0)
    assert(byNames.indexOf("Some Product3") >= 0)
    assert(byNames.indexOf("Some Product1") < 0)
    assert(byNames.indexOf("Some Producer1 - Some Product1") >= 0)

    var byProducer: string[] = shop.listProductsByProducer("Producer")
    assert(byProducer.length == 10)

    byProducer = shop.listProductsByProducer("Some Producer")
    assert(byProducer.length == 4)
    assert(byProducer[0] == "Some Product1")
    assert(byProducer[1] == "Some Product2" || byProducer[1] == "Some Product3")
    assert(byProducer[2] == "Some Product2" || byProducer[2] == "Some Product3")
    assert(byProducer[3] == "Some Product1")
}

function assert(condition: boolean) {
    if (condition) {
        console.log(`Test ${testId} passed`)
        testId++;
    }
    else {
        throw new Error("Assertion failed");
    }
}
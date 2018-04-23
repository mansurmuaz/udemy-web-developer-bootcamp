var cat = require("cat-me");
var faker = require("faker");



console.log("====================\nWelcome to MY SHOP\n====================");




for (var i = 0; i < 10; i++) {
    
    console.log(faker.commerce.productName() + " ---> " + faker.commerce.price());
    
    
}
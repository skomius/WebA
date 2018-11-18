(function mentor(a){ console.log(a); })(210)
//---------------------------
function b() {
    return {
        gh: "test",
        bn: 5456
    }
};


kutvela = b()

console.log(kutvela.gh);
//---------------
function aba() {
    var pompa = "priv"; 
    return { siurprizas: "ops"}
}

var zirgas = new aba();
console.log(zirgas.siurprizas);
console.log(zirgas.pompa);
//-------------
function outer(x) {
    return function (y) { return x * y; };
}

var multiThree = outer(3);
console.log(multiThree(2)); // 6 is printed
console.log(multiThree(3));  

//-----------------------------
//chaining
function Book(title, author) {
    this.getTitle = function () {
        return "Title: " + title;
    };
    this.getAuthor = function () {
        return "Author: " + author;
    };
    this.replaceTitle = function (newTitle) {
        var oldTitle = title;
        title = newTitle;
    };
    this.replaceAuthor = function (newAuthor) {
        var oldAuthor = author;
        author = newAuthor;
    };
}

function TechBook(title, author, category) {
    this.getCategory = function () {
        return "Technical Category: " + category;
    };
    Book.apply(this, arguments);
    this.changeAuthor = function (newAuthor) {
        this.replaceAuthor(newAuthor);
        return this; // necessary to enable method chaining
    };
}
var newBook = new TechBook("I Know Things", "Smart Author", "tech");
console.log(newBook.changeAuthor("Book K. Reader").getAuthor());
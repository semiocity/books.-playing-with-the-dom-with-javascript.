'use strict';

// All code and comment by Gregory Dziedzic
// TP5: Playing with the DOM
// This piece of Jacascript code pulls data from a JSON formatted
// set of books and builds the appropriate DOM with integrated event
// listeners attached to the book titles in order to close or expand
// the relevant list of book attributes.
// An abridged array of book attributes is then rebuilt from the DOM
// and displayed as an html table at the beginning of the body


// Data set is made of a few sample books in JSON format...
const books = [
  {
    "title": "Unlocking Android",
    "isbn": "1933988673",
    "pageCount": 416,
    "publishedDate": { "$date": "2009-04-01T00:00:00.000-0700" },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    "shortDescription": "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",
    "status": "PUBLISH",
    "authors": ["W. Frank Ableson", "Charlie Collins", "Robi Sen"],
    "categories": ["Open Source", "Mobile"]
  },
  {
    "title": "Android in Action, Second Edition",
    "isbn": "1935182722",
    "pageCount": 592,
    "publishedDate": { "$date": "2011-01-14T00:00:00.000-0800" },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson2.jpg",
    "shortDescription": "Android in Action, Second Edition is a comprehensive tutorial for Android developers. Taking you far beyond \"Hello Android,\" this fast-paced book puts you in the driver's seat as you learn important architectural concepts and implementation strategies. You'll master the SDK, build WebKit apps using HTML 5, and even learn to extend or replace Android's built-in features by building useful and intriguing examples. ",
    "status": "PUBLISH",
    "authors": ["W. Frank Ableson", "Robi Sen"],
    "categories": ["Java"]
  },
  {
    "title": "Specification by Example",
    "isbn": "1617290084",
    "pageCount": 0,
    "publishedDate": { "$date": "2011-06-03T00:00:00.000-0700" },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg",
    "status": "PUBLISH",
    "authors": ["Gojko Adzic"],
    "categories": ["Software Engineering"]
  },
  {
    "title": "Flex 3 in Action",
    "isbn": "1933988746",
    "pageCount": 576,
    "publishedDate": { "$date": "2009-02-02T00:00:00.000-0800" },
    "thumbnailUrl": "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ahmed.jpg",
    "longDescription": "New web applications require engaging user-friendly interfaces   and the cooler, the better. With Flex 3, web developers at any skill level can create high-quality, effective, and interactive Rich Internet Applications (RIAs) quickly and easily. Flex removes the complexity barrier from RIA development by offering sophisticated tools and a straightforward programming language so you can focus on what you want to do instead of how to do it. And now that the major components of Flex are free and open-source, the cost barrier is gone, as well!    Flex 3 in Action is an easy-to-follow, hands-on Flex tutorial. Chock-full of examples, this book goes beyond feature coverage and helps you put Flex to work in real day-to-day tasks. You'll quickly master the Flex API and learn to apply the techniques that make your Flex applications stand out from the crowd.    Interesting themes, styles, and skins  It's in there.  Working with databases  You got it.  Interactive forms and validation  You bet.  Charting techniques to help you visualize data  Bam!  The expert authors of Flex 3 in Action have one goal   to help you get down to business with Flex 3. Fast.    Many Flex books are overwhelming to new users   focusing on the complexities of the language and the super-specialized subjects in the Flex eco-system; Flex 3 in Action filters out the noise and dives into the core topics you need every day. Using numerous easy-to-understand examples, Flex 3 in Action gives you a strong foundation that you can build on as the complexity of your projects increases.",
    "status": "PUBLISH",
    "authors": ["Tariq Ahmed with Jon Hirschi", "Faisal Abid"],
    "categories": ["Internet"]
  }
]

const body = document.body;


// This function adds or removes the ".hidden" class
// to the dl list of book attributes
function toggleBookVisibility (livre) {
  const dl = livre.getElementsByTagName("dl")[0]
  dl.classList.toggle("hidden")

}


// This function transforms one JSON book into an li element
// for later insertion in the ol list
function book2libook(book) {

  // Construction of the li element with its ID set to the book's ISBN
  const livre = document.createElement('li');
  livre.id = book.isbn;

  // The book title can be clicked to close or expand the book attributes
  const titre = document.createElement('h2');
  titre.innerText = book.title;
  const cursor_attribute = document.createAttribute('cursor');
  cursor_attribute.value = "pointer";
  livre.appendChild (titre);
  titre.addEventListener ("click", (ev) => toggleBookVisibility(livre));

  // Book attributes are listed in a 'dl' list
  const liste_carac = document.createElement('dl');
  for (const [nom_carac, valeur] of Object.entries(book)) {
    // book attribute name
    const carac = document.createElement('dt');
    carac.appendChild (document.createTextNode(nom_carac));
    carac.classList.add(nom_carac);
    liste_carac.appendChild(carac);

    const description = document.createElement('dd');

    // depending on the attribute name...

    // dates are reformatted
    if (nom_carac === "publishedDate") {
      description.appendChild (document.createTextNode(valeur.$date.slice(0,10)));
    }
    
    // thumbnails are displayed and "thumbnail" attribute is removed from the list
    else if (nom_carac === "thumbnailUrl") {
      const image = document.createElement("img");
      // removes the "thumbnail" attribute name but breaks the table on top of page
      // liste_carac.removeChild(liste_carac.lastChild)
      const src = document.createAttribute("src");
      src.value = valeur;
      image.setAttributeNode(src);
  
      livre.appendChild(image)
    }

    // other attribute values are displayed under the attribute name
    else {
      description.appendChild (document.createTextNode(valeur));
    }
    liste_carac.appendChild(description);

  }
  livre.appendChild(liste_carac);

  return livre
}

// builds a tr element from a JSON book
function book2trbook(book, attributs) {

  let tr_book = document.createElement('tr');
  attributs.forEach((attributs) => {
    const td_book = document.createElement('td');
    td_book.appendChild(document.createTextNode(book[attributs]))
    tr_book.appendChild(td_book)
  })

  return tr_book
}


// Builds a DOM from the JSON data set and adds it to the
// document body
function display(books) {
  const listelivres = document.createElement('ol');
  const li_livres = books.map (book => book2libook(book))
  li_livres.forEach(livre => listelivres.appendChild(livre))
  body.appendChild(listelivres)
}



// Pulls book info from the in-page DOM, builds an array of books and returns it
function domBooksToJSON() {
  const bookArray = Array.from(document.getElementsByTagName("ol")[0].children);

  function BookDOM2Book (bookDOM) {
    console.log("bookDOM: ",bookDOM)
    const bookDOMarray = Array.from(bookDOM.children);
    console.log("bookDOMarray: ", bookDOMarray)
    function bookRecord (bookDOMarray){
      let dl = Array.from(bookDOMarray[2].children)
      dl = dl.map(element => element.innerText)

      return dl.reduce ((record, element, i, table) => {
        if (i%2 === 0) {
          record[element]=table[i+1]
        }
        console.log("record ", record);
        return record
      }, {})
    }
    return (bookRecord(bookDOMarray))
  }
  
  const books = bookArray.map (bookDOM => BookDOM2Book(bookDOM));
  return books
}

// Builds a html book index table featuring a selection of attributes

function booksToTable(books, attributs = ['title', 'pageCount', 'categories', 'authors']) {

  const booksTable = document.createElement("Table");
  const trHeader = attributs.reduce((header,attribut) => {
    const th = document.createElement('th')
    th.appendChild(document.createTextNode(attribut))
    header.appendChild(th)
    return header
  },
  document.createElement("tr"))
  const thead = document.createElement("thead")
  thead.appendChild(trHeader)
  booksTable.appendChild(thead)
  body.prepend(booksTable)

  console.log("Books: ", books)
	const bookTr = books.map (book => book2trbook(book, attributs));
  bookTr.forEach(livre => booksTable.appendChild(livre));

}

// function cacher_pour_un_livre(book) {
//   const shortDescription = book.querySelector(".shortDescription")
//   shortDescription[0].classList.add('cache');
// }

// function montrer_pour_un_livre(book) {
//   const shortDescription = book.querySelector(".shortDescription")
//   shortDescription[0].classList.remove('cache');
// }

// function cacher_short_descs () {
//   const booksArray = Array.from(document.getElementsByTagName("ol")[0].children);
//   booksArray.forEach(book => cacher_pour_un_livre(book))  
// } 

// function montrer_short_descs () {
//   const booksArray = Array.from(document.getElementsByTagName("ol")[0].children);
//   booksArray.forEach(montrer_pour_un_livre)  
// } 


function init () {
  display(books); 
  const bookArray = domBooksToJSON();
  booksToTable(bookArray)
}

window.addEventListener("load", init)

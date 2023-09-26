
// Selektieren eines Elements aus dem DOM

console.warn('getElementById'); // Wählt ein Element anhand der ID aus
console.log(document.getElementById('bigText1'));

console.warn('getElementsByClassName'); // Wählt Elemente ahand des Klassennamens aus -> Knotenliste, kein Array aber ähnlich
console.log(document.getElementsByClassName('smallText')[0]);

console.warn('getElementsByTagName'); // Wählt Elemente anhand des TagNames aus ->
console.log(document.getElementsByTagName('p'));

console.warn('querySelector'); // Wählt das erste Element aus, auf das der CSS Selektor zutrifft
console.log(document.querySelector('.smallText'));

console.warn('querySelectorAll'); // Wählt alle Elemente aus, auf die der CSS Selektor zutrifft
console.log(document.querySelectorAll('.smallText'));

console.warn('parentElement'); // Wählt ein Eltern-Element aus
console.log(document.getElementById('bigText1').parentElement);


// Handling wenn HTML Collection
// for (let i = 0; i < ps.length; i++) {
//   ps[i].style.color = 'blue';
// }


//Eigenschaften um weitere Elemente / Knoten auszuwählen

 // Elemente:
 // parentElement
 // children
 // firstElementChild
 // lastElementChild
 // previousElementSibling
 // nextElementSibling

 // Knoten:
 // parentnode
 // childNodes
 // firstChild
 // lastChild
 // previousSibling
 // nextSibling


// Mit Elementknoten bzw Elementen arbeiten -> Eigenschaften

  // innerHTML -> Auf HTML-Inhalt des Elements zugreifen
  console.log(document.getElementById('divNode').innerHTML);

  // document.createElement('') Neues HTML Element erstellen

  // appendChild()  Element dem DOM hinzufügen
  document.getElementById('divNode').appendChild(document.createElement('span'));

  // removeChild()  Knoten aus dem DOM entfernen
  // document.getElementById('divNode').removeChild(document.getElementById('childNode'));

  // innerText -> Zugriff auf den HTML-Text
  document.getElementById('childNode').innerText = 'Neuer Text';



// Mit Attributen arbeiten

  // getAttribute()
  console.log(document.getElementById('attrTest').getAttribute('class'));

  // setAttribute()
  document.getElementById('attrTest').setAttribute('class', 'myClass');

  document.getElementById('attrTest').classList.add('addedToClassList');

  // removeAttribute()
  // document.getElementById('attrTest').removeAttribute('style');


  document.getElementById('attrTest').style.color = 'red';
  document.getElementById('attrTest').style.height = '100px';

  let ps = document.getElementsByTagName('p');

  

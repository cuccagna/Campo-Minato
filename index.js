const root = document.documentElement;
const IMG_PATH = "./assets/img/";
const imgTag = document.querySelector(".game-board-background");
const gameBoard = document.querySelector(".game-board");
const gameOver = document.querySelector(".end-game-screen");

temi = [
  {
    nome: "billy il coyote",
    "--game-panel-color": "#5545bf",
    "--win-color": "rgb(78, 241, 187)",
    "--cell-color": "#f2e5a2",
    "--cell-dark-color": "#f2de79",
    "--cell-clicked-color": "#c3b324",
    "--cell-bomb-game-over-color": "rgb(241, 117, 78)",
    "--main-font": '"VT323", "handwriting", "serif"',
    "--end-game-font": "'Bungee Spice', sans-serif",
    img: "coyote_bip_bip2.jpg",
  },
  {
    nome: "default",
    "--game-panel-color": "rgb(0, 23, 50)",
    "--win-color": "rgb(78, 241, 187)",
    "--cell-color": "rgb(216, 238, 232)",
    "--cell-dark-color": "rgb(203, 223, 221)",
    "--cell-clicked-color": "rgb(157, 197, 199)",
    "--cell-bomb-game-over-color": "rgb(241, 117, 78)",
    "--main-font": '"Darker Grotesque", "sans-serif"',
    "--end-game-font": '"Press Start 2P", cursive',
    img: "none",
  },
];

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

const customItemsSelectContainer = document.querySelector(".select-items");
customItemsSelectContainer.addEventListener("click", function (e) {
  const clickedEl = e.target;
  const theme = clickedEl.textContent;

  let selectedTheme = temi.find((el) => el.nome === theme);
  console.log("🚀 ~ file: index.js:119 ~ selectedTheme:", selectedTheme);

  if (!selectedTheme) {
    //Disegna qualcosa in pagina o fai un redirect a una pagina d'errore
    throw new Error("Tema inesistente");
  }

  for (let propCol in selectedTheme) {
    switch (propCol) {
      case "img":
        let pathImage =
          selectedTheme.img === "none" ? "" : IMG_PATH + selectedTheme[propCol];
        imgTag.setAttribute("src", pathImage);
        console.log("🚀 ~ file: index.js:133 ~ pathImage:", pathImage);
        break;
      case "nome":
        break;
      default:
        root.style.setProperty(propCol, selectedTheme[propCol]);
    }
  }
});

gameBoard.addEventListener("click", toggleCopertinaGameOver);

function toggleCopertinaGameOver() {
  console.log("Ciao");
  gameOver.classList.toggle("hidden");
}

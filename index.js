let text = document.getElementById("text");
let list = document.getElementById("list");
let search = document.getElementById("search");
text.value = "";
search.value = "";
let index = 0;

text.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    btnSubmit();
  }
});

search.addEventListener("input", function (f) {
  if (f.target.value != "") {
    const searchData = data.filter((a) => a.text === f.target.value);
    console.log(searchData);
    displayData(searchData);
  } else {
    displayData(data);
  }
});

const data = [];

function btnSubmit() {
  let txtValue = text.value;
  if (txtValue) {
    let task = {
      index: index++,
      isChecked: false,
      text: txtValue,
    };
    data.push(task);
    console.log(data);
  }
  displayData(data);
}

function displayData(data) {
  list.innerHTML = "";
  if (data) {
    for (let item of data) {
      list.innerHTML += `<div class="checklist"><input type="checkbox" onclick="itemChecked(${data.indexOf(
        item
      )})" ${item.isChecked ? "checked" : ""}> ${item.text} </input></div>`;
    }
    text.value = "";
  }
}
function itemChecked(index) {
  data.splice(index, 1);
  displayData(data);
}

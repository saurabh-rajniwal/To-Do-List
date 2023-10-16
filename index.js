document.getElementById("text").value = "";
document.getElementById("text").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    btnSubmit();
  }
});

const data = [
  {
    text: "abc",
    isChecked: false,
  },
  {
    text: "abc2",
    isChecked: true,
  },
];
displayData(data);

function btnSubmit() {
  let txtValue = document.getElementById("text").value;
  if (txtValue) {
    // data.push(txtValue);
    let task = {
      isChecked: false,
      text: txtValue,
    };

    data.push(task);
  }
  console.log(data);
  displayData(data);
}

function displayData(data) {
  document.getElementById("list").innerHTML = "";
  if (data != "") {
    for (let items of data) {
      if (items.isChecked) {
        document.getElementById(
          "list"
        ).innerHTML += `<div><input type="checkbox" id="checkbox" checked> ${items.text} </input></div>`;
      } else {
        document.getElementById(
          "list"
        ).innerHTML += `<div><input type="checkbox" id="checkbox"> ${items.text} </input></div>`;
      }
    }
    document.getElementById("text").value = "";
  }
}
[];

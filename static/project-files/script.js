// loop through children of tbody
const children = $("tbody").children();
console.log(typeof children.forEach);

// convert children to an array
let children_array = [];
for (let i = 0; i < children.length; i++) {
  children_array.push(children[i]);
}
console.log(children_array);

// build an array of object
const items = [];
children_array.forEach((element) => {
  console.log(element.outerHTML);
  console.log(element.getAttribute("data-name"));
  const rowDetails = {
    name: element.getAttribute("data-name"),
    size: parseInt(element.getAttribute("data-size")),
    time: parseInt(element.getAttribute("data-time")),
    html: element.outerHTML,
  };
  items.push(rowDetails);
});
console.log(items);

// order status
const sortStatus = {
  name: "none", // none, up, down
  // size:'',
  // time:''
};

const sort_name = (items, option) => {
  items.sort((item1, item2) => {
    const name1 = item1.name.toUpperCase();
    const name2 = item2.name.toUpperCase();
    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }

    // equal names
    return 0;
  });
  // reverse the array if the option is down
  if (option === "down") {
    items.reverse();
  }
};

// fill table body with items
const fill_table_body = (items) => {
  const content = items.map((element) => element.html).join("");
  console.log(content);
  $("tbody").html(content);
};

// event listeners
document.getElementById("table_head_row").addEventListener("click", (event) => {
  if (event.target) {
    if (event.target.id === "name") {
      // clear icons
      $('i').remove();
      let status;
      if (["none", "down"].includes(sortStatus.name)) {
        // sort in ascending order
        sort_name(items, "up");
        status = "up";
        // add icon
        event.target.innerHTML += ' <i class="fa fa-arrow-circle-up"></i>';
      } else if (sortStatus.name === "up") {
        // sort in decending order
        sort_name(items, "down");
        status = "down";
        // add icon
        event.target.innerHTML += ' <i class="fa fa fa-arrow-circle-down"></i>';
      }
      sortStatus.name = status;
      fill_table_body(items);
    }
  }
});

const api = "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

const monthName = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const loader = () => {
  getFunction(api);
}

async function getFunction(url) {
  const response = await fetch(url);
  var data = await response.json();
  const sortedInformation = sortTransaction(data);
  const result = separatefunction(sortedInformation);
  addTransaction(result);
}

function sortTransaction(data) {
  const sortedT = data.transactions.sort((a, b) => {
    let da = new Date(a.startDate),
      db = new Date(b.startDate);
    return da - db;
  });
  return sortedT;
}

function separatefunction(sortTransaction = []) {
  const getDate = (date) => {
    return date.split("T")[0];
  };

  const newData = {};

  sortTransaction.forEach((el) => {
    const key = getDate(el.startDate);
    if (!newData[key]) {
      newData[key] = [];
      newData[key].push(el);
    } else {
      newData[key].push(el);
    }
  });
  return newData;
}

var date;
function addTransaction(result) {

  for (let information in result) {
    var titledate = new Date(information);
    titledate = titledate.getDate() + " " + monthName[(titledate.getMonth())] + " " + titledate.getFullYear();
    document.getElementById("lower").innerHTML +=
            `<div class="dateline">
              <div>
                <div>
                  <p >${titledate}</p>
                </div
              </div>
            </div>`;

    for (let i = 0; i < result[information].length; i++) {
      let type = result[information][i].type;
      let direction = result[information][i].direction;
      var new_date = new Date(result[information][i].startDate)
      var date = new_date.toLocaleTimeString();
      new_date = new_date.getDate() + " " + monthName[(new_date.getMonth())] + " " + new_date.getFullYear();
      if (type === 1 && direction === 1) {
        document.getElementById(
          "lower"
        ).innerHTML +=
                `<div class="rightalign"><div class="transactionbox">
                  <p class="amount">
                    &#8377; ${result[information][i].amount}
                  </p>
                  <p class="msg"> ✔️ You paid</p>
                  <div class="id">
                  <p>Transaction ID</p>
                <p>${result[information][i].id}</p>
                </div>
                </div>
                </div>
                <div class="rightdisplay">
                <p>${new_date}, ${date}</p>
                </div>`;
      }
     else if (type === 1 && direction === 2) {
        document.getElementById(
          "lower"
        ).innerHTML += `<div class="leftalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="msg">✔️ You received</p>
             <div class="id">
             <p>Transaction ID</p>
              <p>${result[information][i].id}</p>
             </div>
             </div>
             </div>
              <div class="leftdisplay">
              <p>${new_date}, ${date}</p>
            </div>`;
      }
     else if (type === 2 && direction === 2) {
        document.getElementById(
          "lower"
        ).innerHTML += `<div class="leftalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="msg">🔗 Request received</p>
              <button class=\"paybtn\">Pay</button>
              <button class=\"cancelbtn\">Decline</button>
             </div>
             </div>
             <div class="leftdisplay">
             <p>${new_date}, ${date}</p>
            </div>`;
      }
     else if (type === 2 && direction === 1) {

        document.getElementById(
          "lower"
        ).innerHTML += `<div class="rightalign"><div class="transactionbox">
              <p class="amount">
               &#8377; ${result[information][i].amount}
             </p>
             <p class="msg">🔗 You requested</p>
             <div class="id">
              <button class=\"cancelbtn\">Cancel</button>
             </div>
             </div>
             </div>
             <div class="rightdisplay">

             <p>${new_date}, ${date}</p>
           </div>`;
      }
    }
  }
}

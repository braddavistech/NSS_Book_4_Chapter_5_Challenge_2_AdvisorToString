const financialAdvisor = Object.create (null, {
  company: {
    value: "Shady Investments",
    enumerable: true,
    writable: true
  },
  specialty: {
    value: "Tech Investments",
    enumerable: true,
    writable: true
  },
  name: {
    value: "Brad Davis",
    enumerable: true
  },
  portfolio: {
    value: [
      
    ],
    enumerable: false
  },
  worth: {
    value: function () {
      let totalWorth = 0;
      for (let i = 0; i < this.portfolio.length; i++){
        if (this.portfolio[i].transaction == "buy") {
          totalWorth += this.portfolio[i].quantity * financialAdvisor.portfolio[i].price;
        } else if (this.portfolio[i].transaction == "sell") {
          totalWorth -= this.portfolio[i].quantity * financialAdvisor.portfolio[i].price;
        }
      }
      return `The total worth of the stocks currently in this portfolio is $${totalWorth.toFixed(2)}.`;
    },
    enumerable: false,
  },
  purchase: {
    value: function (stockName, purchaseQuantity, purchasePrice) {
      let index = this.portfolio.indexOf(stockName);
      if (index == -1) {
        let newStock = {
          transaction: "buy",
          stock: stockName,
          quantity: purchaseQuantity,
          price: purchasePrice
        }
        this.portfolio.push(newStock);
      } else {
        this.portfolio[index].quantity += purchaseQuantity;
        this.portfolio[index].price += purchasePrice;
      }
    },
    enumerable: false,
  },
  sell: {
    value: function (stockName, sellQuantity, sellPrice) {
      let currentlyOwn = false;
      for (let i = 0; i < this.portfolio.length; i++) {
        if (stockName == this.portfolio[i].stock){
          currentlyOwn = true;
          if (this.portfolio[i].quantity - sellQuantity >= 0) {
            this.portfolio[i].quantity -= sellQuantity;
            if (this.portfolio[i].quantity == 0) {
              this.portfolio.splice(i, 1);
            }
          } else {
            return `You only have ${this.portfolio[i].quantity} shares so you can't sell ${sellQuantity}. Try again.`;
          }
        }
      }
      if (currentlyOwn == false) {
        return `You don't own any shares of ${stockName}.`;
      }
    },
    enumerable: false
  }
});

const buildName = (names, companies, specialties) => {
  let placeHolder = document.getElementById("nameBox");
  let nameBox = document.createElement("div");
  let companyName = document.createElement("h1");
  companyName.setAttribute("id", "company");
  companyName.innerHTML = companies;
  nameBox.appendChild(companyName);
  let specialtyName = document.createElement("h2");
  specialtyName.setAttribute("id", "specialty");
  specialtyName.innerHTML = specialties;
  nameBox.appendChild(specialtyName);
  let personName = document.createElement("h3");
  personName.setAttribute("id", "name");
  personName.innerHTML = names;
  nameBox.appendChild(personName);
  placeHolder.appendChild(nameBox);
};

function currentStock (stocks) {
  let placeHolder = document.getElementById("nameBox");
  let stockFrag = document.createDocumentFragment();
  for (let i = 0; i < stocks.length; i++) {
    let stockBox = document.createElement("p");
    stockBox.innerHTML = `${i+1}. ${stocks[i].stock} -   Own: ${stocks[i].quantity} shares. -   Price: $${stocks[i].price.toFixed(2)}`;
    stockFrag.appendChild(stockBox);
  }
  placeHolder.appendChild(stockFrag);
}

financialAdvisor.purchase("YouTube", 50, 79.99);
financialAdvisor.purchase("Facebook", 60, 20);
financialAdvisor.sell("Facebook", 70, 43.25);
console.log(financialAdvisor.sell("Facebook", 70, 43.25));
financialAdvisor.sell("Facebook", 60, 98);
financialAdvisor.sell("Krispy Kreme", 5, 10);
console.log(financialAdvisor.sell("Krispy Kreme", 5, 10));
financialAdvisor.purchase("Google", 60, 10.5);
financialAdvisor.purchase("Twitter", 60, 47);
console.log(financialAdvisor);
console.log(financialAdvisor.worth());
buildName(financialAdvisor.name, financialAdvisor.company, financialAdvisor.specialty);
currentStock(financialAdvisor.portfolio);

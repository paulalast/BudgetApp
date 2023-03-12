const incomeForm = document.querySelector(".income-section form")
const expenseForm = document.querySelector(".expense-section form")
const balance = document.querySelector(".balance-section p")
const incomeList = document.querySelector(".income-section ul")
const expenseList = document.querySelector(".expense-section ul")

// Setting initial balance
let currentBalance = 0

// A funct that updates the balance
function updateBalance() {
	balance.textContent = `$${currentBalance.toFixed(2)}`
}

// Funct adds an entry to the list of incomes
function addIncome(description, amount) {
	if (!description) {
		alert("Please enter a description")
		return
	}
	// Replace comma when user write amount so it worked eg 23,30=>23.30
	amount = +amount.replace(/,/g, ".")
	if (isNaN(amount) || amount <= 0) {
		alert("Please enter a valid amount")
		return
	}
	// Add an item to the list
	const incomeItem = document.createElement("li")
	incomeItem.classList.add("income")
	incomeItem.innerHTML = `
       <span>${description}</span>
       <span>$${amount.toFixed(2)}</span>
     `
	incomeList.appendChild(incomeItem)

	// Update balance
	currentBalance += amount
	updateBalance()
}

// A funct adds description to the list of expenses
function addExpense(description, amount) {
	if (!description) {
		alert("Please enter a description")
		return
	}
	if (isNaN(amount.replaceAll(",", ".")) || amount.replaceAll(",", ".") <= 0) {
		alert("Please enter a valid amount")
		return
	}
	amount = +amount.replaceAll(",", ".")

	// Add item to the list
	const expenseItem = document.createElement("li")
	expenseItem.classList.add("expense")
	expenseItem.innerHTML = `
      <span>${description}</span>
      <span>$${amount.toFixed(2)}</span>
    `
	expenseList.appendChild(expenseItem)

	// Update balance
	currentBalance -= amount
	updateBalance()
}

// Add eventlisteners for buttons
incomeForm.addEventListener("submit", function (e) {
	e.preventDefault()
	const description = document.getElementById("income-description").value
	const amount = document.getElementById("income-amount").value
	addIncome(description, amount)
	// Clearing form
	incomeForm.reset()
})

expenseForm.addEventListener("submit", function (e) {
	e.preventDefault() // It prevents the default submit function, submitting the form and refreshing the page

	const description = document.getElementById("expense-description").value
	const amount = document.getElementById("expense-amount").value
	addExpense(description, amount)
	// Clearing form
	expenseForm.reset()
})

function calculateSimpleInterest() {
    var principal = document.getElementById("principal").value;
    var rate = document.getElementById("rate").value;
    var time = document.getElementById("time").value;

    var total = principal * (1 + rate / 100 * time);
    document.getElementById("result").textContent = "With a beginning principal of $" + principal + ", at a rate of " + rate + "% for " + time + " years, the interest will be: $" + (total - principal).toFixed(2) + " and the total amount will be: $" + total.toFixed(2);
}
const form = document.getElementById("shuttleForm");
const result = document.getElementById("shuttleResult");

const routeFares = {
    CAMPUS: 2000,
    CITY: 3500
};

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const code = document.getElementById("routeCode").value.trim().toUpperCase();
    const countRaw = document.getElementById("passengerCount").value.trim();

    //Todo: Validation - Route Check
    if (!routeFares[code]) {
        showError("Invalid route code.");
        return;
    }

    //Todo: Validation - Passenger Count Check
    const count = Number(countRaw);
    if (countRaw === "" || !Number.isInteger(count) || count < 1 || count > 10) {
        showError("Please enter a valid whole number of passengers (1-10).");
        return;
    }

    const fare = routeFares[code];
    let subtotal = fare * count;
    let total = subtotal;
    let discountAmt = 0;
    let effectiveFare = fare;
    let discountHTML = "";

    //Todo: Rule - Apply 8% discount for >= 5 passengers
    if (count >= 5) {
        const discountRate = 0.08;
        discountAmt = subtotal * discountRate;
        total = subtotal - discountAmt;
        effectiveFare = total / count; // Calculates the new per-passenger price

        discountHTML = `Group discount (8%): –UGX ${discountAmt.toLocaleString()}<br>`;
    }

    //Todo: Generate Success Message
    let html = `<h3 style="margin-top: 0; margin-bottom: 8px; font-size: 1.25rem; color: #1a4f32;">Boarding list - ${code}</h3>`;
    html += `<p style="line-height: 1.6; margin-bottom: 12px; font-size: 1rem;">`;
    html += `Passengers: ${count}<br>`;
    html += `Fare per passenger: UGX ${effectiveFare.toLocaleString()}<br>`;
    html += `Subtotal: UGX ${subtotal.toLocaleString()}<br>`;
    html += discountHTML;
    html += `<strong>Total: UGX ${total.toLocaleString()}</strong>`;
    html += `</p>`;

    //Todo: Generate Boarding Passes Loop with the numbered list format
    html += `<ul class="boarding-list">`;
    for (let i = 1; i <= count; i++) {
        html += `<li>${i}. Boarding pass ${i} – ${code} – UGX ${effectiveFare.toLocaleString()}</li>`;
    }
    html += `</ul>`;

    result.className = "result success";
    result.innerHTML = html;
    form.reset();
});

function showError(message) {
    result.className = "result error";
    result.innerHTML = message;
}

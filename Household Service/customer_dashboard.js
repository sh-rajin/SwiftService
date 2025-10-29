const baseUrl = "http://127.0.0.1:8000/";
const getValue = (id) => document.getElementById(id).value;

const customerDashboardData = () => {
    fetch("http://127.0.0.1:8000/bookings/list/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        parent = document.getElementById("customer-booking-table-body");
          parent.innerHTML = "";
        const customerId = parseInt(localStorage.getItem("customer_id"));
        const customer_bookings =
          data.filter(
            (booking) => booking.customer === customerId
          ) || [];
        console.log(customer_bookings);
        document.getElementById("customer-total-bookings").innerText =
          customer_bookings.length || 0;
        document.getElementById("customer-bookings-pending").innerText =
          customer_bookings.filter((booking) => booking.status === "pending")
            .length || 0;
        document.getElementById("customer-bookings-confirmed").innerText =
          customer_bookings.filter((booking) => booking.status === "confirmed")
            .length || 0;
        document.getElementById("customer-bookings-completed").innerText =
          customer_bookings.filter((booking) => booking.status === "completed")
                  .length || 0;
          
          customer_bookings.forEach((booking) => {
            console.log(booking);
            const tr = document.createElement("tr");
            tr.classList.add("border-b", "border-gray-300");
            tr.innerHTML = `
          <td class="py-2 px-4">${booking.id}</td>
          <td class="py-2 px-4">${booking.service_name}</td>
          <td class="py-2 px-4">${booking.category}</td>
          <td class="py-2 px-4">${booking.preferred_date}</td>
          <td class="py-2 px-4">${booking.payment_method.toUpperCase()}</td>
          <td class="py-2 px-4">${booking.is_paid ? "Paid" : "Unpaid"}</td>
          <td class="py-2 px-4">${booking.status.toUpperCase()}</td>
        `;
            parent.appendChild(tr);
          });
      })
      .catch((error) => {
        console.error("Error fetching bookings data:", error);
      });
}


const handleServiceSearch = () => {
  const query = document.getElementById("search-services").value;
  fetch(`http://127.0.0.1:8000/services/?search=${query}`)
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("service-table-body");
      parent.innerHTML = "";
      data.forEach((service) => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
              <td class="py-2 px-4">${service.id}</td>
                <td class="py-2 px-4">${service.name}</td>
                <td class="py-2 px-4">${service.category.name}</td>
                <td class="py-2 px-4">$${service.price}</td>
                <td class="py-2 px-4">${service.duration} hours</td>
                <td class="py-2 px-4">${new Date(
                  service.created_at
                ).toLocaleDateString("en-GB")}</td>
                <td class="py-2 px-4">${new Date(
                  service.updated_at
                ).toLocaleDateString("en-GB")}</td>
                <td class="py-2 px-4">
                  <button
                    class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full me-2"
                  >
                    Edit
                  </button>
                  <button onclick="handleServiceDelete(${
                    service.id
                  })" type="button"
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
                  >
                    Delete
                  </button>
                </td>
                `;
        parent.appendChild(tr);
      });
    });
};

const handleBookingsSearch = (event) => {
  event.preventDefault();
  const query = document.getElementById("search-bookings").value;
  fetch(`http://127.0.0.1:8000/bookings/list/?search=${query}`)
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("booking-table-body");
      parent.innerHTML = "";
      data.forEach((booking) => {
        console.log(booking);
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
          <td class="py-2 px-4">${booking.id}</td>
          <td class="py-2 px-4">${booking.customer_first_name} ${
          booking.customer_last_name
        }</td>
          <td class="py-2 px-4">${booking.service_name}</td>
          <td class="py-2 px-4">${booking.category}</td>
          <td class="py-2 px-4">${booking.preferred_date}</td>
          <td class="py-2 px-4">${booking.payment_method.toUpperCase()}</td>
          <td class="py-2 px-4">${booking.is_paid ? "Paid" : "Unpaid"}</td>
          <td class="py-2 px-4">${booking.status.toUpperCase()}</td>
        `;
        parent.appendChild(tr);
      });
    });
};

customerDashboardData();


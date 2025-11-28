const serviceId = new URLSearchParams(window.location.search).get("serviceId");

const bookingservice = () => {
  console.log(serviceId);

  fetch(`http://127.0.0.1:8000/services/${serviceId}/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      bookingServiceDetails(data);
    });
};

const bookingServiceDetails = (service) => {
  const parent = document.getElementById("booking-service-details");

  const div = document.createElement("div");

  div.innerHTML = `
        <div class="rounded-lg overflow-hidden h-110">
            <img class="object-cover" src="./images/plumbing.jpg" alt="" />
        </div>
        <div class="p-4">
            <h2 class="text-3xl font-bold my-2">${service.name}</h2>
            <div class="mt-4 space-y-2">
                <p class="font-bold text-xl text-gray-800">Description : </p>
                <p class="text-justify text-gray-700 text-md">${service.description}</p>
            </div>
            <p class="font-semibold text-xl mt-4">Price : <span class="text-indigo-600 text-xl">$${service.price}</span> <span class="text-md font-sm text-gray-600">/hr</span></p>
            <p class="text-yellow-400 text-left rounded-xl text-lg font-semibold mt-3"><span class="text-gray-800">Rating : </span>${service.rating}<span><i class="fa-solid fa-star ms-2 "></i></span></p>
        </div>
    `;
  parent.appendChild(div);
};


const handleBooking = (event) => {
    event.preventDefault();

    const getValue = (id) => document.getElementById(id).value;

    const service_id = serviceId;
    const phone = getValue("phone");
    const address = getValue("address");
    const preferred_date = getValue("preferred_date");
    const preferred_time = getValue("preferred_time");
    const payment_method = getValue("payment_method");
    const note = getValue("note");

    if (!serviceId) {
        alert("Service ID is missing. Cannot proceed with booking.");
        return;
    }

    const service = parseInt(service_id);


    const bookingInfo = {
      service,
      phone,
      address,
      preferred_date,
      preferred_time,
      payment_method,
      note,
    };
    console.log("Sending booking data:", bookingInfo);

    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);

    if (!token) {
        alert("You must be logged in to make a booking.");
        window.location.href = "login.html";
        return;
    }

    fetch("http://127.0.0.1:8000/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Booking response:", data);
        console.log("Booking ID:", data.id);
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
          return;
        }
        if (data.id) {
          alert("Your booking has been placed successfully with cash payment.");
          window.location.href = "booking-success.html";
          return;
        } 
        alert("Booking failed. Please try again.");
      });
        
}



bookingservice();

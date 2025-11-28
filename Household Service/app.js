const loadServicesCategories = () => {
  fetch("http://127.0.0.1:8000/services/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayServices(data);
    });

  fetch("http://127.0.0.1:8000/services/top-rated/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayTopServices(data);
    });

  fetch("http://127.0.0.1:8000/categories/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayCategories(data);
    });
};

const displayServices = (services) => {
  // console.log(services);
  const parent = document.getElementById("services");

  if (services.length === 0) {
    parent.innerHTML = `<h2 class="text-red-700 text-xl font-semibold text-center">No services found.</h2>`;
    return;
  }

  services.forEach((service) => {
    const div = document.createElement("div");
    div.classList.add(
      "bg-gray-50",
      "rounded-lg",
      "pb-5",
      "shadow-md",
      "hover:shadow-xl",
      "transition-shadow",
      "duration-200"
    );

    div.innerHTML = `
            <div class="overflow-hidden rounded-t-lg h-60">
                  <img src="./images/plumbing.jpg" alt="">
                </div>
                <div class="space-y-3 mt-5 px-5 py-4">
                  <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-semibold text-gray-900">${service.name}</h2>
                    <p class="text-yellow-400 text-lg font-semibold">${service.rating} <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i></span></p>
                  </div>
                  <p class="text-gray-600 mt-2">${service.description}</p>
                  <p class="text-2xl font-bold text-indigo-700">$ ${service.price} <span class="font-normal text-sm text-gray-500">/hr</span></p>
                      <div class="flex space-x-4">
                        <a
                          href="details.html?serviceId=${service.id}"
                          class="cursor-pointer bg-white text-gray-600 hover:bg-indigo-600 border border-indigo-600 hover:text-white py-2 px-4 rounded-full text-center w-1/2 font-semibold text-lg"
                        >
                          View Details
                        </a>
                        <a href="booking.html?serviceId=${service.id}" class="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-full text-center w-1/2 font-semibold text-lg hover:bg-indigo-700">Book Now</a>
                      </div>
                </div>
        `;
    parent.appendChild(div);
  })
};

const displayTopServices = (services) => {
  console.log(services);
  const parent = document.getElementById("top-rated");
  
  if (services.length === 0) {
    parent.innerHTML = `<h2 class="text-red-700 text-xl font-semibold text-center">No services found.</h2>`;
    return;
  }

  services.forEach((service) => {
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="bg-gray-50 rounded-lg pb-5 my-2 shadow-md hover:shadow-xl transition-shadow duration-200">
          <div class="overflow-hidden rounded-t-lg h-50">
            <img src="${
              service.image ? service.image : "./images/plumbing.jpg"
            }" alt="">
          </div>
          <div class="space-y-3 px-5">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-semibold text-gray-900">${
                service.name
              }</h2>
              <p class="text-yellow-400 text-lg font-semibold">${
                service.rating
              } <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i></span></p>
            </div>
            <p class="text-gray-600 mt-2">${service.description}</p>
            <p class="text-2xl font-bold text-indigo-700">$ ${
              service.price
            } <span class="font-normal text-sm text-gray-500">/hr</span></p>
            <div class="flex space-x-4">
              <a href="details.html?serviceId=${
                service.id
              }" class="border text-center border-indigo-600 text-gray-600 hover:text-white hover:bg-indigo-600 hover:border-none font-semibold text-lg rounded-full w-1/2 py-1 transition-colors duration-200 cursor-pointer">View Details</a>
              <a href="booking.html?serviceId=${
                service.id
              }" class="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-full w-full font-semibold text-lg hover:bg-indigo-700">Book Now</a>
            </div>
          </div>
        </div>
    `;
    parent.appendChild(li);
  });
};

const displayCategories = (categories) => {
  const parent = document.getElementById("categories");

  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add(
      "bg-gray-100",
      "p-6",
      "text-center",
      "cursor-pointer",
      "transition-transform",
      "transform",
      "hover:scale-102",
      "shadow",
      "duration-200",
      "rounded-lg",
      "my-3"
    );

    div.innerHTML = `
      <div class="flex items-center justify-center flex-col">
        <div class="mt-3 w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-md">
          <img src=${
            category.icon || "./icons/appliance-repair.png"
          } alt="" width="40">
        </div>
        <h3 class="my-2 text-2xl font-semibold text-gray-800">${
          category.name
        }</h3>
      </div>
    `;
    parent.appendChild(div);
  });
};



const handleSearch = () => {
  const query = document.getElementById("search-input").value;
  document.getElementById("search-input").value = "";
  fetch(`http://127.0.0.1:8000/services/?search=${query}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("services").innerHTML = "";
      displayServices(data);
      document.getElementById("top-rated-section").style.display = "none";
      document.getElementById("categories-section").style.display = "none";
    })
}



loadServicesCategories();

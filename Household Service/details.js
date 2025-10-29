const serviceDetails = () => {
    const param = new URLSearchParams(window.location.search).get("serviceId");
    console.log(param);

    fetch(`http://127.0.0.1:8000/services/${param}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
          displayDetails(data);
      });
}

const displayDetails = (service) => {
    const parent = document.getElementById("service-details");
    localStorage.setItem("serviceId", service.id)
    const div = document.createElement("div");

    div.classList.add("w-4xl", "bg-white", "rounded-lg", "shadow-md", "mx-auto")

    div.innerHTML = `
        <div class="rounded-t-lg overflow-hidden h-110">
            <img class="object-cover" src="./images/plumbing.jpg" alt="" />
          </div>
          <div class="p-9 space-y-6">
            <h1 class="text-2xl font-bold ">${service.name}</h1>
            <div>
                <p class="font-bold text-lg">Description : </p>
            <p class="text-justify text-gray-700 text-md">${service.description}
            </p>
            </div>
            <div>
                <h1 class="font-bold text-xl mb-3">Pricing : </h1>
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-semibold text-lg">Price : <span class="text-indigo-600 text-xl">$ ${service.price}</span> <span class="text-md font-sm text-gray-600">/hr</span></p>
                        <p class="text-lg font-semibold">Duration : <span class="font-normal">${service.duration} hours</span></p>
                    </div>
                    <div class=" text-right">
                        <p class="bg-yellow-100 text-yellow-400 text-center rounded-xl text-lg font-semibold">${service.rating}<span><i class="fa-solid fa-star ms-2 "></i></span></p>
                        <a href="#" class="font-semibold text-gray-700 hover:underline">${service.review_count} reviews</a>
                    </div>
                </div>
            </div>
            <!--<button command="show-modal" commandfor="dialog" class="cursor-pointer bg-indigo-600 text-white py-2 rounded-full w-full font-semibold text-lg hover:bg-indigo-700">Book Now</button>-->
            <a href="booking.html?serviceId=${service.id}" class="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-full w-full font-semibold text-lg hover:bg-indigo-700">Book Now</a>
          </div>
    `;
    parent.appendChild(div)
}





serviceDetails()
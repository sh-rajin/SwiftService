const baseUrl = "https://swiftservice-api.onrender.com/"
const getValue = (id) => document.getElementById(id).value;

const dashboardData = () => {
  fetch("https://swiftservice-api.onrender.com/auth/users/")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      document.getElementById("dashboard-total-users").innerText = data.length || 0;
      document.getElementById("total-users").innerText = data.length || 0;
      const activeUsersCount = data.filter(user => user.is_active).length || 0;
      document.getElementById("active-users").innerText = activeUsersCount || 0;
      document.getElementById("inactive-users").innerText = (data.length - activeUsersCount) || 0;
        
      const parent = document.getElementById("user-table-body");
      parent.innerHTML = ""; // Clear existing rows
      data.forEach((user) => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
                    <td class="py-2 px-4">${user.id}</td>
                    <td class="py-2 px-4">${user.username}</td>
                    <td class="py-2 px-4">${user.first_name}</td>
                    <td class="py-2 px-4">${user.last_name}</td>
                    <td class="py-2 px-4">${user.email}</td>
                    <td class="py-2 px-4">
                        <button onclick="handleUserDelete(${user.id})" type="button" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full">Delete</button>
                    </td>
                `;
        parent.appendChild(tr);

      })
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
    
    
    
  fetch("https://swiftservice-api.onrender.com/customers/")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      document.getElementById("dashboard-total-customers").innerText = data.length || 0;
      document.getElementById("total-customers").innerText = data.length || 0;
      const activeCustomersCount = data.filter(customer => customer.is_active).length || 0;
      document.getElementById("active-customers").innerText = activeCustomersCount || 0;
      document.getElementById("inactive-customers").innerText = (data.length - activeCustomersCount) || 0;
        
      const parent = document.getElementById("customer-table-body");
      parent.innerHTML = "";
      data.forEach((customer) => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
                    <td class="py-2 px-4">${customer.id}</td>
                    <td class="py-2 px-4">${customer.username}</td>
                    <td class="py-2 px-4">${customer.first_name}</td>
                    <td class="py-2 px-4">${customer.last_name}</td>
                    <td class="py-2 px-4">${customer.email}</td>
                    <td class="py-2 px-4">${customer.phone}</td>
                    <td class="py-2 px-4">${customer.address}</td>
                `;
        parent.appendChild(tr);
                    
      })
    })
    .catch((error) => {
      console.error("Error fetching customer data:", error);
    });

  fetch("https://swiftservice-api.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      document.getElementById("dashboard-total-services").innerText = data.length || 0;
      document.getElementById("total-services").innerText = data.length || 0;
      const availableServices = data.filter(service => service.availability).length || 0;
      document.getElementById("available-services").innerText = availableServices || 0;
      document.getElementById("unavailable-services").innerText = (data.length - availableServices) || 0;
        
      const parent = document.getElementById("service-table-body");
      parent.innerHTML = "";
      data.forEach((service) => {
                
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
              <td class="py-2 px-4">${service.id}</td>
                <td class="py-2 px-4">${service.name}</td>
                <td class="py-2 px-4">${service.category_name}</td>
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
        tr.querySelector(".edit-btn").addEventListener("click", () => {
          openServiceEditModal(service);
        });
      })
    })
    .catch((error) => {
      console.error("Error fetching service data:", error);
    });
    
  fetch("https://swiftservice-api.onrender.com/categories/")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      document.getElementById("dashboard-total-categories").innerText = data.length || 0;
      document.getElementById("total-categories").innerText = data.length || 0;
          
      const parent = document.getElementById("category-table-body");
      const cat = document.getElementById("category")
      const cat_update = document.getElementById(
        "edit-service-category"
      );
      parent.innerHTML = "";
      data.forEach((category) => {
        //   console.log(category);
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
                <td class="py-2 px-4">${category.id}</td>
                <td class="py-2 px-4"><img src="${baseUrl}${
          category.icon
        }" alt="" width="30px"></td>
                <td class="py-2 px-4">${category.name}</td>
                <td class="py-2 px-4">${new Date(
                  category.created_at
                ).toLocaleDateString("en-GB")}</td>
                <td class="py-2 px-4">${new Date(
                  category.updated_at
                ).toLocaleDateString("en-GB")}</td>
                <td class="py-2 px-4">
                  <button class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full me-2">Edit</button>
                  <button onclick="handleCategoryDelete(${
                    category.id
                  })" type="button" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full">Delete</button>
                </td>
                `;
        parent.appendChild(tr);
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        cat.appendChild(option);

        const option1 = document.createElement("option");
        option1.value = category.id;
        option1.textContent = category.name;
        cat_update.appendChild(option1)

        tr.querySelector(".edit-btn").addEventListener("click", () => {
          openCategoryEditModal(category);
        });
      })

    })
    .catch((error) => {
      console.error("Error fetching category data:", error);
    });
    
  fetch("https://swiftservice-api.onrender.com/reviews/")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      document.getElementById("dashboard-total-reviews").innerText = data.length || 0;
      document.getElementById("total-reviews").innerText = data.length || 0;

      const parent = document.getElementById("review-table-body");
      parent.innerHTML = "";
      data.forEach((review) => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
              <td class="py-2 px-4">${review.id}</td>
                <td class="py-2 px-4">${review.service.name}</td>
                <td class="py-2 px-4">${review.customer_first_name} ${review.customer_last_name
          }</td>
                <td class="py-2 px-4">${review.comment}</td>
                <td class="py-2 px-4">${review.rating
          }<i class="fa-solid fa-star ms-1 text-yellow-400"></i></td>
                <td class="py-2 px-4">${new Date(
            review.created_at
          ).toLocaleDateString()}</td>
                <td class="py-2 px-4">${new Date(
            review.updated_at
          ).toLocaleDateString()}</td>
                <td class="py-2 px-4">
                  <button
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
                  >
                    Delete
                  </button>
                </td>
                `;
        parent.appendChild(tr);
      })
    })
    .catch((error) => {
      console.error("Error fetching reviews data:", error);
    });
    
  fetch("https://swiftservice-api.onrender.com/bookings/list/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("dashboard-total-bookings").innerText = data.length || 0;
      document.getElementById('total-bookings').innerText = data.length || 0;
      document.getElementById('bookings-pending').innerText = data.filter(booking => booking.status === 'pending').length || 0;
      document.getElementById('bookings-confirmed').innerText = data.filter(booking => booking.status === 'confirmed').length || 0;
      document.getElementById('bookings-completed').innerText = data.filter(booking => booking.status === 'completed').length || 0;
    
      parent = document.getElementById("booking-table-body");
      parent.innerHTML = ""

      data.forEach((booking) => {
        console.log(booking)
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
          <td class="py-2 px-4">${booking.id}</td>
          <td class="py-2 px-4">${booking.customer_first_name} ${booking.customer_last_name}</td>
          <td class="py-2 px-4">${booking.service_name}</td>
          <td class="py-2 px-4">${booking.category}</td>
          <td class="py-2 px-4">${booking.preferred_date}</td>
          <td class="py-2 px-4">${(booking.payment_method).toUpperCase()}</td>
          <td class="py-2 px-4">${booking.is_paid ? "Paid" : "Unpaid"}</td>
          <td class="py-2 px-4">${(booking.status).toUpperCase()}</td>
        `;
        parent.appendChild(tr)
      })


      const customer_bookings = data.filter(booking => booking.customer === localStorage.getItem("user_id")) || [];
      console.log(customer_bookings);
      document.getElementById("customer-total-bookings").innerText = customer_bookings.length || 0;
      document.getElementById("customer-bookings-pending").innerText = customer_bookings.filter(booking => booking.status === 'pending').length || 0;
      document.getElementById("customer-bookings-confirmed").innerText = customer_bookings.filter(booking => booking.status === 'confirmed').length || 0;
      document.getElementById("customer-bookings-completed").innerText = customer_bookings.filter(booking => booking.status === 'completed').length || 0;
    
    })
    .catch((error) => {
      console.error("Error fetching bookings data:", error);
    });
};

const handleUserDelete = (userId) => {
  const id = parseInt(userId);
  fetch(`https://swiftservice-api.onrender.com/auth/users/${id}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      // console.log(res)
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
    })
    .then((data) => {
      // console.log(data)
      alert("User Deleted successfully.");
      window.location.reload();
    });
};


const handleServiceSearch = () => {
  const query = document.getElementById("search-services").value;
  fetch(`https://swiftservice-api.onrender.com/services/?search=${query}`)
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
        tr.querySelector(".edit-btn").addEventListener("click", () => {
          openServiceEditModal(service); 
        });
      });
    })
};

const openServiceEditModal = (service) => {
  console.log(service);

  document.getElementById("edit-service-id").value = service.id;
  document.getElementById("edit-service-name").value = service.name;
  document.getElementById("edit-service-description").value = service.description;
  document.getElementById("edit-service-price").value = service.price;
  document.getElementById("edit-service-duration").value = service.duration;
  document.getElementById("edit-service-category").value = service.category;

  document.getElementById("edit-service-modal").classList.remove("hidden");
};
document.getElementById("edit-service-modal-close").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("edit-service-modal").classList.add("hidden");
  });

const handleServiceEdit = (event) => {
  event.preventDefault();
  const formdata = new FormData();
  const id = getValue("edit-service-id");
  const icon = document.getElementById("edit-service-icon").files[0]
  if (icon) formdata.append("icon", icon);
  formdata.append("name", getValue("edit-service-name"));
  formdata.append("description", getValue("edit-service-description"));
  formdata.append("category", getValue("edit-service-category"));
  formdata.append("price", getValue("edit-service-price"));
  formdata.append("duration", getValue("edit-service-duration"));

  fetch(`https://swiftservice-api.onrender.com/services/${id}/`, {
    method: "PUT",
    body : formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      alert("Service Edit successful.")
      window.location.reload()
  })
};

const handleServiceDelete = (serviceId) => {
  const id = parseInt(serviceId);
  fetch(`https://swiftservice-api.onrender.com/services/${id}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    },
  })
    .then((res) => {
      // console.log(res)
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
    })
    .then((data) => {
      // console.log(data)
      alert("Service Deleted successfully.")
      window.location.reload();
    })
};

const handleCategorySearch = (event) => {
  event.preventDefault()
  const query = document.getElementById("search-categories").value;
  fetch(`https://swiftservice-api.onrender.com/categories/?search=${query}`)
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("category-table-body");
      parent.innerHTML = "";
      data.forEach((category) => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-gray-300");
        tr.innerHTML = `
                <td class="py-2 px-4">${category.id}</td>
                <td class="py-2 px-4"><img src="${baseUrl}${
          category.icon
        }" alt="" width="30px"></td>
                <td class="py-2 px-4">${category.name}</td>
                <td class="py-2 px-4">${new Date(
                  category.created_at
                ).toLocaleDateString("en-GB")}</td>
                <td class="py-2 px-4">${new Date(
                  category.updated_at
                ).toLocaleDateString("en-GB")}</td>
                <td class="py-2 px-4">
                  <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full me-2">Edit</button>
                  <button onclick="handleCategoryDelete(${
                    category.id
                  })" type="button" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full">Delete</button>
                </td>
                `;
        parent.appendChild(tr);
        tr.querySelector(".edit-btn").addEventListener("click", () => {
          openCategoryEditModal(category);
        });
      });
    });
};

const openCategoryEditModal = (category) => {
  console.log(category);

  document.getElementById("edit-cat-id").value = category.id;
  document.getElementById("edit-cat-name").value = category.name;
  document.getElementById("edit-cat-description").value = category.description;

  document.getElementById("edit-category-modal").classList.remove("hidden");
};

document.getElementById("edit-category-modal-close").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("edit-category-modal").classList.add("hidden");
})

const handleCategoryEdit = (event) => {
  event.preventDefault();
  const formdata = new FormData()
  const id = getValue("edit-cat-id")
  const icon = document.getElementById("edit-cat-icon").files[0];
  if (icon) formdata.append('icon', icon);
  formdata.append('name', getValue("edit-cat-name"));
  formdata.append('description', getValue("edit-cat-description"));

  fetch(`https://swiftservice-api.onrender.com/categories/${id}/`, {
    method: "PUT",
    body : formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      alert("Category Edit Successful.")
      window.location.reload()
  })
}
const handleCategoryDelete = (categoryId) => {
  // console.log(categoryId)
  const id = parseInt(categoryId);
  fetch(`https://swiftservice-api.onrender.com/categories/${id}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      // console.log(res)
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
    })
    .then((data) => {
      // console.log(data)
      alert("Category Deleted successfully.");
      window.location.reload();
    });
};


const handleBookingsSearch = (event) => {
  event.preventDefault();
  const query = document.getElementById("search-bookings").value;
  fetch(`https://swiftservice-api.onrender.com/bookings/list/?search=${query}`)
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

if (localStorage.getItem("token") && localStorage.getItem("admin")) {
    dashboardData();
}
else if (localStorage.getItem("token") && localStorage.getItem("customer")) {
    window.location.href = "customer-dashboard.html";
}
else {
    window.location.href = "login.html";
}





// Service Add
document.getElementById("add-service-btn").addEventListener("click", (e) => {
  e.preventDefault()
  document.getElementById("service-modal-wrapper").classList.remove("hidden");
});
document.getElementById("service-modal-close").addEventListener("click", (e) => {
  e.preventDefault()
  document.getElementById("service-modal-wrapper").classList.add("hidden");
});

const handleAddService = (event) => {
  event.preventDefault();
  const formdata = new FormData();
  
  const serviceIcon =  document.getElementById("icon").files[0];
  if (serviceIcon) formdata.append("icon", serviceIcon);
  formdata.append("name", getValue("name"));
  formdata.append("description", getValue("description"));
  formdata.append("category", getValue("category"));
  formdata.append("price", getValue("price"));
  formdata.append("duration", getValue("duration"));

  fetch("https://swiftservice-api.onrender.com/services/", {
    method: "POST",
    body: formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      alert("Service added successfully!");
      window.location.reload();
    });
};



// Category Add 
document.getElementById("add-category-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("category-modal-wrapper").classList.remove("hidden");
});
document
  .getElementById("category-modal-close")
  .addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("category-modal-wrapper").classList.add("hidden");
  });

const handleAddCategory = (event) => {
  event.preventDefault();
  const formdata = new FormData();

  const fileInput = document.getElementById("cat-icon").files[0];

  if (fileInput) {
    formdata.append("icon", fileInput);
  }
  formdata.append("name", getValue("cat-name"));
  formdata.append("description", getValue("cat-description"));

  fetch("https://swiftservice-api.onrender.com/categories/", {
    method: "POST",
    body: formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      alert("Category added successfully!");
      window.location.reload();
    });
};
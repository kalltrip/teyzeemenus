document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        fetch("veg.json").then(response => response.json()).catch(error => console.error("Error loading veg.json:", error)),
        fetch("Nonveg.json").then(response => response.json()).catch(error => console.error("Error loading Nonveg.json:", error))
    ])
        .then(([vegData, nonvegData]) => {
            if (vegData) populateMenu(vegData, "vegetarian-menu");
            if (nonvegData) populateMenu(nonvegData, "nonvegetarian-menu");
        })
        .catch(error => console.error("Error fetching menu data:", error));
});

function populateMenu(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    data.forEach(dish => {
        const dishElement = document.createElement("div");
        dishElement.classList.add("dish", dish.category.toLowerCase().replace(/\s/g, "-"));

        dishElement.innerHTML = `
           <i class="fa fa-circle" style="font-size:14px; color: ${dish.veg === true ? 'green' : 'red'};">
    <span class="${dish.veg === true ? 'vegetarian' : 'non-vegetarian'}">
        ${dish.veg === true ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
    </span>
</i>
            <div class="dish-content">
                <div class="dish-details">
                    <div class="dish-header">
                        <span class="dish-name">${dish.name}</span>
                    </div>
                    <span class="dish-price">Rs ${dish.price}</span>
                    <p class="dish-description">${dish.description}</p>
                </div>
                <img alt="${dish.name}" src="${dish.image}" />
            </div>
            <div class="dish-footer">
                <span class="tag" onclick="filterDishes('${dish.category.toLowerCase()}')">${dish.category}</span>
                <button class="btn" onclick="selectDish('${dish.name} - Rs ${dish.price}', this)">Add On Order</button>
            </div>
        `;

        container.appendChild(dishElement);
    });
}

function filterDishes(category) {
    document.querySelectorAll(".dish").forEach(dish => {
        dish.style.display = dish.classList.contains(category) ? "block" : "none";
    });
}

function selectDish(dishName, button) {
    alert(`Added to Order: ${dishName}`);
}


fetch('header.json')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.restaurant-name').textContent = data.restaurantName;
        document.querySelector('.restaurant-details').textContent = `${data.address} | ${data.contact}`;
    })
    .catch(error => console.error('Error loading header data:', error));


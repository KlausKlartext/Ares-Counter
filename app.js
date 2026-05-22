const resources = [
  { id: "building", icon: "icons/building.png" },
  { id: "space", icon: "icons/space.png" },
  { id: "power", icon: "icons/power.png" },
  { id: "science", icon: "icons/science.png" },
  { id: "jovian", icon: "icons/jovian.png" },
  { id: "earth", icon: "icons/earth.png" },
  { id: "plant", icon: "icons/plant.png" },
  { id: "microbe", icon: "icons/microbe.png" },
  { id: "animal", icon: "icons/animal.png" },
  { id: "event", icon: "icons/event.png" }
];

const tracker = document.getElementById("tracker");

function getStoredValue(id) {
  return parseInt(localStorage.getItem(id)) || 0;
}

function saveValue(id, value) {
  localStorage.setItem(id, value);
}

function formatNumber(value) {
  return value.toString().padStart(2, "0");
}

function updateVisuals(value, valueEl, iconEls, overflowEl) {
  valueEl.textContent = formatNumber(value);

  valueEl.classList.toggle("zero", value === 0);
  valueEl.classList.toggle("overflow", value > 6);

  overflowEl.classList.toggle("visible", value > 6);

  iconEls.forEach((icon, index) => {
    if (index < Math.min(value, 6)) {
      icon.classList.remove("inactive");
    } else {
      icon.classList.add("inactive");
    }
  });
}

resources.forEach(resource => {
  let value = getStoredValue(resource.id);

  const card = document.createElement("div");
  card.className = "counter";

  const visibleIcons = 6;

  const iconsHtml = Array.from({ length: visibleIcons })
    .map(() => `
      <img class="icon inactive" src="${resource.icon}">
    `)
    .join("");

  card.innerHTML = `
    <div class="left">
      <div class="value">00</div>

      <div class="icons">
        ${iconsHtml}
        <div class="overflow-indicator">+</div>
      </div>
    </div>

    <div class="controls">
      <button class="adjust minus">−</button>
      <button class="adjust plus">+</button>
    </div>
  `;

  const valueEl = card.querySelector(".value");
  const iconEls = [...card.querySelectorAll(".icon")];
  const overflowEl = card.querySelector(".overflow-indicator");

  updateVisuals(value, valueEl, iconEls, overflowEl);

  card.querySelector(".minus").addEventListener("click", () => {
    if (value > 0) {
      value--;

      updateVisuals(value, valueEl, iconEls, overflowEl);
      saveValue(resource.id, value);
    }
  });

  card.querySelector(".plus").addEventListener("click", () => {
    value++;

    updateVisuals(value, valueEl, iconEls, overflowEl);
    saveValue(resource.id, value);
  });

  tracker.appendChild(card);
});

document.getElementById("resetBtn").addEventListener("click", () => {
  resources.forEach(resource => {
    localStorage.removeItem(resource.id);
  });

  location.reload();
});

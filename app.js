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
const overview = document.getElementById("overview");

function getStoredValue(id) {
  return parseInt(localStorage.getItem(id)) || 0;
}

function saveValue(id, value) {
  localStorage.setItem(id, value);
}

function formatNumber(value) {
  return value.toString().padStart(2, "0");
}

const overviewRefs = {};

resources.forEach(resource => {
  const item = document.createElement("div");
  item.className = "overview-item";

  item.innerHTML = `
    <img class="overview-icon" src="${resource.icon}">
    <div class="overview-number hidden">00</div>
  `;

  overview.appendChild(item);

  overviewRefs[resource.id] = {
    icon: item.querySelector(".overview-icon"),
    number: item.querySelector(".overview-number")
  };
});

function updateVisuals(value, refs, cardIcon, cardNumber) {
  refs.icon.classList.toggle("active", value > 0);
  refs.number.textContent = formatNumber(value);
  refs.number.classList.toggle("hidden", value === 0);

  cardIcon.classList.toggle("active", value > 0);
  cardNumber.textContent = formatNumber(value);
  cardNumber.classList.toggle("hidden", value === 0);
}

resources.forEach(resource => {
  let value = getStoredValue(resource.id);

  const card = document.createElement("div");
  card.className = "control-card";

  card.innerHTML = `
    <div class="control-left">
      <img class="control-icon" src="${resource.icon}">
      <div class="control-number hidden">00</div>
    </div>

    <div class="control-buttons">
      <button class="adjust plus">▲</button>
      <button class="adjust minus">▼</button>
    </div>
  `;

  const cardIcon = card.querySelector(".control-icon");
  const cardNumber = card.querySelector(".control-number");

  updateVisuals(
    value,
    overviewRefs[resource.id],
    cardIcon,
    cardNumber
  );

  card.querySelector(".plus").addEventListener("click", () => {
    value++;

    updateVisuals(
      value,
      overviewRefs[resource.id],
      cardIcon,
      cardNumber
    );

    saveValue(resource.id, value);
  });

  card.querySelector(".minus").addEventListener("click", () => {
    if (value > 0) {
      value--;

      updateVisuals(
        value,
        overviewRefs[resource.id],
        cardIcon,
        cardNumber
      );

      saveValue(resource.id, value);
    }
  });

  tracker.appendChild(card);
});

document.getElementById("resetBtn").addEventListener("click", () => {
  resources.forEach(resource => {
    localStorage.removeItem(resource.id);
  });

  location.reload();
});

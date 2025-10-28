<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'

const location = ref({ name: '', position: { lat: 0, long: 0 }, default: false })
const locationsList = ref([])

onMounted(() => {
  locationsList.value = JSON.parse(localStorage.getItem('locations')) ?? []
})

function remove(loc) {
  locationsList.value = locationsList.value.filter(
    (itm) => itm.position.lat !== loc.position.lat || itm.position.long !== loc.position.long,
  )
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

function save() {
  if (!location.value.name) return
  locationsList.value.push(location.value)
  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

function setDefault(loc) {
  locationsList.value.forEach((itm) => {
    itm.default = itm.position.lat === loc.position.lat && itm.position.long === loc.position.long
  })
  localStorage.setItem('locations', JSON.stringify(locationsList.value))

  router.push(`/forecast/${loc.name}/${loc.position.lat}/${loc.position.long}`)
}

function editValue(itm) {
  location.value = { ...itm }
}

function reset() {
  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
}
</script>

<template>
  <div class="locations-wrapper">
    <h2>Manage Locations</h2>

    <div class="form">
      <label>
        Name
        <input type="text" v-model="location.name" />
      </label>
      <label>
        Latitude
        <input type="number" max="90" min="-90" step=".1" v-model="location.position.lat" />
      </label>
      <label>
        Longitude
        <input type="number" max="180" min="-180" step=".1" v-model="location.position.long" />
      </label>
      <div class="buttons">
        <button @click="save">Save</button>
        <button @click="reset">Reset</button>
      </div>
    </div>

    <ul class="header">
      <li>Name</li>
      <li>Latitude</li>
      <li>Longitude</li>
      <li>Default</li>
      <li>Actions</li>
    </ul>

    <div
      v-for="loc in locationsList"
      :key="loc.name"
      class="card"
      :class="{ default: loc.default }"
    >
      <div class="kv">
        <div class="key">Name</div>
        <div class="value">{{ loc.name }}</div>
      </div>
      <div class="kv">
        <div class="key">Latitude</div>
        <div class="value">{{ loc.position.lat.toFixed(2) }}</div>
      </div>
      <div class="kv">
        <div class="key">Longitude</div>
        <div class="value">{{ loc.position.long.toFixed(2) }}</div>
      </div>
      <div class="kv">
        <div class="key">Default</div>
        <div class="value">{{ loc.default ? '✅' : '—' }}</div>
      </div>
      <div class="kv actions">
        <div class="key">Actions</div>
        <div class="value">
          <div class="action-buttons">
            <div class="action-top">
              <button
                @click.stop="setDefault(loc)"
                :class="{ active: loc.default }"
                :aria-pressed="loc.default"
              >
                Grab location
              </button>
            </div>
            <div class="action-bottom">
              <button @click.stop="editValue(loc)" class="edit">✏️</button>
              <button class="remove" @click="remove(loc)">X</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.locations-wrapper {
  font-family: 'Poppins', sans-serif;
  color: #fff;
  max-width: 700px;
  margin: auto;
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
  color: #555;
}

/* Form */
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: #555;
  padding: 1rem;
  border-radius: 8px;
}
label {
  flex: 1 1 30%;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-weight: 500;
}
input {
  border-radius: 4px;
  border: none;
  padding: 0.4rem;
  margin-top: 0.2rem;
}
.buttons {
  display: flex;
  gap: 0.6rem;
  align-items: flex-end;
}
button {
  background: gray;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 500;
}
button:hover {
  background: #777;
}
button.remove {
  background: #d44;
}
button.remove:hover {
  background: #b22;
}

/* Ensure action buttons (set default / edit / remove) have the same height */
.kv.actions .value button {
  /* fixed height so all buttons align */
  min-height: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  line-height: 1;
  box-sizing: border-box;
  /* subtle inner outline so buttons have a faint border without layout shift */
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  border-radius: 6px;
  transition:
    box-shadow 120ms ease,
    transform 80ms ease;
}

.kv.actions .value button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* visual state for the active (default) location button */
.kv.actions .value button.active {
  /* subtle selection outline while remaining clickable */
  outline: 2px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
}

/* Hover and focus styles for better affordance */
.kv.actions .value button:hover {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
  transform: translateY(-1px);
}
.kv.actions .value button:focus-visible {
  outline: none;
  /* outer glow for keyboard focus */
  box-shadow: 0 0 0 3px rgba(70, 130, 180, 0.18);
}

.kv.actions .value button.edit {
  /* ensure edit button uses same padding as other action buttons */
  padding: 0 0.75rem;
}

/* Desktop header */
.header {
  display: grid;
  grid-template-columns: 25% 15% 15% 15% auto;
  gap: 0;
  margin: 0 0 0.6rem 0;
  padding: 0.5rem 0.6rem;
  list-style: none;
  background: gray;
  color: #fff;
  font-weight: 600;
  border-radius: 6px 6px 0 0;
  font-size: 0.95rem;
}

/* Card */
.card {
  background: gray;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  transition: background 0.2s;
}
.card.default {
  background: #4682b4;
}

.kv {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 0.3rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.kv:last-child {
  border-bottom: none;
}
.key {
  flex: 0 0 100px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}
.value {
  flex: 1 1 auto;
  color: #fff;
  word-break: break-word;
}

/* --- Desktop grid --- */
@media (min-width: 700px) {
  .header {
    display: grid;
  }
  .card {
    display: grid;
    grid-template-columns: 25% 15% 15% 15% auto;
    align-items: center;
    padding: 0.45rem 0.6rem;
    margin-bottom: 0;
    border-radius: 0;
    box-shadow: none;
  }
  .kv {
    display: contents;
  }
  .key {
    display: none;
  }
  .value {
    color: inherit;
  }
  .card:nth-of-type(even) {
    background: gainsboro;
    color: grey;
  }
  .card:nth-of-type(odd) {
    background: gray;
  }
  .card:last-of-type {
    border-radius: 0 0 6px 6px;
  }

  /* Desktop: ensure action buttons are inline and compact */
  .kv.actions .value .action-buttons {
    display: flex;
    flex-direction: row; /* override mobile column */
    align-items: center;
    gap: 0.5rem;
  }
  .kv.actions .value .action-top {
    margin-bottom: 0;
  }
  .kv.actions .value .action-top button {
    width: auto;
    min-width: 120px; /* reasonable primary button size */
  }
  .kv.actions .value .action-bottom {
    display: flex;
    gap: 0.5rem;
  }
  .kv.actions .value .action-bottom button {
    flex: 0 0 auto;
    width: 36px; /* small square buttons for edit/remove */
    padding: 0; /* remove extra horizontal padding to keep them square */
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

/* --- Mobile: hide header, stacked key/value layout --- */
@media (max-width: 699px) {
  .header {
    display: none;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .key {
    display: block;
  }
  .card:nth-of-type(even) {
    background: #777;
  }
  .card:nth-of-type(odd) {
    background: #555;
  }

  /* Mobile: place Grab location on its own row, edit/remove underneath */
  .kv.actions .value .action-buttons {
    display: flex;
    flex-direction: column;
  }
  .kv.actions .value .action-top {
    margin-bottom: 0.5rem;
  }
  .kv.actions .value .action-top button {
    width: 100%;
  }
  .kv.actions .value .action-bottom {
    display: flex;
    gap: 0.5rem;
  }
  .kv.actions .value .action-bottom button {
    flex: 1 1 0;
  }
}
</style>

<script setup>
import { ref } from 'vue'

const location = ref({ name: '', position: { lat: 0, long: 0 }, default: false })

const locationsList = ref([
  { name: 'Mariehamn', position: { lat: 60.0, long: 20.0 }, default: false },
  { name: 'Stockholm', position: { lat: 59.32, long: 18.32 }, default: false },
  { name: 'London', position: { lat: 51.5, long: -0.1 }, default: false },
  { name: 'Cape Town', position: { lat: -34, long: 18.5 }, default: false },
])

function saveLocation() {
  if (!location.value.name.trim()) return // ignorera tomt namn

  locationsList.value.push({
    name: location.value.name,
    position: { ...location.value.position },
    default: location.value.default || false,
  })

  resetLocation()
}

function resetLocation() {
  location.value.name = ''
  location.value.position.lat = 0
  location.value.position.long = 0
}

function removeLocation(loc) {
  locationsList.value = locationsList.value.filter((l) => l !== loc)
}
function showLocation(loc) {
  location.value.name = loc.name
  location.value.position.lat = loc.position.lat
  location.value.position.long = loc.position.long
}
</script>

<style scoped>
label {
  display: block;
  width: 15em;
  padding-top: 0.5em;
}
.remove {
  color: red;
  font-size: 25px;
  cursor: pointer;
  font-weight: bold;
}
.remove:hover {
  color: rgba(255, 118, 118, 0.425);
}
ul {
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
  background-color: #dbdbdb;
  border-radius: 10px;
  cursor: pointer;
}
li:hover {
  background-color: rgb(158, 218, 158);
}
</style>

<template>
  <h2>Locations</h2>
  <label>Namn: <input type="text" v-model="location.name" /></label>
  <label
    >Lat:
    <input type="number" max="90" min="-90" step=".1" size="5" v-model="location.position.lat"
  /></label>
  <label
    >Long:
    <input type="number" max="180" min="-180" step=".1" size="8" v-model="location.position.long"
  /></label>
  <button @click="saveLocation">Save</button><button @click="resetLocation">Reset</button>
  <hr />
  <h3>List</h3>
  <ul>
    <li
      v-for="loc in locationsList"
      :key="loc"
      :class="loc.default ? 'default' : ''"
      @click="showLocation(loc)"
    >
      {{ loc.name }}
      ({{ Math.abs(loc.position.lat).toFixed(2) }}°{{ loc.position.lat > 0 ? 'N' : 'S' }}
      {{ Math.abs(loc.position.long).toFixed(2) }}°{{ loc.position.long > 0 ? 'E' : 'W' }})
      <span class="remove" @click.stop="removeLocation(loc)">x</span>
    </li>
  </ul>
</template>

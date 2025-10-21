<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'

const location = ref({ name: '', position: { lat: 0, long: 0 }, default: false })
const locationsList = ref([])

onMounted(() => {
  locationsList.value = JSON.parse(localStorage.getItem('locations')) ?? []
})

function remove(location) {
  locationsList.value = locationsList.value.filter((itm) => {
    return itm.position.lat != location.position.lat && itm.position.long != location.position.long
  })
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

function save() {
  locationsList.value.push(location.value)
  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
  localStorage.setItem('locations', JSON.stringify(locationsList.value))
}

function setDefault(e) {
  locationsList.value.map((itm) => {
    itm.default = e.position.lat == itm.position.lat && e.position.long == itm.position.long
  })
  localStorage.setItem('locations', JSON.stringify(locationsList.value))

  locationsList.value.forEach((itm) => {
    if (itm.default) {
      router.push(`/forecast/${itm.name}/${itm.position.lat}/${itm.position.long}`)
    }
  })
}

function editValue(itm) {
  location.value = itm
}
function reset() {
  location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
}
</script>
<template>
  <h2>Locations</h2>
  <label>
    Namn:
    <input type="text" v-model="location.name" />
  </label>
  <label>
    Lat:
    <input type="number" max="90" min="-90" step=".1" size="5" v-model="location.position.lat" />
  </label>
  <label>
    Long:
    <input type="number" max="180" min="-180" step=".1" size="5" v-model="location.position.long" />
  </label>
  <button @click="save">Save</button>
  <button @click="reset">Reset</button>
  <hr />
  <h3>List</h3>
  <ul>
    <li
      v-for="loc in locationsList"
      :key="loc"
      :class="loc.default ? 'default' : ''"
      @click="setDefault(loc)"
    >
      {{ loc.name }}
      ({{ Math.abs(loc.position.lat).toFixed(2) }}°{{ loc.position.lat > 0 ? 'N' : 'S' }}
      {{ Math.abs(loc.position.long).toFixed(2) }}°{{ loc.position.long > 0 ? 'E' : 'W' }})
      <span class="edit" @click.stop="editValue(loc)" title="Edit location">✒️</span>
      <span class="remove" @click="remove(loc)" title="Remove location">x</span>
    </li>
  </ul>
</template>
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
span.edit {
  position: absolute;
  right: 20%;
  display: inline-block;
  cursor: pointer;
}
.default {
  font-weight: bold;
}
</style>

<script setup>
const props = defineProps(['active'])

const emits = defineEmits(['toggle-menu'])

function toggleActive() {
  emits('toggle-menu', props.active)
}
</script>

<template>
  <div id="burger" :class="{ active: props.active }" @click="toggleActive">
    <button type="button" class="burger-button" title="Menu">
      <span class="burger-bar bar--1"></span>
      <span class="burger-bar bar--2"></span>
      <span class="burger-bar bar--3"></span>
    </button>
    <nav class="navbar" v-show="props.active">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/locations">Locations</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
:hover {
  background-color: transparent;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.616); /* semi-transparent dark background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  z-index: 98; /* under the burger button but above content */
}

.navbar a {
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  transition: color 0.2s;
}
.navbar a:hover {
  color: #bdbdbd;
}
#burger {
  display: block;
}

/* Samma storlek som tidigare */
.burger-button {
  position: relative;
  height: 30px;
  width: 40px;
  display: block;
  z-index: 99;
  border: 0;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
}

.burger-bar {
  background-color: #a1a09a;
  position: absolute;
  left: 6px;
  right: 6px;
  height: 3px;
  border-radius: 3px;
  transition:
    transform 0.45s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    top 0.45s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 0.3s ease,
    background-color 0.5s ease-in-out;
}
.burger-button:hover .burger-bar {
  background-color: #dbdbdb;
  transition: background-color 0.25s ease;
}

/* Standardposition */
.bar--1 {
  top: 8px;
}
.bar--2 {
  top: 14px;
}
.bar--3 {
  top: 20px;
}
#burger.active .burger-bar {
  background-color: #f06161;
}
/* Aktiv animation */
#burger.active .bar--1 {
  top: 14px;
  transform: rotate(45deg);
}
#burger.active .bar--2 {
  opacity: 0;
  transform: translateX(-6px);
}
#burger.active .bar--3 {
  top: 14px;
  transform: rotate(-45deg);
}
</style>

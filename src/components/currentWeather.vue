<script setup>
import { ref } from 'vue'
import wc from '@/assets/data/weatherCodes.json'

const props = defineProps(['weather'])
const weatherCodes = ref(wc)

function getText(code) {
  const item = weatherCodes.value.find((itm) => itm.code == code)
  return item?.description || 'Unknown'
}
</script>

<template>
  <div class="cw-wrapper">
    <div class="weather-section">
      <h3>Temperature</h3>
      <ul>
        <li>Temp: {{ props.weather?.temp?.temp }}{{ props.weather?.temp?.temp_unit }}</li>
        <li>
          Humidity: {{ props.weather?.temp?.humidity }}{{ props.weather?.temp?.humidity_unit }}
        </li>
        <li>Feels like: {{ props.weather?.temp?.apparent }}{{ props.weather?.temp?.temp_unit }}</li>
      </ul>
    </div>

    <div class="weather-section">
      <h3>Atmosphere</h3>
      <ul>
        <li>
          Precipitation: {{ props.weather?.precipitation?.precipitation
          }}{{ props.weather?.precipitation?.unit }}
        </li>
        <li>
          Cloud coverage: {{ props.weather?.cloud?.coverage }}{{ props.weather?.cloud?.unit }}
        </li>
        <li>
          Pressure: {{ props.weather?.pressure?.pressure }}{{ props.weather?.pressure?.unit }}
        </li>
      </ul>
    </div>

    <div class="weather-section">
      <h3>Wind</h3>
      <ul>
        <li>Speed: {{ props.weather?.wind?.windspeed }}{{ props.weather?.wind?.unit }}</li>
        <li>Gusts: {{ props.weather?.wind?.windgusts }}{{ props.weather?.wind?.unit }}</li>
        <li>
          Direction: {{ props.weather?.wind?.direction }}{{ props.weather?.wind?.direction_unit }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cw-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  color: rgb(116, 116, 116);
}

.weather-section {
  flex: 1 1 200px;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.8rem;
  padding: 1rem 1.2rem;
  transition:
    transform 0.2s ease,
    background 0.3s ease;
}

.weather-section:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-3px);
}

.weather-section h3 {
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
  color: rgb(119, 119, 119);
  font-weight: 600;
}

.weather-section ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.weather-section li {
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
  opacity: 0.9;
}
</style>

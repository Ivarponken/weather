<script setup>
import { ref } from 'vue'
import wc from '@/assets/data/weatherCodes.json'

const props = defineProps(['forecast'])
const weatherCodes = ref(wc)

function getText(code) {
  const item = weatherCodes.value.find((itm) => itm.code == code)
  return item?.description || 'Unknown'
}
</script>

<template>
  <!-- Desktop header -->
  <ul class="header">
    <li>Date</li>
    <li>Code</li>
    <li>Temp</li>
    <li>Precip</li>
    <li>Wind</li>
  </ul>

  <!-- Kort per dag -->
  <div v-for="day in props.forecast?.weather ?? []" :key="day.date" class="card">
    <div class="kv">
      <div class="key">Date</div>
      <div class="value">
        {{ new Date(day.date).getDate() }}.{{ new Date(day.date).getMonth() + 1 }}
      </div>
    </div>
    <div class="kv">
      <div class="key">Code</div>
      <div class="value">{{ getText(day.code) }}</div>
    </div>
    <div class="kv">
      <div class="key">Temp</div>
      <div class="value">{{ day.temp.min }} - {{ day.temp.max }}{{ day.temp.unit }}</div>
    </div>
    <div class="kv">
      <div class="key">Precip</div>
      <div class="value">
        {{ day.precipitation.sum }}{{ day.precipitation.unit }} ({{
          day.precipitation.probability
        }}%)
      </div>
    </div>
    <div class="kv">
      <div class="key">Wind</div>
      <div class="value">
        {{ day.wind.speed }} ({{ day.wind.gusts }}){{ day.wind.unit }}
        <svg class="compass" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" stroke="#fff" stroke-width="2" fill="none" />
          <text
            x="25"
            y="15"
            text-anchor="middle"
            fill="#fff"
            font-family="sans-serif"
            font-size="10"
          >
            N
          </text>
          <text
            x="25"
            y="42"
            text-anchor="middle"
            fill="#fff"
            font-family="sans-serif"
            font-size="10"
          >
            S
          </text>
          <text
            x="12"
            y="28"
            text-anchor="middle"
            fill="#fff"
            font-family="sans-serif"
            font-size="10"
          >
            W
          </text>
          <text
            x="39"
            y="28"
            text-anchor="middle"
            fill="#fff"
            font-family="sans-serif"
            font-size="10"
          >
            E
          </text>
          <line
            x1="25"
            y1="25"
            x2="25"
            y2="7"
            stroke="red"
            stroke-width="2"
            :transform="`rotate(${day.wind.direction}, 25, 25)`"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Desktop header */
.header {
  display: grid;
  grid-template-columns: 12% 20% 20% 20% auto;
  gap: 0;
  margin: 0 0 0.6rem 0;
  padding: 0.5rem 0.6rem;
  list-style: none;
  background: gray;
  color: #fff;
  font-weight: 600;
  border-radius: 6px 6px 0 0;
  font-family: 'Poppins', sans-serif;
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
}

/* key/value row: två kolumner */
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

/* --- Desktop: header + grid --- */
@media (min-width: 700px) {
  .header {
    display: grid;
  } /* header synlig */
  .card {
    display: grid;
    grid-template-columns: 12% 20% 20% 20% auto;
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
  } /* döljer key på desktop */
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
  .header {
    border-radius: 6px 6px 0 0;
  }
  .card:last-of-type {
    border-radius: 0 0 6px 6px;
  }
}

/* --- Mobile: göm header, visa kort med key/value --- */
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
  } /* visa key på mobil */
  .card:nth-of-type(even) {
    background: gray;
  }
  .card:nth-of-type(odd) {
    background: rgb(170, 170, 170);
  }
}

/* Compass */
.compass {
  width: 40px;
  height: 40px;
  margin-left: 0.5rem;
}
</style>

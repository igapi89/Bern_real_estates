<template>
  <main>
    <h1 :style="{ fontWeight: 'bold' }">Bern - Real estates map</h1>
    <l-map
      :style="{
        height: '768px',
        width: '1024px',
        maxWidth: '100%',
        marginTop: '20px',
        border: '1px dotted black'
      }"
      :use-global-leaflet="false"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker
        v-for="(marker, markerIndex) in realestateStore.realestates.publications"
        :lat-lng="[marker.address.coordinates.latitude, marker.address.coordinates.longitude]"
        :key="markerIndex"
        @mouseover="openPopup($event)"
      >
        <l-icon :iconSize="[100, 20]">
          <div class="marker-wrapper">€{{ marker.price }}</div>
        </l-icon>
        <l-popup>
          <h2 :style="{ maxWidth: '95%' }">{{ marker.publicationTitle }}</h2>
          <swiper
            :navigation="true"
            :modules="modules"
            :slides-per-view="1"
            :space-between="20"
            :style="{ marginTop: '20px' }"
          >
            <swiper-slide v-for="(picture, pictureIndex) in marker.pictures" :key="pictureIndex">
              <img :src="picture.Url" :alt="`${marker.publicationTitle}`" class="swiper-image" />
            </swiper-slide>
          </swiper>
          <div :style="{ marginTop: '20px' }">
            <p>Straße: {{ marker.address.street ? marker.address.street : noData }}</p>
            <p v-if="marker.address.city">
              Stadt: {{ marker.address.zipCode ? marker.address.zipCode : '' }}
              {{ marker.address.city }}
            </p>
            <p>Preis: {{ marker.price ? '€' + marker.price : noData }}</p>
            <p>
              Eigenschaftskategorie:
              {{ marker.propertyCategory ? marker.propertyCategory : noData }}
            </p>
            <p>Wohnbereich: {{ marker.livingArea ? marker.livingArea + ' m²' : noData }}</p>
            <p>Anzahl der Zimmer: {{ marker.rooms ? marker.rooms : noData }}</p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </main>
</template>

<script setup>
// Map (leaflet) imports
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
// Vue imports
import { onMounted } from 'vue'
import { useStoreRealestates } from '@/stores/realestates'

// Fetch real estates
const realestateStore = useStoreRealestates()

// Map settings
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const zoom = 13
const center = [46.948, 7.4474]

// Popup settings
const modules = [Navigation]
const noData = 'keine Daten verfügbar'

const openPopup = (event) => {
  event.target.openPopup()
}

onMounted(() => {
  realestateStore.getItems()
})
</script>

<style>
.marker-wrapper {
  font-weight: bold;
  text-align: center;
  border-radius: 15px;
  border: 1px solid #b5b4b4;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.33);
}

/* Leaflet styles */
.leaflet-container a.leaflet-popup-close-button {
  font-size: 30px;
  margin: 7px;
  color: #444;
}

.leaflet-div-icon {
  border: none;
  background: transparent;
}

.leaflet-popup-content p {
  margin: 6px 0 0 0;
}

/* Swiper styles */
.swiper {
  min-height: 200px;
}

.swiper-wrapper {
  max-height: 230px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.swiper-image {
  width: 100%;
  pointer-events: none;
  user-select: none;
}

.swiper-button-next,
.swiper-button-prev {
  width: 30px;
  height: 30px;
  background-color: #000;
  border-radius: 50%;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 10px;
  font-weight: bold;
  color: #fff;
}
</style>

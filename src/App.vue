<template>
  <main>
    <l-map
      :style="{ height: '768px', width: '1024px', border: '1px dotted black' }"
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
          <div class="marker-wrapper">${{ marker.price }}</div>
        </l-icon>
        <l-popup>
          <div>{{ marker.publicationTitle }}</div>
          <p>{{ marker.pictures.length }}</p>

          <swiper :navigation="true" :modules="modules" :slides-per-view="1" :space-between="20">
            <swiper-slide v-for="(picture, pictureIndex) in marker.pictures" :key="pictureIndex">
              <img :src="picture.Url" alt="${marker.publicationTitle}" class="slider-image" />
            </swiper-slide>
          </swiper>
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

const openPopup = (event) => {
  event.target.openPopup()
}

// Swiper modules
const modules = [Navigation]

onMounted(() => {
  realestateStore.getItems()
})
</script>

<style>
.leaflet-div-icon {
  border: none;
  background: transparent;
}

.marker-wrapper {
  font-weight: bold;
  text-align: center;
  border-radius: 15px;
  border: 1px solid #b5b4b4;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.33);
}

.slider-image {
  width: auto;
  max-height: 120px;
  pointer-events: none;
  user-select: none;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="container mx-auto">
    <div class="flex gap-4">
      <div
        class="min-h-screen flex-1 w-full bg-white sm:w-1/2 p-4 sm:p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-bold mb-2 uppercase text-blue-800">
          Cities by Province ID
        </h2>
        <div
          class="flex flex-col gap-2 sm:flex-col items-center justify-center">
          <input
            v-model="selectedProvinceId"
            type="number"
            min="0"
            placeholder="Enter Province ID"
            id="provinceId"
            class="p-3 text-sm rounded-full border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300 flex-grow" />
          <button
            @click="getCities"
            class="px-4 py-2 bg-blue-500 w-full text-white text-sm rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
            Get Cities
          </button>
        </div>
        <ul v-if="cities.length" class="mt-3 text-sm text-gray-800">
          <li class="pt-2" v-for="(city, index) in cities" :key="index">
            {{ city.name }}
          </li>
        </ul>
        <p v-else class="mt-3 text-sm text-gray-600">No cities found.</p>
      </div>

      <div
        class="min-h-screen flex-1 w-full bg-white sm:w-1/2 p-4 sm:p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-bold uppercase mb-2 text-green-800">
          Province Name by City ID
        </h2>
        <div class="flex flex-col gap-2 sm:flex-col items-center">
          <input
            v-model="selectedCityId"
            type="number"
            placeholder="Enter City ID"
            id="cityId"
            min="0"
            class="p-3 text-sm rounded-full border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300 flex-grow" />
          <button
            @click="getProvinceName"
            class="px-4 py-2 bg-green-500 w-full text-sm text-white rounded-full hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300">
            Get Province
          </button>
        </div>
        <p v-if="provinceName" class="mt-3 text-sm text-gray-800">
          {{ provinceName }}
        </p>
        <p v-else class="mt-3 text-sm text-gray-600">No province name found.</p>
      </div>

      <div
        class="min-h-screen flex-1 w-full bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-bold mb-2 uppercase text-yellow-800">
          Sort Provinces
        </h2>
        <div class="flex flex-col gap-2 sm:flex-col items-center">
          <select
            v-model="selectedSortOrder"
            id="sortOrder"
            class="p-3 rounded-full text-sm border border-gray-300 w-full focus:outline-none focus:ring focus:border-blue-300">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button
            @click="sortProvinces"
            class="px-4 py-2 bg-yellow-500 text-sm w-full text-white rounded-full hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 transition duration-300">
            Sort
          </button>
        </div>
        <ul v-if="sortedProvinces.length" class="mt-3 text-sm text-gray-800">
          <li
            class="pt-2"
            v-for="(province, index) in sortedProvinces"
            :key="index">
            {{ province.name }}
          </li>
        </ul>
        <p v-else class="mt-3 text-sm text-gray-600">
          No provinces to display.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import provinceData from "../assets/js/province.js";
import cityData from "../assets/js/city.js";

export default {
  data() {
    return {
      selectedProvinceId: null,
      selectedCityId: null,
      selectedSortOrder: "asc",
      cities: [],
      provinceName: null,
      sortedProvinces: [],
    };
  },
  methods: {
    getCities() {
      const provinceId = this.selectedProvinceId;
      if (provinceId) {
        this.cities = cityData.filter(
          (city) => city.provinsi_id === provinceId
        );
      } else {
        this.cities = [];
      }
    },
    getProvinceName() {
      const cityId = this.selectedCityId;
      if (cityId) {
        const city = cityData.find((city) => city.id === cityId);
        if (city) {
          const province = provinceData.find(
            (province) => province.id === city.provinsi_id
          );
          if (province) {
            this.provinceName = province.name;
            return;
          }
        }
      }
      this.provinceName = null;
    },
    sortProvinces() {
      const order = this.selectedSortOrder;
      if (order === "asc") {
        this.sortedProvinces = provinceData.slice().sort((a, b) => {
          return a.id - b.id || a.name.localeCompare(b.name);
        });
      } else if (order === "desc") {
        this.sortedProvinces = provinceData.slice().sort((a, b) => {
          return b.id - a.id || b.name.localeCompare(a.name);
        });
      }
    },
  },
};
</script>

<style></style>

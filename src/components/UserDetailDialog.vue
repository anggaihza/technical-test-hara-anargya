<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    v-if="showDialog"
    style="background-color: rgba(0, 0, 0, 0.1)">
    <div class="bg-white relative w-[555px] h-[436px] rounded-lg p-4 shadow-lg">
      <button
        @click="closeDialog"
        class="absolute top-2 right-3 font-medium text-[#FA1212] text-xl hover:text-gray-600">
        X
      </button>
      <div>
        <div class="flex items-center mt-6 ml-7 font-medium">
          <div class="mr-4 text-[#080808]">
            <img
              :src="user.profile_picture"
              width="150"
              height="150"
              alt="Profile Picture"
              class="w-150 h-150 rounded-full" />
          </div>

          <div>
            <h2 class="font-semibold text-left text-[40px]">
              {{ user.first_name }} {{ user.last_name }}
            </h2>
            <p class="text-xl -mt-3 text-left">{{ user.email }}</p>
            <p class="text-xl -mt-1 text-left">{{ user.phone }}</p>
          </div>
        </div>
        <div class="mt-4 ml-7 text-left space-y-1 pr-5">
          <p class="text-base text-[#080808] border-b border-gray-300">
            <span class="font-medium">Street:</span> {{ user.street }},
            {{ user.zipcode }}
          </p>
          <p class="text-base text-[#080808] border-b border-gray-300">
            <span class="font-medium">Gender:</span> {{ user.gender }}
          </p>
          <p class="text-base text-[#080808] border-b border-gray-300">
            <span class="font-medium">Date of Birth:</span>
            {{ formatDateOfBirth(user.date_of_birth) }}
          </p>
          <p class="text-base text-[#080808] border-b border-gray-300">
            <span class="font-medium">Job:</span> {{ user.job }}
          </p>
          <p class="text-base text-[#080808] border-b border-gray-300">
            <span class="font-medium">Country:</span> {{ user.country }}
          </p>
          <p class="text-base text-[#080808] border-b border-gray-300">
            <span class="font-medium">State:</span> {{ user.state }}
          </p>
          <p class="text-base text-[#080808] border-b border-gray-300">
            <span class="font-medium">City:</span> {{ user.city }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    user: Object,
    showDialog: Boolean,
  },
  watch: {
    showDialog(newValue) {
      console.log("showDialog:", newValue);
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    formatDateOfBirth(dateOfBirth) {
      if (dateOfBirth) {
        return dayjs(dateOfBirth).format("DD/MM/YYYY");
      }
      return "";
    },
  },
};
</script>

<style scoped></style>

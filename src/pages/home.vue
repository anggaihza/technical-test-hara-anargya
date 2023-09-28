<template>
  <!-- content 1 -->
  <MainStatus />

  <!-- content 2 -->
  <div class="mt-8 max-w-[1087px] pb-20">
    <div
      class="bg-white rounded-t-[10px]"
      style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2)">
      <div class="flex h-[69px]">
        <h1 class="text-left ml-7 text-2xl text-[17px] my-auto font-semibold">
          User List
        </h1>
      </div>

      <div class="bg-white overflow-x-auto">
        <div class="min-w-full overflow-hidden">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-100 h-[49px] text-[#7C7C7C]">
              <tr class="text-[#7C7C7C]">
                <th
                  class="px-6 py-3 text-left text-xs leading-4 font-medium tracking-wider">
                  ID
                </th>
                <th
                  class="pr-6 py-3 text-left text-xs leading-4 font-medium tracking-wider">
                  User
                </th>
                <th
                  class="px-6 py-3 text-left text-xs leading-4 font-medium tracking-wider">
                  Date Of Birth
                </th>
                <th
                  class="px-6 py-3 text-left text-xs leading-4 font-medium tracking-wider">
                  Email
                </th>
                <th
                  class="pr-6 py-3 text-left text-xs leading-4 font-medium tracking-wider">
                  Job
                </th>
                <th
                  class="px-6 py-3 text-left text-xs leading-4 font-medium tracking-wider">
                  Country
                </th>
                <th
                  class="px-6 py-3 text-left text-xs leading-4 font-medium tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              <tr
                class="text-left h-[49px] border-b my-auto border-gray-200 text-[#080808]"
                v-for="(user, index) in userList"
                :key="index">
                <td class="px-6 text-xs whitespace-no-wrap">
                  {{ user.id }}
                </td>
                <td class="pr-7 text-xs whitespace-no-wrap text-center">
                  <div class="flex items-center">
                    <div>
                      <img
                        :src="user.profile_picture"
                        alt="Profile Picture"
                        class="w-6 h-6 rounded-full mr-2" />
                    </div>
                    <div class="font-medium w-full text-left ml-2">
                      {{ user.first_name }} {{ user.last_name }}
                    </div>
                  </div>
                </td>
                <td class="px-6 text-xs whitespace-no-wrap text-[#686868]">
                  {{ formatDateOfBirth(user.date_of_birth) }}
                </td>
                <td class="px-6 text-xs whitespace-no-wrap font-medium">
                  {{ user.email }}
                </td>
                <td
                  class="pr-6 text-xs whitespace-no-wrap text-[#686868] font-normal">
                  {{ user.job }}
                </td>
                <td class="px-6 text-xs whitespace-no-wrap font-medium">
                  {{ user.country }}
                </td>
                <td class="whitespace-no-wrap text-center pr-[10px]">
                  <div class="flex justify-center">
                    <button
                      class="px-3 mr-[10px] h-[22px] text-[10px] rounded font-medium transition-transform transform active:scale-95 focus:outline-none focus:ring focus:ring-blue-200 hover:bg-gray-50"
                      style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25)">
                      Select
                    </button>
                    <button
                      @click="showDetailDialog(user)"
                      class="px-3 h-[22px] text-[10px] rounded font-medium w-full transition-transform transform active:scale-95 focus:outline-none focus:ring focus:ring-blue-200 hover:bg-gray-50"
                      style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25)">
                      View Detail
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog -->
  <UserDetailDialog
    :user="selectedUser"
    :showDialog="isDetailDialogVisible"
    @close-dialog="closeDetailDialog" />
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import MainStatus from "../components/MainStatus.vue";
import UserDetailDialog from "../components/UserDetailDialog.vue";

export default {
  data() {
    return {
      userList: [],
      selectedUser: null,
      isDetailDialogVisible: false,
    };
  },
  methods: {
    async fetchUserList() {
      try {
        let response = await axios.get(
          "https://api.slingacademy.com/v1/sample-data/users"
        );
        this.userList = response.data.users;
      } catch (error) {
        console.error("Error", error);
      }
    },
    formatDateOfBirth(dateOfBirth) {
      if (dateOfBirth) {
        return dayjs(dateOfBirth).format("DD / MM / YYYY");
      }
      return "";
    },
    showDetailDialog(user) {
      this.selectedUser = user;
      this.isDetailDialogVisible = true;
    },
    closeDetailDialog() {
      this.selectedUser = null;
      this.isDetailDialogVisible = false;
    },
  },
  mounted() {
    this.fetchUserList();
  },
  components: {
    MainStatus,
    UserDetailDialog,
  },
};
</script>

<style></style>

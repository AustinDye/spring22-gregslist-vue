<template>
  <div class="container-fluid">
    <div v-if="house">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <img
            :src="house.imgUrl"
            :alt="`${house.bedrooms} ${house.bathrooms} ${house.levels}`"
            class="img-fluid"
          />
          <div class="p-2" v-if="house.creatorId === account.id">
            <i
              class="mdi mdi-pencil selectable"
              data-bs-toggle="modal"
              data-bs-target="#edit-house-modal"
            ></i>
            <i class="mdi mdi-delete ms-2 selectable" @click="deleteHouse()"></i>
          </div>
          <div class="d-flex justify-content-between p-2">
            <h5>{{ house.bedrooms }}</h5>
            <h5>{{ house.bathrooms }}</h5>
            <h5>{{ house.levels }}</h5>
            <h5>{{ house.price }}</h5>
          </div>
          <div class="d-flex p-2">
            <p>{{ house.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>..Waaaaaait a sec</h1>
    </div>
  </div>

  <Modal id="edit-house-modal">
    <template #modal-title-slot>
      <h3>Edit house!</h3>
    </template>
    <template #modal-body-slot>
      <HouseForm :house="house" />
    </template>
  </Modal>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
import { housesService } from '../services/HousesService'
export default {
  setup() {
    const route = useRoute()  
    const router = useRouter()
    onMounted(async () => {
      try {
        AppState.house = null
        await housesService.getHouseById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      async deleteHouse() {
        try {
          if (await Pop.confirm()) {
            await housesService.deleteHouse(route.params.id)
            Pop.toast("Outa Here!", "success")
            router.push({ name: "HousesPage" })
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      },
      house: computed(() => AppState.house),
      account: computed(() => AppState.account),
    }
  },
}
</script>


<style lang="scss" scoped>
</style>

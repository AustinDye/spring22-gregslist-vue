<template>
 <div class="col-md-3 my-2">
  <div>
   <router-link :to="{ name:'HouseDetails', params: { id: house.id }}">
    <img :src="house.imgUrl" :alt="`${house.price}`" class="img-fluid"/>
   </router-link>
  </div>
 </div>
</template>


<script>
import { House } from '../models/House'
export default {
 props: {
  house: {
   type: House,
   required: true
  },
 },
 setup(){
  return {}
 }
}
</script>


<style lang="scss" scoped>

</style>
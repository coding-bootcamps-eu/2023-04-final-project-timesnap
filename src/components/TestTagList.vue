<template>
  <ul>
    <li v-for="timeStamp in timeStamps" v-bind:key="timeStamp.timeStart">
      <div>{{ timeStamp.timeStart }} - {{ timeStamp.stampTitle }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["timeStamps"],
};
</script>

<script setup>

const props = defineProps({
  hidescrollbar: Boolean
})

</script>

<template>
  <div class="main-container">
    <div class="content-wrapper">
      <div class="overflow-container" :class="{
        'hide-scrollbar': hidescrollbar,
      }">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The main container */
.main-container {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Hide for Chrome */
}

.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* this is the flex container that will take the rest of the height */
.content-wrapper {
  display: flex;
  flex: 1;
  min-height: 0px;
  /* IMPORTANT: you need this for non-chrome browsers */
}

/* the container for our overflowed content */
.overflow-container {
  flex: 1;
  overflow: auto;
}
</style>

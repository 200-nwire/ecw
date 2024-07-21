<template>
  <div>
    <Image
      alt="Image"
      class="h-full flex justify-start"
      preview
      @show="getImage"
      :pt="preset"
      :pt-options="{ mergeSections: false, mergeProps: true }"
    >
      <template #indicatoricon>
        <Camera :size="16" />
      </template>
      <template
        #image
        class="h-full"
      >
        <Camera :size="16" />
      </template>
      <template #preview="slotProps">
        <img
          :src="imageSrc"
          alt="preview"
          :style="slotProps.style"
        />
      </template>
    </Image>
  </div>
</template>

<script setup lang="ts">
import { Camera } from 'lucide-vue-next'
import axios from 'axios'
import { ref } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: false,
  },
  rowData: {
    type: {} as any,
    default: {},
  },
})

const imageSrc = ref('')
const error = ref(false)

const getImage = async () => {
  console.log('props.image :>> ', props.image)
  axios
    .get(`${import.meta.env.VITE_IMAGE_LOADER_SERVICE}?image=${props.image}`)
    .then(addImage)
    .catch(addErrorImage)
}

const addImage = res => {
  if (res.data.indexOf('PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy') === 0 || res.data.indexOf('VGhlIHJlc291cmNlIHl') === 0)
    addErrorImage()
  else imageSrc.value = 'data:image/png;base64,' + res.data
}

const addErrorImage = () => {
  error.value = true
}

const preset = {
  button: {
    class: [
      // States
      'hover:bg-neutral cursor-pointer',
      { '!bg-table-highlight-orange hover:!bg-table-highlight-orange-hover': props.rowData?.isPremium },
      { '!bg-table-highlight-red hover:!bg-table-highlight-red-hover': props.rowData?.today > 1 },
    ],
  },
}
</script>

<!-- fixme image not showing -->

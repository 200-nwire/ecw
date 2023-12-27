<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay()

const emit = defineEmits(['card-clicked'])

const props = defineProps({
  listDefinition: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  rightBorder: {
    type: Object,
    required: false,
  }
})
</script>

<template>
  <div class="list">
    <div v-if="!smAndDown" class="list-header flex py-4 px-6 gap-3" :class="rightBorder && 'mr-[8px]'">
      <div v-for="group in (listDefinition as any)" :key="group.id" class="flex gap-4" :style="{ 'flex': group.flex }">
        <div v-for="item in group.items" :key="item.id" :style="{ 'flex': item.flex }" :class="[item.classTitle]"
          class="text-[#616A82] flex font-bold">
          {{ item.title }}</div>
      </div>
    </div>
    <div class="flex flex-col h-full flex-1 overflow-y-auto gap-3">
      <div v-for="info in (data as any)" :key="info.id" class="card py-6 px-6 flex bg-[#FFF] gap-3 align-center"
        :class="[smAndDown ? 'flex-col' : '', rightBorder && `border-r-[8px] border-r-solid border-r-[${rightBorder.colorOptions[info[rightBorder.dataId]]}]`]"
        @click="emit('card-clicked', info.id)">
        <div v-for="group in (listDefinition as any)" :key="group.id" class="flex gap-4 align-center" :class="group.class"
          :style="{ 'flex': group.flex }">
          <div v-for="item in group.items" :key="item.id" class="flex text-pretty" :class="[item.class]"
            :style="{ 'flex': item.flex }">
            <label v-if="item.text">{{ item.text }}</label>
            <span v-if="!item.isArray">
              {{ info[item.id] }}
            </span>
            <div v-if="item.isArray" class="flex flex-col gap-1">
              <span v-for="innerItem in info[item.id].split('|')">
                <v-icon v-if="item.isIcon" :icon="item.icon" :color="innerItem"></v-icon>
                <span v-else>{{ innerItem }}</span>
              </span>
            </div>
            <v-icon v-if="item.icon && !item.isArray" :icon="item.icon" :color="item.iconColor"></v-icon>
            <v-btn v-if="item.button">{{ item.button.label }}</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 2px 4px 0px #D7E0FA;
  border-radius: 5px;

  div {
    position: relative;

    label {
      position: absolute;
      color: #616A82;
      font-size: small;
      background-color: #FFF;
      top: -0.9em;
      right: 0.3em;
      padding: 0 4px;
    }
  }

}
</style>

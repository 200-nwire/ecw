<template>
  <div class="flex flex-1 relative">
    <div class="absolute h-full w-full flex">
      <div class="flex flex-1 min-h-0 w-full">
        <div class="flex-1 overflow-auto">
          <div class="h-full">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import SearchInput from '@/components/SearchInput.vue'
import { Ellipsis, AlarmClockCheck, AlignLeft, Cctv } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

const textValue = ref('rotem')

const fonts = {
  'headline-1': 'text-headline-1',
  'headline-2': 'text-headline-2',
  'headline-3': 'text-headline-3',
  'headline-3-semi': 'text-headline-3-semi',
  'body-1': 'text-body-1',
  'body-1-semi': 'text-body-1-semi',
  'body-1-bold': 'text-body-1-bold',
  'body-2': 'text-body-2',
  'body-2-semi': 'text-body-2-semi',
}
</script>

<template>
  <div class="flex flex-col flex-1 h-full w-full overflow-y-auto gap-5 p-10 bg-[#c0c0c0]">
    <div class="flex flex-1 flex-col gap-8 p-7 border border-primary rounded bg-white">
      <label class="text-xl">טקסטים</label>
      <div class="flex flex-1 gap-2xl">
        <BaseInput
          label="כותרת שדה"
          placeholder="טקסט"
        />
        <BaseInput
          label="כותרת שדה"
          placeholder="טקסט"
          v-model="textValue"
        />
        <BaseInput
          label="כותרת שדה"
          placeholder="טקסט"
          invalid
          invalidMessage="טקסט"
        />
        <SearchInput
          placeholder="חיפוש מהיר של לקוח"
          rounded
        />
      </div>
    </div>
    <div class="flex flex-1 flex-col gap-8 p-7 border border-primary rounded bg-white">
      <label class="text-xl">כפתורים</label>
      <div class="flex flex-1 gap-2xl">
        <div>
          <Button
            label="כפתור"
            size="small"
          />
        </div>
        <div>
          <Button size="small"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="small"
            text
          />
        </div>
        <div>
          <Button
            size="small"
            text
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="small"
            severity="light"
          />
        </div>
        <div>
          <Button
            size="small"
            severity="light"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="small"
            severity="neutral"
          />
        </div>
        <div>
          <Button
            size="small"
            severity="neutral"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="small"
            severity="neutral"
            outlined
          />
        </div>
        <div>
          <Button
            size="small"
            severity="neutral"
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="small"
            outlined
          />
        </div>
        <div>
          <Button
            size="small"
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
      </div>
      <div class="flex flex-1 gap-2xl">
        <div>
          <Button
            label="כפתור"
            size="small"
            rounded
          />
        </div>
        <div>
          <Button
            size="small"
            rounded
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="small"
            text
            rounded
          />
        </div>
        <div>
          <Button
            size="small"
            text
            rounded
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            size="small"
            severity="light"
          />
        </div>
        <div>
          <Button
            size="small"
            rounded
            severity="light"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            size="small"
            severity="neutral"
          />
        </div>
        <div>
          <Button
            size="small"
            rounded
            severity="neutral"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            size="small"
            severity="neutral"
            outlined
          />
        </div>
        <div>
          <Button
            size="small"
            rounded
            severity="neutral"
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            size="small"
            outlined
          />
        </div>
        <div>
          <Button
            size="small"
            rounded
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
      </div>
      <div class="flex flex-1 gap-2xl">
        <div><Button label="כפתור" /></div>
        <div>
          <Button
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            text
          />
        </div>
        <div>
          <Button text
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            severity="light"
          />
        </div>
        <div>
          <Button severity="light"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            severity="neutral"
          />
        </div>
        <div>
          <Button severity="neutral"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            severity="neutral"
            outlined
          />
        </div>
        <div>
          <Button
            severity="neutral"
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            outlined
          />
        </div>
        <div>
          <Button outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
      </div>
      <div class="flex flex-1 gap-2xl">
        <div>
          <Button
            label="כפתור"
            rounded
          />
        </div>
        <div>
          <Button rounded
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            text
            rounded
          />
        </div>
        <div>
          <Button
            text
            rounded
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            severity="light"
          />
        </div>
        <div>
          <Button
            rounded
            severity="light"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            severity="neutral"
          />
        </div>
        <div>
          <Button
            rounded
            severity="neutral"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            severity="neutral"
            outlined
          />
        </div>
        <div>
          <Button
            rounded
            severity="neutral"
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            outlined
          />
        </div>
        <div>
          <Button
            rounded
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
      </div>
      <div class="flex flex-1 gap-2xl">
        <div>
          <Button
            label="כפתור"
            size="large"
          />
        </div>
        <div>
          <Button size="large"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="large"
            text
          />
        </div>
        <div>
          <Button
            size="large"
            text
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="large"
            severity="light"
          />
        </div>
        <div>
          <Button
            size="large"
            severity="light"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="large"
            severity="neutral"
          />
        </div>
        <div>
          <Button
            size="large"
            severity="neutral"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="large"
            severity="neutral"
            outlined
          />
        </div>
        <div>
          <Button
            size="large"
            severity="neutral"
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="large"
            outlined
          />
        </div>
        <div>
          <Button
            size="large"
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
      </div>
      <div class="flex flex-1 gap-2xl">
        <div>
          <Button
            label="כפתור"
            size="large"
            rounded
          />
        </div>
        <div>
          <Button
            size="large"
            rounded
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            size="large"
            text
            rounded
          />
        </div>
        <div>
          <Button
            size="large"
            text
            rounded
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            size="large"
            severity="light"
          />
        </div>
        <div>
          <Button
            size="large"
            rounded
            severity="light"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            size="large"
            severity="neutral"
          />
        </div>
        <div>
          <Button
            size="large"
            rounded
            severity="neutral"
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            size="large"
            severity="neutral"
            outlined
          />
        </div>
        <div>
          <Button
            size="large"
            rounded
            severity="neutral"
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
        <div>
          <Button
            label="כפתור"
            rounded
            size="large"
            outlined
          />
        </div>
        <div>
          <Button
            size="large"
            rounded
            outlined
            ><template #icon><AlarmClockCheck /></template
          ></Button>
        </div>
      </div>
      <div class="flex flex-1 gap-2xl">
        <div>
          <Button
            size="small"
            severity="neutral"
            text
            raised
            ><template #icon><Cctv :size="20" /></template
          ></Button>
        </div>
        <div>
          <Button
            severity="neutral"
            text
            raised
            ><template #icon><Cctv :size="20" /></template
          ></Button>
        </div>
        <div>
          <Button
            size="large"
            severity="neutral"
            text
            raised
            ><template #icon><Cctv :size="20" /></template
          ></Button>
        </div>
      </div>
    </div>
    <!-- <Button label="rotem" text size="lg">
      <Ellipsis
        class="text-primary-800"
      />
    </Button> -->
    <!-- <IconField iconPosition="left">
      <InputIcon @click="showPassword = !showPassword" class="cursor-pointer">
        <Eye v-if="!showPassword" :color="colors.grey[300]" :size="20" />
        <EyeOff v-else :color="colors.grey[300]" :size="20" />
      </InputIcon>
      <InputText v-model="password" id="password1" :type="showPassword ? 'text' : 'password'" class="w-full" />
    </IconField> -->
    <div class="flex flex-1 flex-col gap-3 p-7 border border-primary rounded bg-white">
      <div
        v-for="font in Object.keys(fonts)"
        class="flex flex-1"
      >
        <label class="w-[15rem]">{{ font }}</label>
        <div :class="fonts[font]">ליהודים הייתה אורה ושמחה וששון ויקר</div>
      </div>
    </div>
    <!-- <section class="bg-orange-500 text-primary-900 p-10 flex flex-col gap-8 rounded-full">
      <h1 class="text-4xl font-bold text-center">Tailwind CSS + PrimeVue</h1>
      <Panel
        header="דוגמא ראשונה!"
        dark
      >
        <p>
          הפאנל הראשון! יאיי איזה כיף
        </p>
        <Button
          label="טסט!"
          icon="pi pi-check"
          iconPos="right"
        />
      </Panel>
      <div class="flex justify-center">
        <Calendar
          v-model="date"
          dir="rtl"
          dark
        />
      </div>

      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
      >
        <Column
          field="code"
          header="קוד"
        ></Column>
        <Column
          field="name"
          header="שם"
        ></Column>
        <Column
          field="category"
          header="קטגוריה"
        ></Column>
        <Column
          field="quantity"
          header="כמות"
        ></Column>
      </DataTable>
    </section> -->
  </div>
</template>

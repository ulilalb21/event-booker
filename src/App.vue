<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ScheduleView from './components/ScheduleView.vue'

type DayItem = { isActive: boolean, slots: Slot[] }
type Slot = { start: string, end: string }
export type BookData = Ref<Record<string, DayItem>>

const durations = [15, 30, 45, 60, 90]
const selectedDuration = ref(durations[0])
const videoCallAvailability = ref(false)
const numberOfBookingPerSession = ref(1)
const viewCalendar = ref(false)

const bookData: BookData = ref({
  mon: {
    isActive: false,
    slots: []
  },
  tue: {
    isActive: false,
    slots: []
  },
  wed: {
    isActive: false,
    slots: [
    ]
  },
  thu: {
    isActive: false,
    slots: [
    ]
  },
  fri: {
    isActive: false,
    slots: [
    ]
  },
  sat: {
    isActive: false,
    slots: [
    ]
  },
  sun: {
    isActive: false,
    slots: []
  },
})

const slotHours = [
  '07:00',
  '07:15',
  '07:30',
  '07:45',
  '08:00',
  '08:15',
  '08:30',
  '08:45',
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
  '18:30',
  '18:45',
  '19:00',
]
function handleDaySelect(dayItem: DayItem) {
  if (dayItem.isActive && !dayItem.slots.length) {
    dayItem.slots.push({
      start: '09:00',
      end: calculateEndSlot('09:00', selectedDuration.value),
    })
  }
}

function addSlotAfterIndex(dayItem: DayItem, index: number) {
  const start = dayItem.slots[index].end
  dayItem.slots.splice(index + 1, 0, {
    start,
    end: calculateEndSlot(start, selectedDuration.value),
  })
}

function removeSlot(dayItem: DayItem, index: number) {
  dayItem.slots.splice(index, 1)

  if (dayItem.slots.length === 0) {
    dayItem.isActive = false
  }
}

function resetAllSlot() {
  for (const day in bookData.value) {
    bookData.value[day].slots = []
    bookData.value[day].isActive = false
  }
}

function calculateEndSlot(start: string, durationMinute: number) {
  const [hour, minute] = start.split(':')

  const endMinute = (+minute + durationMinute) % 60
  const endHour = (+hour + Math.floor((+minute + durationMinute) / 60)) % 24
  return `${endHour < 10 ? `0${endHour}` : endHour}:${endMinute ? endMinute : '00'}`
}

function updateSlotEnd(dayItem: DayItem, index: number) {
  const slot = dayItem.slots[index]
  slot.end = calculateEndSlot(slot.start, selectedDuration.value)
}
</script>

<template>
  <div>Visit Duration</div>
  <select name="visit-duration" id="visit-duration" v-model="selectedDuration" @change="resetAllSlot()">
    <option v-for="duration in durations" :key="duration" :value="duration">{{ duration }} min</option>
  </select>
  <input type="checkbox" name="video-call-availability" id="video-call-availability" v-model="videoCallAvailability"/>
  <label for="video-call-availability">Allow video tour call</label>
  <div>Number of Booking / Session</div>
  <input type="number" name="number-of-booking-per-session" id="number-of-booking-per-session" v-model="numberOfBookingPerSession"/>

  <div>
    <button @click="viewCalendar = !viewCalendar">View Calendar</button>
    <div>Availability</div>
    <div>Set your weekly recurring schedule</div>

    <div v-for="(item, key) in bookData" :key="key">
      <input type="checkbox" name="`is-${day}-active`" :id="`is-${key}-active`" v-model="item.isActive" @change="handleDaySelect(item)"/>
      <div class="text-bold">{{ key }}</div>
      <div v-if="!item.isActive">
        Unavailable
      </div>
      <div v-else>
        <div v-for="(slot, index) in item.slots" :key="index">
          <div>
            <select v-model="slot.start" @change="updateSlotEnd(item, index)">
              <option v-for="slotHour in slotHours" :key="slotHour" :value="slotHour">{{ slotHour }}</option>
            </select>
            - {{ slot.end }}
          </div>
          <button @click="addSlotAfterIndex(item, index)">Add</button>
          <button @click="removeSlot(item, index)">Remove</button>
        </div>
      </div>
    </div>
  </div>
  <ScheduleView v-if="viewCalendar" :duration="selectedDuration" :book-data="bookData" :video-call-availability="videoCallAvailability" :number-of-booking-per-session="numberOfBookingPerSession"/>
</template>

<style scoped>
</style>

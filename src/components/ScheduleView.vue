<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import type { CalendarOptions } from '@fullcalendar/core';
import TimeGridPlugin from '@fullcalendar/timegrid'
import type { BookData } from '../App.vue';

const props = defineProps({
  bookData: {
    type: Object,
    default: () => ({} as BookData)
  },
  videoCallAvailability: {
    type: Boolean,
    default: false
  },
  numberOfBookingPerSession: {
    type: Number,
    default: 1
  },
  duration: {
    type: Number,
    default: 15
  }
})

const calendarOptions: CalendarOptions = {
  initialView: 'timeGridWeek',
  slotMinTime: '07:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '00:15:00',
  slotLabelInterval: `00:${props.duration}:00`,
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
  },
  plugins: [TimeGridPlugin],
}
</script>
<template>
<div class="text-center text-2xl font-bold my-4">
  Schedule Viewer
</div>
<FullCalendar :options="calendarOptions" />
</template>
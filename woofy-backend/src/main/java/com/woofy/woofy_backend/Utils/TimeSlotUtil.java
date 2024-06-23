package com.woofy.woofy_backend.Utils;

import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DogSitterScheduleEntity;
import com.woofy.woofy_backend.Models.Entities.ScheduleEntities.BusinessTypesScheduleEntities.DogWalkerScheduleEntity;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class TimeSlotUtil {
    public static List<TimeSlot> generateSlotsByMinutes(LocalTime startTime, LocalTime endTime, int appointmentLength) {
        List<TimeSlot> timeSlots = new ArrayList<>();
        LocalTime slotStart = startTime;

        while (slotStart.isBefore(endTime)) {
            LocalTime slotEnd = slotStart.plusMinutes(appointmentLength);
            if (slotEnd.isAfter(endTime)) {
                slotEnd = endTime;
            }
            timeSlots.add(new TimeSlot(slotStart, slotEnd));
            slotStart = slotEnd;
        }

        return timeSlots;
    }

    public static List<TimeSlot> createTimeSlotsFromSchedulesDogSitter(Optional<List<DogSitterScheduleEntity>> optionalSchedules) {
        List<TimeSlot> availableTimeSlots = new ArrayList<>();
        if (optionalSchedules.isPresent()) {
            List<DogSitterScheduleEntity> schedules = optionalSchedules.get();
            for (DogSitterScheduleEntity schedule : schedules) {
                TimeSlot timeSlot = new TimeSlot();
                timeSlot.setStartTime(schedule.getStartTime());
                timeSlot.setEndTime(schedule.getEndTime());
                availableTimeSlots.add(timeSlot);
            }
        }
        return availableTimeSlots;
    }

    public static List<TimeSlot> createTimeSlotsFromSchedulesDogWalker(Optional<List<DogWalkerScheduleEntity>> optionalSchedules) {
        List<TimeSlot> availableTimeSlots = new ArrayList<>();
        if (optionalSchedules.isPresent()) {
            List<DogWalkerScheduleEntity> schedules = optionalSchedules.get();
            for (DogWalkerScheduleEntity schedule : schedules) {
                TimeSlot timeSlot = new TimeSlot();
                timeSlot.setStartTime(schedule.getStartTime());
                timeSlot.setEndTime(schedule.getEndTime());
                availableTimeSlots.add(timeSlot);
            }
        }
        return availableTimeSlots;
    }
}

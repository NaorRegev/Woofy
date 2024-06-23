package com.woofy.woofy_backend.Utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TimeSlot {
    private LocalTime startTime;
    private LocalTime endTime;

}

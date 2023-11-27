import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";

const StyledClanendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem;
  gap: 5rem;
  max-width: 1200px;
  min-height: 100vh;
`;

const Calendar = () => {
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([]);

  return (
    <StyledClanendarContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          variant="static"
          orientation="portrait"
          value={value}
          disableFuture
          onChange={(newValue) => setValue(newValue)}
          renderInput={(params) => {
            <TextField {...params} />;
          }}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.getDate()) >= 0;

            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={
                  isSelected ? <CheckIcon color="red" /> : undefined
                }
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
      </LocalizationProvider>
    </StyledClanendarContainer>
  );
};

export default Calendar;

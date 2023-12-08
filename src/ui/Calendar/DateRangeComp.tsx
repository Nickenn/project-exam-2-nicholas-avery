import { useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";

import { TextField } from "@mui/material";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeComp = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <div className="calendarWrap">
      <TextField
        value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )}`}
        inputProps={{ readOnly: true }}
        className="inputBox"
      />
      <DateRange
        onChange={(item: any) => setRange([item.selection])}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        ranges={range}
        months={1}
        direction="vertical"
        className="calendarElement"
      />
    </div>
  );
};

export default DateRangeComp;

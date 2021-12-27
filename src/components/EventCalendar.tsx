import React, { FC } from "react";
import { Calendar, Badge } from "antd";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  function dateCellRender(value: Moment) {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = props.events.filter(
      (event: IEvent) => event.date === formatedDate
    );

    return (
      <div>
        {currentDayEvents.map((event, index) => (
          <div key={index}>
            <Badge status="success" text={event.description} />
          </div>
        ))}
      </div>
    );
  }

  return <Calendar dateCellRender={dateCellRender} />;
};

export default EventCalendar;

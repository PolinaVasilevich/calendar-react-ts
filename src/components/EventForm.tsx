import React, { FC, useState } from "react";
import { Form, Input, DatePicker, Button, Row, Select } from "antd";

import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const { user } = useTypedSelector((state) => state.auth);

  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  } as IEvent);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date?.toDate()) });
    }
  };

  const submitForm = () => {
    const newEvent = {
      ...event,
      author: user.username,
    };

    props.submit(newEvent);
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item name="description" rules={[rules.required()]}>
        <Input
          placeholder="Enter description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="date"
        rules={[
          rules.required(),
          rules.isDateAfter("You can't create an event this date"),
        ]}
      >
        <DatePicker
          style={{ width: "100%" }}
          onChange={(date) => selectDate(date)}
        />
      </Form.Item>

      <Form.Item name="guest" rules={[rules.required()]}>
        <Select
          placeholder="Select a option and change input text above"
          style={{ width: "100%" }}
          onChange={(guest: string) => setEvent({ ...event, guest })}
        >
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row justify="center">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;

import React, { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";

import { Button, Layout, Modal, Row } from "antd";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { guests, events } = useTypedSelector((state) => state.event);
  const { user } = useTypedSelector((state) => state.auth);

  const changeModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const { fetchGuests, fetchEvents, createEvent } = useActions();

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const submit = (event: IEvent) => {
    createEvent(event);
    setModalVisible(false);
  };

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={changeModalVisible}>Add event</Button>
      </Row>
      <Modal
        title="Add event"
        visible={modalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <EventForm guests={guests} submit={submit} />
      </Modal>
    </Layout>
  );
};

export default Event;

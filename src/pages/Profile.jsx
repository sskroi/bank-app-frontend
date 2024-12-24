import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { getUserInfo } from "../http/userAPI";
import Button1 from "../components/UI/buttons/Button1";

const Profile = () => {
  const [u, setU] = useState({});

  const [loading, setLoading] = useState(true);
  const fetchUserInfo = () => {
    getUserInfo()
      .then((data) => {
        setU(data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const [editing, setEditing] = useState(false);

  useEffect(fetchUserInfo, []);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 flex-column gap-3">
      <h2 style={{ color: "var(--primary-text-color)" }}>
        Профиль пользователя
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <Form className={styles.profileForm}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={u.email}
                  onChange={(e) => setU({ ...u, email: e.target.value })}
                  type="email"
                  disabled={!editing}
                  placeholder="example@example.com"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  value={u.surname}
                  onChange={(e) => setU({ ...u, surname: e.target.value })}
                  type="text"
                  disabled={!editing}
                  placeholder="Иванов"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  value={u.name}
                  onChange={(e) => setU({ ...u, name: e.target.value })}
                  type="text"
                  disabled={!editing}
                  placeholder="Иван"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Отчество</Form.Label>
                <Form.Control
                  value={u.patronymic}
                  onChange={(e) => setU({ ...u, patronymic: e.target.value })}
                  type="text"
                  disabled={!editing}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Паспортные данные</Form.Label>
                <Form.Control
                  value={u.passport}
                  onChange={(e) => setU({ ...u, passport: e.target.value })}
                  type="text"
                  disabled={!editing}
                  placeholder="1234 567890"
                />
              </Form.Group>
              <Button1 onClick={() => setEditing(true)}>Редактировать</Button1>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
};

export default Profile;

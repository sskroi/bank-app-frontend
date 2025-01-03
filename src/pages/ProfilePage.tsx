import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.scss";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { getUserInfo } from "../http/userAPI";
import Button1 from "../components/UI/buttons/Button1";
import { IUser } from "../types/types";

const ProfilePage = () => {
  const [u, setU] = useState<IUser | null>(null);

  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      setU(data);
    } catch (e) {
      console.log(e);
    }
  };

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 flex-column gap-3">
      <h2 style={{ color: "var(--primary-text-color)" }}>
        Профиль пользователя
      </h2>
      {u === null ? (
        <Spinner variant="light" />
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

export default ProfilePage;

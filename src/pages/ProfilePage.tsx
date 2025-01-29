import { useEffect, useRef, useState } from "react";
import styles from "./ProfilePage.module.scss";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { getUserInfo, updateUserProfile } from "../api/userAPI";
import Button1 from "../components/UI/buttons/Button1";
import { IUser } from "../types/types";
import Input1WithLabel from "../components/UI/inputs/Input1WithLabel";
import axios from "axios";

const ProfilePage = () => {
  const [u, setU] = useState<IUser | null>(null);
  const [password, setPassword] = useState({
    current: "",
    new: "",
    repeaetNew: "",
  });
  const userDataBackup = useRef<IUser | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const onEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    userDataBackup.current = u;
    setEditing(true);
  };
  const onSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (password.new !== password.repeaetNew) {
      setErrMsg("Пароли не совпадают");
      return;
    }

    const newProfileData = {
      ...u,
      password: password.new,
      currentPassword: password.current,
    };

    try {
      setIsUpdating(true);

      await updateUserProfile(newProfileData);
      fetchUserInfo();
      setErrMsg(null);
      setEditing(false);
      setPassword({ current: "", new: "", repeaetNew: "" });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setErrMsg("Неверный текущий пароль");
        } else if (err.response?.status === 409) {
          setErrMsg("Пользователь с таким email уже существует");
        } else {
          setErrMsg("Некорретные входные данные");
        }
      } else {
        console.error(err);
      }
    } finally {
      setIsUpdating(false);
    }
  };
  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditing(false);
    setU(userDataBackup.current);
    setPassword({ current: "", new: "", repeaetNew: "" });
    setErrMsg(null);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 flex-column gap-3">
      <h2 style={{ color: "var(--primary-text-color)" }}>
        Профиль пользователя
      </h2>
      {u === null ? (
        <Spinner style={{ color: "var(--primary-text-color)" }} />
      ) : (
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Input1WithLabel
                  labelValue="Email"
                  value={u.email}
                  onChange={(e) => setU({ ...u, email: e.target.value })}
                  type="email"
                  disabled={!editing}
                />
              </Form.Group>
              <Form.Group>
                <Input1WithLabel
                  labelValue="Фамилия"
                  value={u.surname}
                  onChange={(e) => setU({ ...u, surname: e.target.value })}
                  type="text"
                  disabled={!editing}
                />
              </Form.Group>
              <Form.Group>
                <Input1WithLabel
                  labelValue="Имя"
                  value={u.name}
                  onChange={(e) => setU({ ...u, name: e.target.value })}
                  type="text"
                  disabled={!editing}
                />
              </Form.Group>
              <Form.Group>
                <Input1WithLabel
                  labelValue="Отчество"
                  value={u.patronymic}
                  onChange={(e) => setU({ ...u, patronymic: e.target.value })}
                  type="text"
                  disabled={!editing}
                />
              </Form.Group>
              <Form.Group>
                <Input1WithLabel
                  labelValue="Паспортные данные"
                  value={u.passport}
                  onChange={(e) => setU({ ...u, passport: e.target.value })}
                  type="text"
                  disabled={!editing}
                />
              </Form.Group>

              {editing && (
                <>
                  <Form.Group>
                    <Input1WithLabel
                      labelValue="Новый пароль"
                      value={password.new}
                      onChange={(e) =>
                        setPassword({ ...password, new: e.target.value })
                      }
                      type="password"
                      placeholder="********"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Input1WithLabel
                      labelValue="Повтор нового пароля"
                      value={password.repeaetNew}
                      onChange={(e) =>
                        setPassword({ ...password, repeaetNew: e.target.value })
                      }
                      type="password"
                      placeholder="********"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Input1WithLabel
                      labelValue="Текущий пароль *"
                      value={password.current}
                      onChange={(e) =>
                        setPassword({ ...password, current: e.target.value })
                      }
                      type="password"
                      placeholder="********"
                    />
                  </Form.Group>
                </>
              )}

              {errMsg && <p className={styles.errMsg}>{errMsg}</p>}

              <div className={styles.btnsCont}>
                {isUpdating ? (
                  <Spinner
                    style={{
                      color: "var(--primary-text-color)",
                      margin: "4px auto",
                    }}
                  />
                ) : editing ? (
                  <>
                    <Button1
                      className={styles.btn}
                      style={{ width: "48%" }}
                      onClick={onSave}
                      disabled={password.current.length < 8}
                    >
                      Сохранить
                    </Button1>
                    <Button1
                      className={styles.btn}
                      style={{ width: "48%" }}
                      onClick={onCancel}
                    >
                      Отмена
                    </Button1>
                  </>
                ) : (
                  <Button1
                    className={styles.btn}
                    style={{ width: "100%" }}
                    onClick={onEdit}
                  >
                    Редактировать
                  </Button1>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
};

export default ProfilePage;

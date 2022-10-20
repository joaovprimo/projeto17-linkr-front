import styled from "styled-components";
import { Grid } from "react-loader-spinner";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

import {
  Container,
  BlackContainer,
  GrayContainer,
  Title,
  Description,
  Form,
  Input,
  Entrar,
  ErrorMessage,
  GoToSingUp,
} from "./SigninPage.js";
import { postSignup } from "../services/linkr";

export default function SignupPage() {
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: "",
  });
  const [disableForm, setDisableForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [corEntrar, setCorEntrar] = useState(1);
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(UserContext);

  function loginInfo(event) {
    event.preventDefault();
  }

  async function userLogin() {
    setCorEntrar(0.8);
    setDisableForm(true);
    try {
      await postSignup(signup);
      autorizado();
    } catch (error) {
      unautorized(error);
    }
  }

  function unautorized(error) {
    console.log(error);
    if (error.message === "Network Error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(error.response.data);
    }
    setCorEntrar(1);
    setDisableForm(false);
  }

  function autorizado() {
    setDisableForm(false);
    setCorEntrar(1);
    navigate("/");
  }

  return (
    <Container>
      <BlackContainer>
        <Title>linkr</Title>
        <Description>
          save,share and discover the best links on the web
        </Description>
      </BlackContainer>
      <GrayContainer>
        <Form onSubmit={loginInfo}>
          <Input
            type="text"
            placeholder=" e-mail"
            onChange={(event) =>
              setSignup({ ...signup, email: event.target.value })
            }
            disabled={disableForm}
            required
          />
          <Input
            type="password"
            placeholder=" password"
            onChange={(event) =>
              setSignup({ ...signup, password: event.target.value })
            }
            disabled={disableForm}
            required
          />
          <Input
            type="text"
            placeholder=" username"
            onChange={(event) =>
              setSignup({ ...signup, username: event.target.value })
            }
            disabled={disableForm}
            required
          />
          <Input
            type="text"
            placeholder=" picture url"
            onChange={(event) =>
              setSignup({ ...signup, pictureUrl: event.target.value })
            }
            disabled={disableForm}
            required
          />
          {typeof errorMessage !== "string" ? (
            errorMessage.map((msg) => <ErrorMessage>{msg}</ErrorMessage>)
          ) : (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
          <Entrar
            disabled={disableForm}
            cor={corEntrar}
            onClick={userLogin}
            type="submit"
          >
            {disableForm ? (
              <div>
                <Grid color="white" radius="10" heigth="90" width="90" />
              </div>
            ) : (
              "Sign Up"
            )}
          </Entrar>
        </Form>
        <GoToSingUp
          onClick={() => {
            navigate("/");
          }}
        >
          Switch back to log in
        </GoToSingUp>
      </GrayContainer>
    </Container>
  );
}

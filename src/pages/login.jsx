import react, { useEffect, useState } from "react";
import login from "../assets/images/login.svg";
import ojotachado from "../assets/icon/ojotachado.svg";
import ojo from "../assets/icon/ojo.svg";
const Login = () => {
  // TODO importar libreria de alertas para el login
  // TODO ver funcionalidad iniciar sesion y remember me
  const submitForm = (e) => {
    e.preventDefault();
    console.log("hola");
  };

  const mostrarClave = () => {
    const pass = document.getElementById("password");
    const eye = document.getElementById("eye");
    if (pass.type === "text") {
      pass.type = "password";
      eye.src = `${ojotachado}`;
    } else {
      pass.type = "text";
      eye.src = `${ojo}`;
    }
  };

  return (
    <section className="section-login h-100">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col h-100">
            <form
              onSubmit={submitForm}
              className=" d-flex flex-column form-login mw-500 center h-100 "
              method="POST"
            >
              <div className="d-flex flex-column login-img">
                <img src={login} alt="imagen login" />
              </div>
              <div className="ctn-title">
                <h3 className="title-login">Login to your account</h3>
              </div>
              {/* correo */}
              <div className="ctn-inputs mt-10 ">
                <div className="ctn-correo d-flex flex-column">
                  <label htmlFor="email">Correo</label>
                  <input className="email" type="email" require id="email" />
                </div>
                {/* fin correo */}
                {/* password */}
                <div className="ctn-password d-flex flex-column ">
                  <label htmlFor="password">Contraseña</label>
                  <div className="ctn-eye position-relative">
                    <div
                      onClick={mostrarClave}
                      className="eye-img position-absolute"
                    >
                      <img id="eye" src={ojotachado} alt="mostrar clave" />
                    </div>
                    <input
                      className="password w-100"
                      type="password"
                      id="password"
                      require
                    />
                  </div>
                </div>
                {/* fin password */}
              </div>
              <div className="ctn-save-pass d-flex justify-content-between w-100 pt-20">
                <div className="d-flex align-items-center">
                  <div className="remember-while-login d-flex align-items-center cursor-pointer">
                    <input type="checkbox" id="rememberme"></input>
                    <label htmlFor="rememberme">Remember Me</label>
                  </div>
                </div>
                <p className="f-pass cursor-pointer" href="#">
                  Olvidaste la clave?
                </p>
              </div>
              <div className="container-btn">
                <button type="submit" id="btn-submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

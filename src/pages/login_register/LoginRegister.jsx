import React from "react";
import '../../style/impactStyle.css';
import '../../declarations/i18n.jsx';
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";
import {Login_Cover, Logo_Black} from '../../declarations/imageExports';

const loginRegister = () => {
    const { t } = useTranslation();

    return (

        <Container fluid className="p-0">
            <div className="position-absolute w-100 h-100" style={{ zIndex: 1 }}>
                <img src={Login_Cover} alt="login" className="w-100 h-100" />
            </div>
            <div className="login-container position-absolute bg-light w-50 h-100" style={{ zIndex: 2}}>
                <div className="logos ml-5 mt-5 mb-5 d-flex">
                    <img src={Logo_Black} alt="impact_logo" style={{width:'7vw'}}/>
                    <div className="border-end border-black ml-2 mr-2" style={{borderWidth: "1vh"}}/>
                    <div className="d-flex flex-column justify-content-center myriad-pro">
                        <text className="mb-3 text-black font-weight-normal fs-4 underline-w-spacing">
                            CIMPA
                        </text>
                        <text className="mb-1 text-secondary" style={{fontSize: "1.5vh"}}>
                            Centro de Investigación en <br/>
                            <strong>
                                Matemática Pura y Aplicada
                            </strong>
                        </text>
                    </div>
                </div>
                <div className="login-form-container d-flex flex-column align-content-between ml-5 w-80">
                    <text className="trueno-reg blue-2 fs-4 mb-5">
                        {t('loginPage.login_message')}
                    </text>
                    <form onSubmit="{handleSubmit}">
                        <div className="email-input mb-5">
                            <div className="mb-2 trueno-ultraLight blue-5 small-letters">
                                <label htmlFor="email">{t('loginPage.email_label')}</label>
                            </div>
                            <div className="input-1 trueno-reg">
                                <input
                                    type="email"
                                    className="w-100 no-bg no-border blue-2 large-letters pr-2 pb-2 pt-2"
                                />
                            </div>
                        </div>
                        <div className="passwordd-input mb-6">
                            <div className="mb-2 trueno-ultraLight blue-5 small-letters">
                                <label htmlFor="password" className="mb-2">{t('loginPage.password_label')}</label>
                            </div>
                            <div className="input-1 trueno-reg">
                                <input
                                    type="password"
                                    className="w-100 no-bg no-border blue-2 large-letters pr-2 pb-2 pt-2"
                                />
                            </div>
                        </div>
                        <div className="login-submit">
                            <button type="submit">{t ('loginPage.signIn_label')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default loginRegister;
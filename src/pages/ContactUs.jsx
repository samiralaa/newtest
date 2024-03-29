import styles from "../styles/_ContactUs.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer";
import Container from "../components/UI/Container";
import PageHeader from "../components/UI/PageHeader";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/UI/SectionHeader";
import { contactMethods } from "../lib/contactInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {
  const { t, i18n } = useTranslation("global");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = yup.object({
    name: yup.string().required(t("contactUs.nameIsRequired")),
    email: yup
      .string()
      .required(t("contactUs.emailIsRequired"))
      .email(t("contactUs.invalidEmail"))
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        t("contactUs.invalidEmail")
      ),
    phone: yup.string().required(t("contactUs.phoneIsRequired")),
    message: yup.string().required(t("contactUs.messageIsRequired")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formInputs = [
    {
      type: "text",
      name: "name",
      id: "name",
      placeholder: t("contactUs.name"),
      error: errors.name,
    },
    {
      type: "email",
      name: "email",
      id: "email",
      placeholder: t("contactUs.email"),
      error: errors.email,
    },
    {
      type: "phone",
      name: "phone",
      id: "phone",
      placeholder: t("contactUs.phone"),
      error: errors.phone,
    },
    {
      type: "textarea",
      name: "message",
      id: "message",
      placeholder: t("contactUs.message"),
      error: errors.message,
    },
  ];
  const formSubmitHandler = async (formData) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "https://backend.lixir-interiors.com/api/contact/store",
          JSON.stringify(formData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.data;
        setIsSubmitting(false);
        if (res.status === 200 && res.message) {
          navigate("/");
        }
      } catch (error) {
        setIsSubmitting(false);
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AnimatedContainer>
      <div className={styles.contactUs}>
        <div className={styles.head}>
          <div className={styles.contents}>
            <Container subClass="sm">
              <div className={styles.wrapper}>
                <PageHeader>{t("contactUs.title")}</PageHeader>
                <div className={styles.details}>
                  <div className={styles.formWrapper}>
                    <SectionHeader subClass={styles.header}>
                      {t("contactUs.getInTouch")}
                    </SectionHeader>
                    <form
                      className={styles.form}
                      onSubmit={handleSubmit(formSubmitHandler)}
                    >
                      {formInputs.map((input, index) => {
                        return (
                          <div key={index} className={styles.inputWrapper}>
                            {input.type === "textarea" ? (
                              <textarea
                                id={input.id}
                                name={input.name}
                                {...register(input.name)}
                                placeholder={input.placeholder}
                                className={`${styles.input} ${
                                  i18n.language === "ar" ? styles.ar : ""
                                }`}
                              />
                            ) : (
                              <input
                                type={input.type}
                                id={input.id}
                                name={input.name}
                                {...register(input.name)}
                                placeholder={input.placeholder}
                                className={`${styles.input} ${
                                  i18n.language === "ar" ? styles.ar : ""
                                }`}
                              />
                            )}
                            {input.error && (
                              <span className={styles.error}>
                                {input.error?.message}
                              </span>
                            )}
                          </div>
                        );
                      })}
                      <button
                        type="submit"
                        className={`${styles.submit} ${
                          i18n.language === "ar" ? styles.ar : ""
                        }`}
                      >
                        {isSubmitting
                          ? t("contactUs.submitting")
                          : t("contactUs.send")}
                      </button>
                    </form>
                  </div>
                  <div className={styles.contactInfo}>
                    <SectionHeader subClass={styles.header}>
                      {t("contactUs.contactInformation")}
                    </SectionHeader>
                    <ul className={styles.contactMethods}>
                      {contactMethods.map((item, index) => {
                        return (
                          <li key={index} className={styles.method}>
                            <span className={styles.icon}>{item.icon}</span>
                            <span
                              className={`${styles.value}  ${
                                i18n.language === "ar" ? styles.ar : ""
                              }`}
                            >
                              {i18n.language === "ar"
                                ? item.value.ar
                                : item.value.en}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
export default ContactUs;

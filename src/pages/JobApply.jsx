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
import { useNavigate, useParams } from "react-router-dom";

const JobApply = () => {
  const { careerId } = useParams();

  const { t, i18n } = useTranslation("global");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInput, setFileInput] = useState(false);

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
    applyfile: yup.mixed().required(t("contactUs.resumeIsRequired")),
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
    {
      type: "file",
      name: "applyfile",
      id: "applyfile",
      placeholder: t("contactUs.resumeIsRequired"),
      error: errors.applyfile,
    },
  ];
  const formSubmitHandler = async (formData) => {
    formData["job_id"] = careerId;
    formData.applyfile = selectedFile;

    const formJson = new FormData();

    // Iterate over object data and append to formData
    for (const [key, value] of Object.entries(formData)) {
      if (
        key === "applyfile" &&
        typeof value === "object" &&
        value instanceof File
      ) {
        // Append file object with filename if 'applyfile' is a File
        formJson.append(key, value, value.name);
      } else {
        // Append other data as is
        formJson.append(key, value);
      }
    }

    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "https://backend.lixir-interiors.com/api/applay/save/jobs",
          formJson,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const res = await response.data;
        console.log("Response Data:", res); // Log the response data

        setIsSubmitting(false);
        if (res.status === 200 && res.message) {
          navigate("/");
        }
      } catch (error) {
        setIsSubmitting(false);
      }
    }
  };

  const toggleInputType = () => {
    setFileInput(!fileInput);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
                <PageHeader>{t("contactUs.apply")}</PageHeader>
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
                            ) : input.type === "file" ? (
                              fileInput ? (
                                <input
                                  type="file"
                                  id={input.id}
                                  name={input.name}
                                  {...register(input.name)}
                                  placeholder={input.placeholder}
                                  className={`${styles.input} ${styles.inputFile}`}
                                  onChange={handleFileChange}
                                />
                              ) : (
                                <input
                                  type="text"
                                  id={input.id}
                                  name={input.name}
                                  {...register(input.name)}
                                  placeholder={input.placeholder}
                                  className={`${styles.input} ${
                                    i18n.language === "ar" ? styles.ar : ""
                                  } ${styles.inputText}`}
                                  onClick={toggleInputType}
                                />
                              )
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

export default JobApply;

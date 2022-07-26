/*
 *  Document    : Loginvalidation.js
 *  Author      : Uyarchi
 *  Description : Loginvalidation
 */

import { useState } from "react";
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { Spinner, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
//components
import Buttons from "../../components/controls/Buttons";
import Forms from "../../components/controls/Forms";
import FormikErrorMessage from "../../components/controls/FormikErrorMessage";
import axios from "../../axios";

const Loginvalidation = () => {
  //usestate
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();

  //Formik InitialValue
  const initialvalue = {
    email: "",
    password: "",
  };
  //formik validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Enter Email"),
      password: Yup.string().required("Enter password"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      const data = {
        email: values.email,
        dateOfBirth: values.password,
      };
      axios
        .post("/v1/Supplier/login/data", data)
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          Cookies.set("UserId", res.data.data[0]._id);
          Cookies.set("UserName", res.data.data[0].primaryContactName);
          navigate("/home");
        })
        .catch((error) => {
          if (error.response) {
            setLoading(false);
            seterrorMessage(error.response.data.message);
          }
        });
    },
  });

  return (
    <div className="grid grid-cols-12 font-light relative">
      <div className="col-span-12">
        <div className="flex flex-wrap justify-center items-center">
          <div className="flex-col w-5/6 justify-self-center">
            {errorMessage && (
              <div className="pb-5">
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            <Forms className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="relative">
                <input
                  name="email"
                  autoComplete="on"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "input-primary ring-2 ring-secondary border-none"
                      : "input-primary"
                  }
                />
                <div>
                  <span className="input-inline-icon text-xl">
                    <i className="cursor-pointer">
                      <BsFillPersonFill />
                    </i>
                  </span>
                </div>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <FormikErrorMessage>{formik.errors.email}</FormikErrorMessage>
              ) : null}
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "input-primary ring-2 ring-secondary border-none "
                      : "input-primary"
                  }
                />
                <span className="input-inline-icon text-base">
                  <i
                    onClick={() => setShowPwd(!showPwd)}
                    className="cursor-pointer"
                  >
                    {showPwd ? (
                      <BsFillEyeFill className="text-primary" />
                    ) : (
                      <BsFillEyeSlashFill />
                    )}
                  </i>
                </span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <FormikErrorMessage>
                  {formik.errors.password}
                </FormikErrorMessage>
              ) : null}

              <Buttons
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-whitecolor mt-4"
              >
                {loading ? (
                  <Spinner size="xs" colorScheme="whiteAlpha" />
                ) : (
                  "Login"
                )}
              </Buttons>
            </Forms>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginvalidation;

/*
 *  Document    : AddUser.js
 *  Author      : Uyarchi
 *  Description : Add New User
 */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Geocode, { setLanguage } from "react-geocode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
//components
import Forms from "../../components/controls/Forms";
import FormikErrorMessage from "../../components/controls/FormikErrorMessage";
import InputFields from "../../components/controls/InputFields";
import axios from "../../axios";
import Header from "../../components/Layout/Header";

//function init
const Postrequirement = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const [username, setusername] = useState("");
  const [slat, setslat] = useState("");
  const [slng, setslng] = useState("");
  const [errorshow, seterrorshow] = useState("");
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    let id = Cookies.get("UserId");
    axios
      .get(`/v1/requirementCollectionBS/Supplier/product/data/${id}`)
      .then((res) => setusername(res.data));
  }, []);

  //Formik regex
  const Namepattern = /^[a-zA-Z\s.]*$/;
  const addressregex = /^[a-zA-Z0-9\s\,\''\-]*$/;
  //geocode for mapview
  Geocode.setApiKey("AIzaSyDoYhbYhtl9HpilAZSy8F_JHmzvwVDoeHI");
  Geocode.setLanguage("en");
  Geocode.setRegion("es");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();

  // Get latitude & longitude from supplier address.
  const sgetlatlng = (e) => {
    Geocode.fromAddress(e.target.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setslat(lat);
        setslng(lng);
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
        seterrorshow("Enter Vaild Address");
      }
    );
  };
  //Formik InitialValue
  const initialvalue = {
    type: "supplier",
    postType: "",

    supplierpname: "",
    stocklocation: "",
    stockposition: "",
    stockavailabilitydate: "",
    stockavailabilitytime: "",
    packtype: "",
    expquantity: "",
    expprice: "",
    paymentmode: "",
    advance: "",
    minimumlot: "",
    maximumlot: "",
    stockTakeFromDay: "",
    stockTakeToDay: "",
    paymentFromDay: "",
    paymentToDay: "",
    livestreamingdate: "",
    livestreamingtime: "",
  };
  //formik validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      type: Yup.string(),
      postType: Yup.string(),
      supplierpname: Yup.string().matches(
        Namepattern,
        "Alphabets only allowed"
      ),
      stocklocation: Yup.string().matches(addressregex, "Enter Vaild Location"),
      stockposition: Yup.string(),
      stockavailabilitydate: Yup.string(),
      stockavailabilitytime: Yup.string(),
      packtype: Yup.string().matches(Namepattern, "Alphabets only allowed"),
      expprice: Yup.number(),
      expquantity: Yup.number(),
      paymentmode: Yup.string(),
      advance: Yup.number(),
      minimumlot: Yup.string(),
      maximumlot: Yup.string(),
      stockTakeFromDay: Yup.string(),
      stockTakeToDay: Yup.string(),
      paymentFromDay: Yup.string(),
      paymentToDay: Yup.string(),
      livestreamingdate: Yup.string(),
      livestreamingtime: Yup.string(),
    }),
    onSubmit: (values) => {
      const locale = "en";
      var today = new Date();
      const totime = today.toLocaleTimeString(locale, {
        hour: "numeric",
        hour12: false,
        minute: "numeric",
      });
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;
      // convert time string to number
      var a = values.stockavailabilitytime;
      a = a.replace(/\:/g, "");
      const availableTime = parseInt(a);
      var b = values.livestreamingtime;
      b = b.replace(/\:/g, "");
      const liveTime = parseInt(b);
      var c = totime;
      c = c.replace(/\:/g, "");
      const time = parseInt(c);
      const data1 = {
        requirementAddBy: Cookies.get("UserName"),
        userId: Cookies.get("UserId"),
        product: values.supplierpname.toLowerCase(),
        stockLocation: values.stocklocation.toLowerCase(),
        stockPosition: values.stockposition.toLowerCase(),
        stockAvailabilityDate: values.stockavailabilitydate,
        stockAvailabilityTime: availableTime,
        packType: values.packtype.toLowerCase(),
        expectedPrice: values.expprice,
        expectedQnty: values.expquantity,
        paymentMode: values.paymentmode.toLowerCase(),
        advance: values.advance,
        minimumlot: values.minimumlot,
        maximumlot: values.maximumlot,
        stockTakeFromDay: values.stockTakeFromDay,
        stockTakeToDay: values.stockTakeToDay,
        paymentFromDay: values.paymentFromDay,
        paymentToDay: values.paymentToDay,
        liveStreamDate: values.livestreamingdate,
        liveStreamTime: liveTime,
        date: today,
        time: time,
        lat: slat,
        lang: slng,
        status: "",
        moderateStatus: "",
        moderatedPrice: "",
        type: "own",
      };
      const data2 = {
        liveStreamDate: values.livestreamingdate,
        liveStreamTime: liveTime,
      };
      {
        values.postType == "new"
          ? axios
              .post("/v1/requirementCollectionBS/Supplier", data1)
              .then((res) => {
                console.log(res.data);
                formik.resetForm();
                navigate("/home");
              })
              .catch((error) => {
                if (error.response) {
                  console.log(error.response);
                  seterrorMessage(error.response.data.message);
                }
              })
          : axios
              .put(`/v1/requirementCollectionBS/Supplier/${productId}`, data2)
              .then((res) => {
                console.log(res.data);
                formik.resetForm();
                navigate("/home");
              })
              .catch((error) => {
                if (error.response) {
                  console.log(error.response);
                  seterrorMessage(error.response.data.message);
                }
              });
      }
    },
  });
  const cancelbutton = () => {
    seterrorshow("");
    formik.resetForm();
    navigate("/home");
  };
  return (
    <>
      <Header />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex justify-center">
            Product Sale Via Live Streaming
          </h1>
        </div>
      </header>
      <div className="px-5 py-6">
        {errorMessage && (
          <div className="pb-5">
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </div>
        )}
        {errorshow && (
          <div className="pb-5">
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errorshow}</AlertDescription>
            </Alert>
          </div>
        )}
        <Forms className="space-y-2" onSubmit={formik.handleSubmit}>
          <>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">
                Post a Requirement
                <span className="text-secondary pb-2">*</span>
              </label>
              <RadioGroup>
                <Stack
                  direction="row"
                  name="postType"
                  //value={formik.values.stockposition || ""}
                  onChange={(e) =>
                    formik.setFieldValue("postType", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  className="px-3"
                >
                  <Radio
                    name="postType"
                    value="new"
                    className={
                      formik.touched.postType && formik.errors.postType
                        ? "ring-2 ring-secondary border-none"
                        : ""
                    }
                  >
                    New
                  </Radio>
                  <Radio
                    name="stockposition"
                    className={
                      formik.touched.postType && formik.errors.postType
                        ? "ring-2 ring-secondary border-none"
                        : ""
                    }
                    value="execting"
                  >
                    Execting
                  </Radio>
                </Stack>
              </RadioGroup>
            </div>
            {formik.values.postType == "new" ? (
              <>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">
                    Product Name
                    <span className="text-secondary pb-2">*</span>
                  </label>
                  <InputFields
                    type="string"
                    name="supplierpname"
                    placeholder="Enter Product Name"
                    value={formik.values.supplierpname || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.supplierpname &&
                      formik.errors.supplierpname
                        ? "input-primary ring-2 ring-secondary border-none"
                        : "input-primary"
                    }
                  />
                </div>
                {formik.touched.supplierpname && formik.errors.supplierpname ? (
                  <FormikErrorMessage>
                    {formik.errors.supplierpname}
                  </FormikErrorMessage>
                ) : null}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">
                    Stock Location
                    <span className="text-secondary pb-2">*</span>
                  </label>
                  <InputFields
                    type="string"
                    autoComplete="off"
                    name="stocklocation"
                    placeholder="Enter Stock Location"
                    value={formik.values.stocklocation || ""}
                    onChange={(e) => {
                      formik.handleChange(e);
                      seterrorshow("");
                      sgetlatlng(e);
                    }}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.stocklocation &&
                      formik.errors.stocklocation
                        ? "input-primary ring-2 ring-secondary border-none"
                        : "input-primary"
                    }
                  />
                </div>
                {formik.touched.stocklocation && formik.errors.stocklocation ? (
                  <FormikErrorMessage>
                    {formik.errors.stocklocation}
                  </FormikErrorMessage>
                ) : null}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">
                    Stock Position
                    <span className="text-secondary pb-2">*</span>
                  </label>
                  <RadioGroup>
                    <Stack
                      direction="row"
                      name="stockposition"
                      //value={formik.values.stockposition || ""}
                      onChange={(e) =>
                        formik.setFieldValue("stockposition", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                      className="px-3"
                    >
                      <Radio
                        name="stockposition"
                        value="Ready"
                        className={
                          formik.touched.stockposition &&
                          formik.errors.stockposition
                            ? "ring-2 ring-secondary border-none"
                            : ""
                        }
                      >
                        Ready
                      </Radio>
                      <Radio
                        name="stockposition"
                        className={
                          formik.touched.stockposition &&
                          formik.errors.stockposition
                            ? "ring-2 ring-secondary border-none"
                            : ""
                        }
                        value="To be Ploughed"
                      >
                        To be Ploughed
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </div>
                {formik.touched.stockposition && formik.errors.stockposition ? (
                  <FormikErrorMessage>
                    {formik.errors.stockposition}
                  </FormikErrorMessage>
                ) : null}
                {formik.values.stockposition === "To be Ploughed" ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Stock Availability Date
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <input
                        type="date"
                        name="stockavailabilitydate"
                        onChange={(e) => {
                          e.target.classList.add("change_color");
                          formik.setFieldValue(
                            "stockavailabilitydate",
                            e.target.value
                          );
                        }}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.stockavailabilitydate &&
                          formik.errors.stockavailabilitydate
                            ? "input-primary ring-2 ring-secondary border-none experience"
                            : "input-primary experience"
                        }
                      />
                    </div>
                    {formik.touched.stockavailabilitydate &&
                    formik.errors.stockavailabilitydate ? (
                      <FormikErrorMessage>
                        {formik.errors.stockavailabilitydate}
                      </FormikErrorMessage>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Stock Availability Time
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <input
                        type="time"
                        name="stockavailabilitytime"
                        onChange={(e) => {
                          e.target.classList.add("change_color");
                          formik.setFieldValue(
                            "stockavailabilitytime",
                            e.target.value
                          );
                        }}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.stockavailabilitytime &&
                          formik.errors.stockavailabilitytime
                            ? "input-primary ring-2 ring-secondary border-none experience"
                            : "input-primary experience"
                        }
                      />
                    </div>
                    {formik.touched.stockavailabilitytime &&
                    formik.errors.stockavailabilitytime ? (
                      <FormikErrorMessage>
                        {formik.errors.stockavailabilitytime}
                      </FormikErrorMessage>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Payment Mode
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <select
                        name="paymentmode"
                        value={formik.values.paymentmode}
                        onChange={(e) => {
                          formik.setFieldValue("paymentmode", e.target.value);
                          e.target.classList.add("change_color");
                        }}
                        onBlur={formik.handleBlur}
                        style={{ outline: 0 }}
                        className={
                          formik.touched.paymentmode &&
                          formik.errors.paymentmode
                            ? "input-primary bg-whitecolor focus-outline-none ring-2 ring-secondary border-none experience"
                            : "input-primary bg-whitecolor focus-outline-none experience"
                        }
                      >
                        <option>Select</option>
                        <option value="Credit">Credit</option>
                        <option value="Advance">Advance</option>
                        <option value="COD">COD</option>
                      </select>
                    </div>
                    {formik.touched.paymentmode && formik.errors.paymentmode ? (
                      <FormikErrorMessage>
                        {formik.errors.paymentmode}
                      </FormikErrorMessage>
                    ) : null}
                    {formik.values.paymentmode === "Advance" ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold">
                            Advance
                            <span className="text-secondary pb-2">*</span>
                          </label>
                          <InputFields
                            type="number"
                            name="advance"
                            placeholder="Enter Advance"
                            value={formik.values.advance || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.touched.advance && formik.errors.advance
                                ? "input-primary ring-2 ring-secondary border-none"
                                : "input-primary"
                            }
                          />
                        </div>
                        {formik.touched.advance && formik.errors.advance ? (
                          <FormikErrorMessage>
                            {formik.errors.advance}
                          </FormikErrorMessage>
                        ) : null}
                      </>
                    ) : null}
                  </>
                ) : null}
                {formik.values.stockposition === "Ready" ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Pack Type
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <InputFields
                        type="string"
                        name="packtype"
                        placeholder="Enter PackType"
                        value={formik.values.packtype || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.packtype && formik.errors.packtype
                            ? "input-primary ring-2 ring-secondary border-none"
                            : "input-primary"
                        }
                      />
                    </div>
                    {formik.touched.packtype && formik.errors.packtype ? (
                      <FormikErrorMessage>
                        {formik.errors.packtype}
                      </FormikErrorMessage>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Excepted Quantity
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <InputFields
                        type="number"
                        name="expquantity"
                        placeholder="Enter Excepted Quantity"
                        value={formik.values.expquantity || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.expquantity &&
                          formik.errors.expquantity
                            ? "input-primary ring-2 ring-secondary border-none"
                            : "input-primary"
                        }
                      />
                    </div>
                    {formik.touched.expquantity && formik.errors.expquantity ? (
                      <FormikErrorMessage>
                        {formik.errors.expquantity}
                      </FormikErrorMessage>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Excepted Price
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <InputFields
                        type="number"
                        name="expprice"
                        placeholder="Enter Excepted Price"
                        value={formik.values.expprice || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.expprice && formik.errors.expprice
                            ? "input-primary ring-2 ring-secondary border-none"
                            : "input-primary"
                        }
                      />
                    </div>
                    {formik.touched.expprice && formik.errors.expprice ? (
                      <FormikErrorMessage>
                        {formik.errors.expprice}
                      </FormikErrorMessage>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Payment Mode
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <select
                        name="paymentmode"
                        // value={formik.values.paymentmode}
                        onChange={(e) => {
                          formik.setFieldValue("paymentmode", e.target.value);
                          e.target.classList.add("change_color");
                        }}
                        onBlur={formik.handleBlur}
                        style={{ outline: 0 }}
                        className={
                          formik.touched.paymentmode &&
                          formik.errors.paymentmode
                            ? "input-primary bg-whitecolor focus-outline-none ring-2 ring-secondary border-none experience"
                            : "input-primary bg-whitecolor focus-outline-none experience"
                        }
                      >
                        <option value="null">Select</option>
                        <option value="Credit">Credit</option>
                        <option value="Advance">Advance</option>
                        <option value="COD">COD</option>
                      </select>
                    </div>
                    {formik.touched.paymentmode && formik.errors.paymentmode ? (
                      <FormikErrorMessage>
                        {formik.errors.paymentmode}
                      </FormikErrorMessage>
                    ) : null}
                    {formik.values.paymentmode === "Advance" ? (
                      <>
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold">
                            Advance
                            <span className="text-secondary pb-2">*</span>
                          </label>
                          <InputFields
                            type="number"
                            name="advance"
                            placeholder="Enter Advance"
                            value={formik.values.advance || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.touched.advance && formik.errors.advance
                                ? "input-primary ring-2 ring-secondary border-none"
                                : "input-primary"
                            }
                          />
                        </div>
                        {formik.touched.advance && formik.errors.advance ? (
                          <FormikErrorMessage>
                            {formik.errors.advance}
                          </FormikErrorMessage>
                        ) : null}
                      </>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Minimum Lot
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <InputFields
                        type="string"
                        name="minimumlot"
                        placeholder="Enter Excepted Quantity"
                        value={formik.values.minimumlot || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.minimumlot && formik.errors.minimumlot
                            ? "input-primary ring-2 ring-secondary border-none"
                            : "input-primary"
                        }
                      />
                    </div>
                    {formik.touched.minimumlot && formik.errors.minimumlot ? (
                      <FormikErrorMessage>
                        {formik.errors.minimumlot}
                      </FormikErrorMessage>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Multiple Lot
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <InputFields
                        type="string"
                        name="maximumlot"
                        placeholder="Enter Excepted Quantity"
                        value={formik.values.maximumlot || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.maximumlot && formik.errors.maximumlot
                            ? "input-primary ring-2 ring-secondary border-none"
                            : "input-primary"
                        }
                      />
                    </div>
                    {formik.touched.maximumlot && formik.errors.maximumlot ? (
                      <FormikErrorMessage>
                        {formik.errors.maximumlot}
                      </FormikErrorMessage>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Stock Should Take Within
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <div className="flex flex-row gap-3">
                        <InputFields
                          type="date"
                          name="stockTakeFromDay"
                          placeholder="Enter From Day"
                          value={formik.values.stockTakeFromDay || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.stockTakeFromDay &&
                            formik.errors.stockTakeFromDay
                              ? "input-primary ring-2 ring-secondary border-none"
                              : "input-primary"
                          }
                        />

                        <label className="font-semibold m-2">To</label>
                        <InputFields
                          type="date"
                          name="stockTakeToDay"
                          placeholder="Enter To Day"
                          value={formik.values.stockTakeToDay || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.stockTakeToDay &&
                            formik.errors.stockTakeToDay
                              ? "input-primary ring-2 ring-secondary border-none"
                              : "input-primary"
                          }
                        />
                      </div>
                      {formik.touched.stockTakeFromDay &&
                      formik.errors.stockTakeFromDay ? (
                        <FormikErrorMessage>
                          {formik.errors.stockTakeFromDay}
                        </FormikErrorMessage>
                      ) : null}
                      {formik.touched.stockTakeToDay &&
                      formik.errors.stockTakeToDay ? (
                        <FormikErrorMessage>
                          {formik.errors.stockTakeToDay}
                        </FormikErrorMessage>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Payment Within
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <div className="flex flex-row gap-3">
                        <InputFields
                          type="date"
                          name="paymentFromDay"
                          placeholder="Enter From Day"
                          value={formik.values.paymentFromDay || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.paymentFromDay &&
                            formik.errors.paymentFromDay
                              ? "input-primary ring-2 ring-secondary border-none"
                              : "input-primary"
                          }
                        />
                        <label className="font-semibold m-2">To</label>
                        <InputFields
                          type="date"
                          name="paymentToDay"
                          placeholder="Enter To Day"
                          value={formik.values.paymentToDay || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.paymentToDay &&
                            formik.errors.paymentToDay
                              ? "input-primary ring-2 ring-secondary border-none"
                              : "input-primary"
                          }
                        />
                      </div>
                      {formik.touched.paymentFromDay &&
                      formik.errors.paymentFromDay ? (
                        <FormikErrorMessage>
                          {formik.errors.paymentFromDay}
                        </FormikErrorMessage>
                      ) : null}
                      {formik.touched.paymentToDay &&
                      formik.errors.paymentToDay ? (
                        <FormikErrorMessage>
                          {formik.errors.paymentToDay}
                        </FormikErrorMessage>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Date of live Streaming
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <input
                        type="date"
                        name="livestreamingdate"
                        onChange={(e) => {
                          e.target.classList.add("change_color");
                          formik.setFieldValue(
                            "livestreamingdate",
                            e.target.value
                          );
                        }}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.livestreamingdate &&
                          formik.errors.livestreamingdate
                            ? "input-primary ring-2 ring-secondary border-none experience"
                            : "input-primary experience"
                        }
                      />
                    </div>
                    {formik.touched.livestreamingdate &&
                    formik.errors.livestreamingdate ? (
                      <FormikErrorMessage>
                        {formik.errors.livestreamingdate}
                      </FormikErrorMessage>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Time of live Streaming
                        <span className="text-secondary pb-2">*</span>
                      </label>
                      <input
                        type="time"
                        name="livestreamingtime"
                        onChange={(e) => {
                          e.target.classList.add("change_color");
                          formik.setFieldValue(
                            "livestreamingtime",
                            e.target.value
                          );
                        }}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.livestreamingtime &&
                          formik.errors.livestreamingtime
                            ? "input-primary ring-2 ring-secondary border-none experience"
                            : "input-primary experience"
                        }
                      />
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">
                    Product Name
                    <span className="text-secondary pb-2">*</span>
                  </label>
                  <select
                    name="peoductId"
                    // value={formik.values.name}
                    onChange={(e) => {
                      e.target.classList.add("change_color");
                      setProductId(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.peoductId && formik.errors.peoductId
                        ? "input-primary bg-whitecolor focus-outline-none ring-2 ring-secondary border-none experience"
                        : "input-primary bg-whitecolor focus-outline-none experience"
                    }
                  >
                    <option>Select</option>
                    {username &&
                      username.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.product}
                          {" - "}
                          {item.date}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">
                    Date of live Streaming
                    <span className="text-secondary pb-2">*</span>
                  </label>
                  <input
                    type="date"
                    name="livestreamingdate"
                    onChange={(e) => {
                      e.target.classList.add("change_color");
                      formik.setFieldValue("livestreamingdate", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.livestreamingdate &&
                      formik.errors.livestreamingdate
                        ? "input-primary ring-2 ring-secondary border-none experience"
                        : "input-primary experience"
                    }
                  />
                </div>
                {formik.touched.livestreamingdate &&
                formik.errors.livestreamingdate ? (
                  <FormikErrorMessage>
                    {formik.errors.livestreamingdate}
                  </FormikErrorMessage>
                ) : null}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">
                    Time of live Streaming
                    <span className="text-secondary pb-2">*</span>
                  </label>
                  <input
                    type="time"
                    name="livestreamingtime"
                    onChange={(e) => {
                      e.target.classList.add("change_color");
                      formik.setFieldValue("livestreamingtime", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.livestreamingtime &&
                      formik.errors.livestreamingtime
                        ? "input-primary ring-2 ring-secondary border-none experience"
                        : "input-primary experience"
                    }
                  />
                </div>
              </>
            )}
            <div className="flex justify-center py-2">
              <Button colorScheme="blue" mr={3} onClick={() => cancelbutton()}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </div>
          </>
        </Forms>
      </div>
    </>
  );
};
export default Postrequirement;

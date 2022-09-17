import Input from "../../Common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link  , withRouter} from "react-router-dom";
import "./SignUpForm.css";
import { signUpUser } from "../../httpServices/SignUpService";
import { useEffect, useState } from "react";
import { useAth, useAuthActions } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .min(6, "Name Lenght must be 6 character"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is Required").min(6),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),

  passwordConfirm: Yup.string()
    .required("password Confirmation is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = ({history}) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/" ;
  console.log(redirect);
  console.log(query);
  // console.log(history);
  const setAuth = useAuthActions();
  const auth=useAth();
  useEffect(()=>{
    if(auth) history.push(redirect)
  } , [redirect , auth]);
  const [error, setError] = useState(null);
  const onSubmit = async (values) => {
    // console.log(values);
    const userData = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };
    try {
      const { data } = await signUpUser(userData);
      history.push(redirect);
      setAuth(data);
      // localStorage.setItem("authState" , JSON.stringify(data));
      setError(null);
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="PhoneNumber"
          type="tel"
        />
        <Input formik={formik} name="password" label="Password" />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="password Confirmation"
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
          style={{ width: "100%" }}
        >
          SignUp
        </button>
        {error && <p style={{ color: "red" }}>Error is : {error}</p>}

        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: "10px" }}>Already login ?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(SignUpForm);

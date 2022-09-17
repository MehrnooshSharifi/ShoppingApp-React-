import Input from "../../Common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, withRouter } from "react-router-dom";
import "./LoginForm.css";
import { useState , useEffect } from "react";
import { LoginUser } from "../../httpServices/LoginService";
import { useAuthActions , useAth } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  number: "",
  gender: "",
  nationality: "",
  intrest: [],
  terms: false,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is Required").min(6),
});

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  console.log(redirect);
  const setAuth = useAuthActions();
  const auth = useAth();
  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect, auth]);
  const onSubmit = async (values) => {
    const { email, password } = values;
    const userdata = {
      email,
      password,
    };
    try {
      const { data } = await LoginUser(userdata);
      history.push(redirect);
      console.log(data);
      setAuth(data);
      // localStorage.setItem("authState" , JSON.stringify(data));
      setError(null);
    } catch (error) {
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
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input formik={formik} name="password" label="Password" />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
          style={{ width: "100%" }}
        >
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/signup?redirect=${redirect}`}>
          <p style={{ marginTop: "10px" }}>Not SignUp yet ?</p>
        </Link>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);

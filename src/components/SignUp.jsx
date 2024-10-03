import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";
import { signUp } from "@/db/apiAuth";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { fetchUser } = UrlState();

  // console.log(searchParams, searchParams.get("createNew"));
  const longLink = searchParams.get("createNew");
  // console.log(longLink);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    data,
    loading,
    error,
    fun: signUpFunction,
  } = useFetch(signUp, formData);

  useEffect(() => {
    console.log(data);
    if (error == null && data) {
      console.log("hello");
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, loading]);

  const handleSignUp = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is uploaded"),
      });
      await schema.validate(formData, { abortEarly: false });
      // api call
      await signUpFunction();
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className="space-y-1">
          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
        <div className="space-y-1">
          <Input
            type="file"
            name="profile_pic"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp}>
          {loading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;

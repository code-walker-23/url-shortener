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
const Login = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you have already one
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input type="email" placeholder="Enter Email" />
        </div>
        <div className="space-y-1">
          <Input type="password" placeholder="Enter Password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          Login
          {true? <BeatLoader/> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;

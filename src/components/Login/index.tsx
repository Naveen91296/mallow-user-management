import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { accountLoginAction } from "../../redux/actions/loginActions";
import { accountLoginCreator } from "../../redux/creators/loginCreator";
import type { LoginPayload } from "../../redux/reduxTypes";
import { LoadingSpinner } from "../ui";
import styles from "./Login.module.css";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { loginError } = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    const payload: LoginPayload = {
      email: values.email,
      password: values.password,
    };
    await dispatch(accountLoginAction(payload, navigate));
    setLoading(false);
  };

  // Clear errors when user starts typing
  const handleFieldChange = () => {
    if (loginError) {
      dispatch(accountLoginCreator(""));
      form.setFields([
        { name: "email", errors: [] },
        { name: "password", errors: [] },
      ]);
    }
  };

  useEffect(() => {
    if (loginError === "user not found") {
      form.setFields([
        {
          name: "email",
          errors: [loginError],
        },
      ]);
    }
  }, [loginError, form]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <Form
          form={form}
          name="login"
          initialValues={{
            email: "",
            password: "",
            remember: true,
          }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
              size="large"
              onChange={handleFieldChange}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
              onChange={handleFieldChange}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner
                  size="small"
                  tip="Signing in..."
                  minHeight="30px"
                />
              ) : (
                "Log in"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

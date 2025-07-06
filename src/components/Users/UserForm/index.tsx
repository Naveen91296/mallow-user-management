import { Form, Input } from "antd";
import { useEffect } from "react";
import type { CreateUserPayload, User } from "../../../redux/reduxTypes/api";
import styles from "./UserForm.module.css";

interface UserFormProps {
  form: any;
  onFinish: (values: CreateUserPayload) => void;
  initialValues?: Partial<User>;
  isEditMode?: boolean;
}

const UserForm = ({
  form,
  onFinish,
  initialValues,
  isEditMode,
}: UserFormProps) => {
  useEffect(() => {
    if (isEditMode) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [form, initialValues]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={true}
      className={styles.userForm}
    >
      <Form.Item
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: "Please enter first name" }]}
        className={styles.formItem}
      >
        <Input placeholder="Please enter first name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: "Please enter last name" }]}
        className={styles.formItem}
      >
        <Input placeholder="Please enter last name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
        className={styles.formItem}
      >
        <Input placeholder="Please enter email" />
      </Form.Item>

      <Form.Item
        label="Profile Image Link"
        name="avatar"
        rules={[{ required: true, message: "Please enter profile image link" }]}
        className={styles.formItem}
      >
        <Input placeholder="Please enter profile image link" />
      </Form.Item>
    </Form>
  );
};

export default UserForm;

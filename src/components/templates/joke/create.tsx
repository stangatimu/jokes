import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Typography,
  Button,
  Popconfirm,
  Space,
  message,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import { useCreateJokeMutation, useUpdateJokeMutation } from "@/services";
import { useRouter } from "next/router";
import { NewJoke } from "@/types/jokes";

const CreateJoke: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<NewJoke>({
    Title: "",
    Body: "",
    Author: "",
    Views: 0,
  });
  const [createJoke, { isLoading, isError, isSuccess }] =
    useCreateJokeMutation();

  const handleFormChange = (fieldName: string, value: string | Dayjs) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleUpdateJoke = async () => {
    const res = await createJoke({
      joke: { ...formData, CreatedAt: dayjs().valueOf() },
    }).unwrap();
    if (res?.id) {
      message.success("Joke has been created successfully");
      router.push("/");
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "5em" }}>
      <Typography.Title level={1}>{"Create New Joke"}</Typography.Title>
      <Col span={24}></Col>
      <Col lg={12} md={18} sm={22} xs={23}>
        <Form layout="vertical">
          <Row gutter={16} justify="center">
            {isError && (
              <Typography.Text type="danger">
                {"Sorry, joke could not be updated. Try again later"}
              </Typography.Text>
            )}
            <Col span={24}>
              <Form.Item label="Title">
                <Input
                  value={formData.Title}
                  onChange={(e) => handleFormChange("Title", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Body">
                <Input.TextArea
                  value={formData.Body}
                  onChange={(e) => handleFormChange("Body", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Author">
                <Input
                  value={formData.Author}
                  onChange={(e) => handleFormChange("Author", e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Views">
                <Input
                  type="number"
                  value={formData.Views}
                  onChange={(e) => handleFormChange("Views", e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Row justify={"space-between"}>
                <Link href={"/"}>
                  <Button disabled={isLoading}>Close</Button>
                </Link>
                <Space>
                  {isLoading ? (
                    <Button loading={isLoading}>loading...</Button>
                  ) : (
                    <>
                      <Button type="primary" onClick={handleUpdateJoke}>
                        Save
                      </Button>
                    </>
                  )}
                </Space>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default CreateJoke;

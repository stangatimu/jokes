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
import { useDeleteJokeMutation, useUpdateJokeMutation } from "@/services";
import { useRouter } from "next/router";

interface JokeDetailProps {
  joke?: {
    id: number;
    Title: string;
    Body: string;
    Author: string;
    Views: number;
    CreatedAt: number;
  };
  loading?: boolean;
}

const JokeDetail: React.FC<JokeDetailProps> = ({ joke, loading }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: joke?.id,
    Title: joke?.Title,
    Body: joke?.Body,
    Author: joke?.Author,
    Views: joke?.Views,
    CreatedAt: dayjs(joke?.CreatedAt),
  });
  const [updateJoke, { isLoading, isError, isSuccess }] =
    useUpdateJokeMutation();
  const [
    deleteJoke,
    {
      isLoading: deleteLoading,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteJokeMutation();

  useEffect(() => {
    if (joke?.id) {
      setFormData({
        id: joke?.id,
        Title: joke?.Title,
        Body: joke?.Body,
        Author: joke?.Author,
        Views: joke?.Views,
        CreatedAt: dayjs(joke?.CreatedAt),
      });
    }
  }, [joke]);

  const handleFormChange = (fieldName: string, value: string | Dayjs) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleDeleteJoke = async () => {
    const res = await deleteJoke({
      joke: formData.id as number,
    }).unwrap();
    if (res) {
      message.success("Joke has been deleted successfully");
      router.push("/");
    }
  };

  const handleUpdateJoke = async () => {
    const res = await updateJoke({
      joke: { ...formData, CreatedAt: formData.CreatedAt.valueOf() },
    }).unwrap();
    if (res?.id) {
      message.success("Joke has been updated successfully");
    }
  };

  const updateLoading = isLoading || deleteLoading;

  return (
    <Row justify={"center"} style={{ marginTop: "5em" }}>
      <Typography.Title level={1}>{formData.Title || "Joke"}</Typography.Title>
      <Col span={24}></Col>
      <Col lg={14} md={18} sm={22} xs={23}>
        <Form layout="vertical">
          <Row gutter={16} justify="center">
            {isError && (
              <Typography.Text type="danger">
                {"Sorry, joke could not be updated. Try again later"}
              </Typography.Text>
            )}
            {isDeleteError && (
              <Typography.Text type="danger">
                {"Sorry, joke could not be deleted. Try again later"}
              </Typography.Text>
            )}
            {loading && <Typography.Text>loading...</Typography.Text>}

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
              <Form.Item label="Created At">
                <DatePicker
                  value={formData.CreatedAt}
                  onChange={(date) =>
                    handleFormChange("CreatedAt", date as Dayjs)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row justify={"space-between"}>
                <Link href={"/"}>
                  <Button disabled={updateLoading}>Close</Button>
                </Link>
                <Space>
                  {updateLoading ? (
                    <Button loading={updateLoading}>loading...</Button>
                  ) : (
                    <>
                      <Popconfirm
                        title="Are you sure you want to delete this joke?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={handleDeleteJoke}
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
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
export default JokeDetail;

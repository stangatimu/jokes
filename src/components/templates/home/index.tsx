import { Joke } from "@/types/jokes";
import { getColorByViews, maskEmail } from "@/utils";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Button, Col, Row, Select, Table, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const columns: ColumnsType<Joke> = [
  {
    title: "Title",
    dataIndex: "Title",
    key: "title",
    render: (text, record) => (
      <Link
        href={`/jokes/${record.id}`}
        style={{ textDecoration: "underline" }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: "Author",
    dataIndex: "Author",
    key: "author",
    render: (text) => maskEmail(text),
  },
  {
    title: "Created Date",
    dataIndex: "CreatedAt",
    key: "CreateAt",
    render: (value) => dayjs(value).format("D MMM YYYY"),
  },
  {
    title: "Views",
    dataIndex: "Views",
    key: "Views",
    render: (num) => <span style={{ color: getColorByViews(num) }}>{num}</span>,
  },
];

type JokesListProps = {
  jokes?: Array<Joke>;
  loading?: boolean;
};

const JokesList: React.FC<JokesListProps> = (props) => {
  const { jokes, loading } = props;
  const router = useRouter();

  let page = (router.query.page as string) || 1;
  let perPage = (router.query.perPage as string) || 10;
  const handleChange = (value: number) => {
    router.push(`/?perPage=${value}&page=${page}`);
  };

  const handlePageChange = (isNext: boolean) => {
    let _page = parseInt(page as string);

    if (isNext) {
      _page += 1;
    } else {
      _page -= 1;
    }

    router.push(`/?perPage=${perPage}&page=${_page}`);
  };
  return (
    <Row justify={"center"} style={{ marginTop: "5em" }}>
      <Col lg={14} md={18} sm={22} xs={23}>
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Jokes
        </Typography.Title>
        <Table
          columns={columns}
          dataSource={jokes}
          loading={loading}
          pagination={false}
        />
      </Col>
      <Col lg={14} md={18} sm={22} xs={23}>
        <Row justify={"center"} style={{ marginTop: "20px" }}>
          <Button.Group>
            <Tooltip title="Previous">
              <Button
                onClick={() => handlePageChange(false)}
                disabled={parseInt(page as string) - 1 < 1}
              >
                <CaretLeft size={20} />
              </Button>
            </Tooltip>
            <Select
              defaultValue={10}
              onChange={handleChange}
              bordered={false}
              options={[
                { value: 10, label: "10" },
                { value: 5, label: "5" },
              ]}
            />
            <Tooltip title="Next">
              <Button
                onClick={() => handlePageChange(true)}
                disabled={!!jokes?.length && jokes?.length < perPage}
              >
                <CaretRight size={20} />
              </Button>
            </Tooltip>
          </Button.Group>
        </Row>
      </Col>
    </Row>
  );
};

JokesList.defaultProps = {
  jokes: [],
};

export default JokesList;

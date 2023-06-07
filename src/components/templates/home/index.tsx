import { Joke, SortOrder } from "@/types/jokes";
import { generateQueryString, getColorByViews, maskEmail } from "@/utils";
import { CaretLeft, CaretRight, Plus } from "@phosphor-icons/react";
import { Button, Col, Row, Select, Table, Tooltip, Typography } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
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
    sorter: true,
  },
  {
    title: "Views",
    dataIndex: "Views",
    key: "Views",
    render: (num) => <span style={{ color: getColorByViews(num) }}>{num}</span>,
    sorter: true,
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
    let params = { ...router.query, page, perPage: value };

    router.push(`/?${generateQueryString(params)}`);
  };

  const handlePageChange = (isNext: boolean) => {
    let _page = parseInt(page as string);

    if (isNext) {
      _page += 1;
    } else {
      _page -= 1;
    }

    let params = { ...router.query, page: _page };

    router.push(`/?${generateQueryString(params)}`);
  };

  const sortOrderMap = {
    ascend: SortOrder.ASC,
    descend: SortOrder.DESC,
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Joke> | SorterResult<Joke>[]
  ) => {
    const { field, order } = sorter as SorterResult<Joke>;

    let params = {
      ...router.query,
      sort: field,
      order: order && sortOrderMap[order],
    };

    router.push(`/?${generateQueryString(params)}`);
  };

  return (
    <Row justify={"center"} style={{ marginTop: "5em" }}>
      <Col lg={14} md={18} sm={22} xs={23}>
        <Row justify={"space-between"} align="middle">
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Jokes
          </Typography.Title>
          <Link href={"/jokes/create"}>
            <Button
              icon={<Plus size={15} style={{ marginBottom: "-2" }} />}
              type="primary"
            >
              New
            </Button>
          </Link>
        </Row>
        <Table
          columns={columns}
          dataSource={jokes}
          loading={loading}
          pagination={false}
          onChange={handleTableChange}
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

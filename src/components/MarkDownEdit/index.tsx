import {Avatar, Button, Col, Row, Segmented, Skeleton} from "antd";
import {useEffect, useRef, useState} from "react";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import ReactCodeMirror from "@uiw/react-codemirror";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import MarkDownView from "@/components/MarkDownView";
import "./index.less";

import bold from "@/assets/MarkDownImage/bold.png";
import code from "@/assets/MarkDownImage/code.png";
import divider from "@/assets/MarkDownImage/divider.png";
import emoji from "@/assets/MarkDownImage/emoji.png";
import header from "@/assets/MarkDownImage/header.png";
import italic from "@/assets/MarkDownImage/italic.png";
import link from "@/assets/MarkDownImage/link.png";
import list from "@/assets/MarkDownImage/list.png";
import question from "@/assets/MarkDownImage/question.png";
import quote from "@/assets/MarkDownImage/quote.png";
import unlist from "@/assets/MarkDownImage/unList.png";

const tools = [
  {
    icon: header,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      let newValue = null;
      if (from === to) {
        newValue = beforeValue + "\n# " + selectValue + afterValue;
      } else {
        newValue = beforeValue + "\n\n# " + selectValue + "\n" + afterValue;
      }

      setValue(newValue);
    },
  },
  {
    icon: italic,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      const newValue = beforeValue + "*" + selectValue + "*" + afterValue;
      setValue(newValue);
    },
  },
  {
    icon: divider,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      const newValue = beforeValue + "\n --- \n" + selectValue + afterValue;
      setValue(newValue);
    },
  },
  {
    icon: bold,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      const newValue = beforeValue + "**" + selectValue + "**" + afterValue;
      setValue(newValue);
    },
  },
  {
    icon: list,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      const newValue = beforeValue + "\n1. " + selectValue + afterValue;
      setValue(newValue);
    },
  },
  {
    icon: unlist,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      const newValue = beforeValue + "\n* " + selectValue + afterValue;
      setValue(newValue);
    },
  },
  {
    icon: quote,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      const newValue = beforeValue + "\n> " + selectValue + afterValue;
      setValue(newValue);
    },
  },
  {
    icon: code,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      const newValue = beforeValue + "\n```\n" + selectValue + "\n```\n" + afterValue;
      setValue(newValue);
    },
  },
  {
    icon: link,
    onClick: (props: any) => {
      const { value, setValue, ref } = props;
      const { from, to } = ref.current.view?.viewState.state.selection.ranges[0];
      const beforeValue = value.substring(0, from);
      const selectValue = value.substring(from, to);
      const afterValue = value.substring(to, value.length);

      const newValue = beforeValue + `[${selectValue}](https://)` + afterValue;
      setValue(newValue);
    },
  },
  {
    icon: emoji,
    onClick: () => {
    },
  },
  {
    icon: question,
    onClick: () => {
    },
  },
];

const MarkDownEdit = (props: any) => {
  const { value, setValue } = props;
  const [type, setType] = useState<"edit" | "preview">("edit");
  const [height, setHeight] = useState(450);
  const [loading, setLoading] = useState(true);
  const ref = useRef<ReactCodeMirrorRef>();

  const onchange = (value: string) => {
    const viewportLines = ref?.current?.view?.viewState?.viewportLines;
    setHeight((prevState) => {
      return Math.max(value.split('\n').length * 25, 450);
    });
    setValue((prevState) => value);
  };

  useEffect(() => {
    setLoading(true);
    setHeight(Math.max(value.split('\n').length * 25, 450));
    setLoading(false);
  }, []);

  return (
    <Skeleton loading={loading}>
    <div style={{ backgroundColor: "white" }}>
      <Row>
        <Col span={24}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/*工具栏*/}
            <div>
              {type === "edit" &&
                tools.map((item, index) => (
                  <span onClick={() => item.onClick({ value, setValue, ref })} key={index} style={{ cursor: "pointer", margin: 8 }}>
                    <Avatar size={18} src={item.icon}></Avatar>
                  </span>
                ))}
            </div>
            {/*切换编辑模式*/}
            <div>
              <Segmented
                onChange={(value) => {
                  setType(value);
                }}
                style={{ backgroundColor: "white" }}
                value={type}
                options={[
                  {
                    label: "编辑",
                    value: "edit",
                    icon: <EditOutlined />,
                  },
                  {
                    label: "预览",
                    value: "preview",
                    icon: <EyeOutlined />,
                  },
                ]}
              />
            </div>
          </div>
        </Col>
        {/*编辑区或展示区*/}
        <Col span={24} style={{ border: "1.3px solid #D1D1D1", marginTop: 3, height: "auto" }}>
          {type === "edit" &&
            <ReactCodeMirror
              ref={ref}
              value={value}
              onChange={onchange}
              theme={githubLight}
              height={height.toString() + "px"}
              extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}></ReactCodeMirror>}
          {type === "preview" && (
            <div style={{ minHeight: "400px", backgroundColor: "white", padding: "30px 40px" }}>
              <MarkDownView>{value}</MarkDownView>
            </div>
          )}
        </Col>
      </Row>
    </div>
    </Skeleton>
  );
};

export default MarkDownEdit;

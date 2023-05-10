import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.css";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import "github-markdown-css"


const MarkDownView = (props:any) => {
  return (
    <div style={{width: "100%", backgroundColor: "white", margin: "0px auto 0px", padding: 0 }}>
      <object>
        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeKatex]} remarkPlugins={[remarkGfm, remarkMath]} className={"markdown-body"}>
          {props.children}
        </ReactMarkdown>
      </object>
    </div>
  );
};

export default MarkDownView;

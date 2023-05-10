import TextArea from "antd/es/input/TextArea";

const CommentEdit = (props:any) => {
  const {value, setValue} = props;
  return (
    <div>
      <TextArea placeholder={"发一条友善的评论吧!"} value={value} rows={2} onChange={(e) => {
        setValue(e.target.value);
      }} />
    </div>
  );
};

export default CommentEdit;

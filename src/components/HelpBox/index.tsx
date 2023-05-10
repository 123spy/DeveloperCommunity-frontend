import React, { useState } from 'react';
import { Input, Button, List } from 'antd';

const HelpBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <List
        style={{ height: 400, overflowY: 'scroll' }}
        dataSource={messages}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={handleSendMessage}
        placeholder="Type your message here"
        style={{ marginTop: 16 }}
      />
      <Button type="primary" onClick={handleSendMessage} style={{ marginTop: 16 }}>
        Send
      </Button>
    </div>
  );
};

export default HelpBox;

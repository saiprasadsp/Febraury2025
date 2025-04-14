import React, { useState } from 'react';
import { Upload, Button, Modal, Space } from 'antd';
import { UploadOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const PDFUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewFileUrl, setPreviewFileUrl] = useState(null);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = (file) => {
    let fileURL;

    if (file.url) {
      fileURL = file.url;
    } else {
      const fileObj = file.originFileObj || file;
      fileURL = URL.createObjectURL(fileObj);
    }

    setPreviewFileUrl(fileURL);
    setPreviewModalVisible(true);
  };

  const handleRemove = (file) => {
    setFileList(prevList => prevList.filter(f => f.uid !== file.uid));
  };

  return (
    <>
      <Upload
        accept=".pdf"
        multiple={false}
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={() => false}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload PDF</Button>
      </Upload>

      <Space style={{ marginTop: 16 }} direction="vertical">
        {fileList.map((file) => (
          <Space key={file.uid}>
            <span>{file.name}</span>
            <Button icon={<EyeOutlined />} onClick={() => handlePreview(file)} />
            <Button icon={<DeleteOutlined />} danger onClick={() => handleRemove(file)} />
          </Space>
        ))}
      </Space>

      <Modal
        title="PDF Preview"
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        <iframe
          src={previewFileUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
          frameBorder="0"
        />
      </Modal>
    </>
  );
};

export default PDFUploader;

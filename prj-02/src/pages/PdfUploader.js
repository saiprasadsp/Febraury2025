import { useEffect, useRef, useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";


const extractFileName=(url)=>{
try {
    const fileName = url.substring(url.lastIndexOf('/')+1)
    const extractedFileName = fileName.split('_').pop()
    return extractedFileName
} catch (err) {
    console.log("Error in extracting file name:",err?.data?.message);    
    toast.error(err?.data?.message)
    return null
}
}

const PdfUploader = ({ label, fileList, setFileList, initialFiles=[] }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewFile, setPreviewFile] = useState("");
    const hasInitialLoaded = useRef(false)
    // Load initial S3 files only once
    useEffect(() => {
        
        if (initialFiles.length>0 && !hasInitialLoaded.current && fileList.length===0) {            
            const formattedFiles = initialFiles.map((url, index) => ({
                uid: `s3-${index}`,
                name: extractFileName(url),
                url:url, // S3 file URL
                status: "done",
            }));
            setFileList(formattedFiles);
            hasInitialLoaded.current=true
        }
    }, [initialFiles,fileList,setFileList]); // Removed `fileList` from dependencies to avoid infinite loop

    const handlePreview = async (file) => {
        
        let fileUrl = file.url || file.thumbUrl;
        if (!fileUrl && file.originFileObj) {
            fileUrl = URL.createObjectURL(file.originFileObj);
        }

        if (window.innerWidth <= 768) {
            window.open(fileUrl, "_blank");
        } else {
            setPreviewFile(fileUrl);
            setPreviewVisible(true);
        }
    };

    const handleChange = ({ fileList }) => {
        const filteredList = fileList.filter(file => file.name.endsWith(".pdf"));
        setFileList(filteredList);
    };
    const handleRemove=(file)=>{
        setFileList([])
        hasInitialLoaded.current=true
    }
    

    return (
        <>
            <Upload
                listType="text"
                fileList={fileList}
                accept=".pdf"
                beforeUpload={() => false}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
            >
                {fileList.length >= 1 ? null : (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload {label}</div>
                    </div>
                )}
            </Upload>

            {/* Modal for PDF preview */}
            <Modal
                open={previewVisible}
                title="PDF Preview"
                footer={null}
                onCancel={() => setPreviewVisible(false)}
                width={800}
            >
                {previewFile ? (
                    <iframe src={previewFile} width="100%" height="500px" />
                ) : (
                    <p>No preview available</p>
                )}
            </Modal>
        </>
    );
};

export default PdfUploader;

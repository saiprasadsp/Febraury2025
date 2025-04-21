import React, { useState, useEffect, createContext, useRef, useContext } from "react";
import { Button, Table, Form, Input, Modal } from "antd";
import { useGetDistributorMutation, useUpdateDistributorMarginMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import "../../styles/AddDistributor.css";

const AddDistributor = () => {
    const [data, setData] = useState([]);
    const [getDistributor, { isLoading }] = useGetDistributorMutation();
    const [updateDistributorMargin] = useUpdateDistributorMarginMutation()
    const [updatedValues, setUpdatedValues] = useState(""); // Holds updates for margin values

    useEffect(() => {
        const fetchDistributor = async () => {
            try {
                const res = await getDistributor().unwrap();
                const formattedData = res.map((item) => ({
                    key: item.ID,
                    ID: item.distributor_id,
                    name: item.name_as_per_aadhaar,
                    mobile: item.user_mobile,
                    doj: item.doj,
                    margin: item.distributor_margin,
                }));
                setData(formattedData);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        };
        fetchDistributor();
    }, []);

    const EditableContext = createContext(null);

    const defaultColumns = [
        {
            title: "DB ID",
            dataIndex: "ID",
            width: "15%",
        },
        {
            title: 'Distributor Name',
            dataIndex: 'name',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobile',
            width: '20%',
        },
        {
            title: 'DOJ',
            dataIndex: 'doj',
            render: (date) => {
                return new Date(date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                });
            },
            width: "18%",
        },
        {
            title: 'Margin',
            dataIndex: 'margin',
            editable: true,
        },
        {
            title: 'Actions',
            dataIndex: 'view',
            width: 100,
            render: (_, record) => (
                <Button className="view-button">View</Button>
            ),
        },
    ];

    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({ title, editable, children, dataIndex, record, handlesave, ...restProps }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current?.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handlesave({
                    ...record,
                    ...values,
                });
            } catch (errInfo) {
                console.log('Save failed', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                    rules={[{ required: true, message: `${title} is required.` }]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{ paddingInlineEnd: 24 }} onClick={toggleEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const handlesave = async (row) => {
        Modal.confirm({
            title: "Confirm Save",
            content: 'Are you sure you want to continue?',
            onOk: async () => {
                try {
                    const res = await updateDistributorMargin({ id: row.ID, margin: row.margin }).unwrap()
                    toast.success(res.message)
                    const newData = [...data];
                    const index = newData.findIndex((item) => row.key === item.key);
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    setData(newData);

                    // Save updated values locally for the margin field
                    setUpdatedValues((prev) => ({
                        ...prev,
                        [row.key]: { ...prev[row.key], margin: row.margin },
                    }));
                } catch (err) {
                    toast.error(err?.data?.message || "Error in updating margin")
                }
            },
            onCancel: () => {
                console.log("User cancelled save");

            }
        })
    };

    const handleUpdateAll = async () => {
        if (updatedValues === "" || updatedValues === null || updatedValues === undefined) {
            toast.error("Please enter a Margin value before updating.")
            return
        }

        Modal.confirm({
            title: 'Confirm save',
            content: 'Are you sure you want to continue?',
            onOk: async () => {
                try {
                    await updateDistributorMargin({ margin: updatedValues }).unwrap()
                    toast.success("All Margins updated successfully")
                    const newData = data.map((item) => {
                        return { ...item, margin: updatedValues };
                    });
                    setData(newData);
                    setUpdatedValues(null); // Clear updated values after applying
                } catch (err) {
                    toast.error(err?.data?.message || "Failed to update margin")
                }

            },
            onCancel: async () => {
                console.log("User Cancelled update All");

            }
        })
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handlesave,
            }),
        };
    });

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Margin Value"
                    aria-label="Recipient's username"
                    onChange={(e) => setUpdatedValues(e.target.value)}
                />
                <button className="btn btn-update-all" type="button" onClick={handleUpdateAll}>
                    Update All
                </button>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowClassName={() => 'editable-row'}
                    components={components}
                />
            </div>
        </div>
    );
};

export default AddDistributor;

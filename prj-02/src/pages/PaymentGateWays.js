import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  message,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  useGetGateWaysMutation,
  useUpdateGateWaysMutation,
  useCreateGateWaysMutation,
} from "../slices/usersApiSlice";

const { Title } = Typography;

export default function PaymentGateWays() {

  const [gateways, setGateways] = useState([]);

  const [forms, setForms] = useState([]);

  const [getGateWays] = useGetGateWaysMutation();
  const [updateGateWays] = useUpdateGateWaysMutation();
  const [createGateWays] = useCreateGateWaysMutation();

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    try {
      const res = await getGateWays().unwrap();
      setGateways(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleExistingChange = (index, field, value) => {
    const updated = gateways.map((item, i) => i === index ? { ...item, [field]: value } : item,)
    setGateways(updated);
  };

  const updateGateway = async (gateway) => {
    try {
      await updateGateWays({
        id: gateway.id,
        name: gateway.name,
        super_distributor: gateway.super_distributor,
        distributor: gateway.distributor,
        retailer: gateway.retailer,
      }).unwrap();

      message.success("Gateway updated");
    } catch (error) {
      message.error("Update failed");
    }
  };

  const addGatewayForm = () => {
    setForms([
      ...forms,
      {
        name: "",
        super_distributor: 0,
        distributor: 0,
        retailer: 0,
      },
    ]);
  };

  const handleNewChange = (index, field, value) => {
    const updated = [...forms];
    updated[index][field] = value;
    setForms(updated);
  };

  const createGateway = async (form, index) => {
    try {
      await createGateWays(form).unwrap();

      message.success("Gateway created");

      const remaining = forms.filter((_, i) => i !== index);
      setForms(remaining);

      fetchGateways();

    } catch (error) {
      message.error("Create failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <Row gutter={[30, 30]}>

        {/* Existing Gateways */}
        {gateways?.map((gateway, index) => (
          <Col key={gateway.id}>
            <Card
              style={{
                width: 260,
                border: "1px solid #ff6b6b",
                borderRadius: 10,
              }}
            >
              <Title level={5}>{gateway.name}</Title>

              <Row justify="space-between" style={{ marginBottom: 20 }}>
                <span>Super Distributor</span>
                <InputNumber
                  value={gateway.super_distributor}
                  min={0}
                  step={0.01}
                  onChange={(value) =>
                    handleExistingChange(index, "super_distributor", value)
                  }
                />
              </Row>

              <Row justify="space-between" style={{ marginBottom: 20 }}>
                <span>Distributor</span>
                <InputNumber
                  value={gateway.distributor}
                  min={0}
                  step={0.01}
                  onChange={(value) =>
                    handleExistingChange(index, "distributor", value)
                  }
                />
              </Row>

              <Row justify="space-between" style={{ marginBottom: 25 }}>
                <span>Retailer</span>
                <InputNumber
                  value={gateway.retailer}
                  min={0}
                  step={0.01}
                  onChange={(value) =>
                    handleExistingChange(index, "retailer", value)
                  }
                />
              </Row>

              <Button
                type="primary"
                block
                onClick={() => updateGateway(gateway)}
              >
                Update
              </Button>
            </Card>
          </Col>
        ))}

        {/* New Gateway Forms */}
        {forms.map((form, index) => (
          <Col key={index}>
            <Card
              style={{
                width: 260,
                border: "1px dashed #999",
                borderRadius: 10,
              }}
            >

              <Input
                placeholder="Gateway Name"
                value={form.name}
                onChange={(e) =>
                  handleNewChange(index, "name", e.target.value)
                }
                style={{ marginBottom: 20 }}
              />

              <Row justify="space-between" style={{ marginBottom: 20 }}>
                <span>Super Distributor</span>
                <InputNumber
                  min={0}
                  step={0.01}
                  value={form.super_distributor}
                  onChange={(value) =>
                    handleNewChange(index, "super_distributor", value)
                  }
                />
              </Row>

              <Row justify="space-between" style={{ marginBottom: 20 }}>
                <span>Distributor</span>
                <InputNumber
                  min={0}
                  step={0.01}
                  value={form.distributor}
                  onChange={(value) =>
                    handleNewChange(index, "distributor", value)
                  }
                />
              </Row>

              <Row justify="space-between" style={{ marginBottom: 25 }}>
                <span>Retailer</span>
                <InputNumber
                  min={0}
                  step={0.01}
                  value={form.retailer}
                  onChange={(value) =>
                    handleNewChange(index, "retailer", value)
                  }
                />
              </Row>

              <Button
                type="primary"
                block
                onClick={() => createGateway(form, index)}
              >
                Create
              </Button>
            </Card>
          </Col>
        ))}

        {/* Add Button */}
        <Col>
          <Card
            style={{
              width: 260,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 220,
            }}
          >
            <Button type="primary" onClick={addGatewayForm}>
              Add Gateway
            </Button>
          </Card>
        </Col>

      </Row>
    </div>
  );
}
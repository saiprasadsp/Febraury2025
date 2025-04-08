import { Spin } from "antd";
import React from "react";

export default function Spinner({ loading = false, tip = "Loading..." }) {
  if (!loading) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin tip={tip} size="large" />
    </div>
  );
}

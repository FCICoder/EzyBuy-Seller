import React, { useState, useEffect, useRef, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Card from "../UI/Card";
import { MenuContext } from "../../contexts/Menu";
import "../UI/table.css";
import axios from "axios";

export default function OrdersStats() {
  const menuCtx = useContext(MenuContext);
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    async function getOrders() {
      try {
        const { data } = await axios.get(
          `https://nodee-f764.onrender.com/customer/order/all`,
          {
            headers: {
              authorization: localStorage.getItem("retailerToken"),
            },
          }
        );
        // console.log(data);
        if (data.message === "Products successfully retrieved") {
          // setIsLoading(false);
          setProducts(data?.products);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event) => {
    // toast.current.show({
    //   severity: "info",
    //   summary: "Product Expanded",
    //   detail: event.data.name,
    //   life: 3000,
    // });
  };

  const onRowCollapse = (event) => {
    // toast.current.show({
    //   severity: "success",
    //   summary: "Product Collapsed",
    //   detail: event.data.name,
    //   life: 3000,
    // });
  };

  const expandAll = () => {
    let _expandedRows = {};

    products.forEach((p) => (_expandedRows[`${p._id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const amountBodyTemplate = (rowData) => {
    return formatCurrency(rowData.amount);
  };

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status.toLowerCase()}
        severity={getOrderSeverity(rowData)}
      ></Tag>
    );
  };

  const searchBodyTemplate = () => {
    return <Button icon="pi pi-search" />;
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image}
        width="64px"
        className="shadow-4"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getProductSeverity(rowData)}
      ></Tag>
    );
  };

  const getProductSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const getOrderSeverity = (order) => {
    switch (order.status) {
      case "DELIVERED":
        return "success";

      case "CANCELLED":
        return "danger";

      case "PENDING":
        return "warning";

      case "RETURNED":
        return "info";

      default:
        return null;
    }
  };

  const allowExpansion = (rowData) => {
    return rowData.orders.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className={menuCtx.darkMode ? "dark" : ""}>
        <h5>Orders for {data.name}</h5>

        <DataTable
          value={products}
          removableSort
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="code"
            header="Code"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="category"
            header="Category"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="quantity"
            header="Quantity"
            sortable
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
      <Button
        icon="pi pi-minus"
        label="Collapse All"
        onClick={collapseAll}
        text
      />
    </div>
  );

  return (
    <Card>
      <div className={menuCtx.darkMode ? "dark" : ""}>
        <Toast ref={toast} />
        <DataTable
          value={products}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          header={header}
          tableStyle={{
            minWidth: "60rem",
          }}
        >
          <Column
            expander={allowExpansion}
            style={{
              width: "5rem",
            }}
          />
          <Column field="name" header="Name" sortable />
          <Column header="Image" body={imageBodyTemplate} />
          <Column
            field="price"
            header="Price"
            sortable
            body={priceBodyTemplate}
          />
          <Column field="category" header="Category" sortable />
          <Column
            field="rating"
            header="Reviews"
            sortable
            body={ratingBodyTemplate}
          />
          <Column
            field="inventoryStatus"
            header="Status"
            sortable
            body={statusBodyTemplate}
          />
        </DataTable>
      </div>
    </Card>
  );
}

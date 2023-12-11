import { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import "../UI/table.css";
import classes from "./ProductsData.module.css";
import { MenuContext } from "../../contexts/Menu";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TableContainer from "../UI/TableContainer";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import swal from "sweetalert";
export default function TemplateDemo() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    price: { value: null, matchMode: FilterMatchMode.EQUALS },
    category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  let navigate = useNavigate();

  async function getRetailerProducts() {
    setIsLoading(true);
    try {
      const {data} = await axios.get(`https://nodee-f764.onrender.com/product`,{
        headers: {
          authorization: localStorage.getItem("retailerToken"),
        },
      });
      if (data.message === "Products successfully retrieved") {
        setIsLoading(false);
        setProducts(data?.products);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const menuCtx = useContext(MenuContext);

  useEffect(() => {
    getRetailerProducts();
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`${product?.images[0]}`}
        alt={product?.image}
        className={classes?.img}
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price);
  };

  const ratingBodyTemplate = (product) => {
    return (
      <Rating value={Math.round(product.rating)} readOnly cancel={false} />
    );
  };

  const editProduct = (product) => {
    return (
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/edit/${product._id}`)}
      >
        Edit
      </button>
    );
  };

  const deleteProduct = (product) => {
    return (
      <button
        className="btn btn-danger"
        onClick={() => deletePrd(`${product._id}`)}
      >
        Remove
      </button>
    );
  };

  const deletePrd = async (id) => {
    swal("delete Product?", {
      buttons: {
        cancel: true,
        confirm: "Confirm",
      },
    })
    .then( async(value)=>{
      switch(value) {
        case true :
        try{
          let {data} = await axios.delete(`https://nodee-f764.onrender.com/product/${id}`,{
          headers: {
            'authorization': localStorage.getItem('retailerToken')
          },
        })
            if (data.message === "Product deleted successfully") {
              getRetailerProducts();
              swal("Done!", "Product was deleted!", "success");
              toast.success("deleted successfully", "success");
            }
          } catch (err) {
            console.log(err.message);
          }
          break;
        default:
          swal("canceled..!");
      }
    });
  };

  const statusBodyTemplate = (product) => {
    return (
      <Tag value={getStatus(product)} severity={getSeverity(product)}></Tag>
    );
  };

  const getStatus = (product) => {
    if(product.stock >= 100){
      return  'INSTOCK'
    }else if(product.stock <100){
      return  'LOWSTOCK' 
    }else if (product.stock === 0){
      return  'OUTOFSTOCK' 
    }
  };

  const getSeverity = (product) => {
    if(product.stock >= 100){
      return  'success'
    }else if(product.stock <100){
      return  'warning' 
    }else if (product.stock === 0){
      return  'danger' 
    }
  };

  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;
  const renderHeader = () => {
    return (
      <>
        <div className="container d-flex justify-content-between align-items-center">
          <span className="text-xl text-900 font-bold ">Products</span>
          <div className="flex justify-content-end w-100 mx-4">
            <span className="p-input-icon-left w-100">
              <i className="pi pi-search" />
              <InputText
                className="w-75 py-2"
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="product Search"
              />
            </span>
          </div>
          <div className={classes.header}>
            <div className="d-flex gap-2">
              <Button
                icon="pi pi-plus"
                style={{ background: "green" }}
                rounded
                raised
                onClick={() => navigate("/add")}
              />
              <Button
                icon="pi pi-refresh"
                rounded
                raised
                onClick={() => getRetailerProducts()}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {isLoading ? (
        <div
          className=" w-100 py-5 fs-1 d-flex justify-content-center align-items-center "
          style={{ height: "100vh" }}
        >
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <TableContainer>
          <div className={menuCtx.darkMode ? "dark" : ""}>
            <DataTable
              dataKey="id"
              globalFilterFields={["title"]}
              header={renderHeader}
              emptyMessage="No customers found."
              filters={filters}
              filterDisplay="row"
              showGridlines
              paginator
              rows={15}
              rowsPerPageOptions={[5, 10]}
              value={products}
              // header={header}
              footer={footer}
              tableStyle={{
                minWidth: "60rem",
                width: "100%",
              }}
            >
              <Column field="stock" sortable header="Quantity"></Column>
              <Column
                field="title"
                sortable
                header="Name"
                className={classes.names}
              ></Column>
              <Column
                header="Image"
                body={imageBodyTemplate}
              ></Column>
              <Column
                sortable
                field="price"
                header="Price"
                body={priceBodyTemplate}
              ></Column>
              <Column
                field="category"
                header="Category"
              ></Column>
              <Column
                sortable
                field="rating"
                header="Reviews"
                body={ratingBodyTemplate}
              ></Column>
              <Column header="Status" body={statusBodyTemplate}></Column>
              <Column header="Edit" body={editProduct}></Column>
              <Column header="Remove" body={deleteProduct}></Column>
            </DataTable>
            <Toaster />
          </div>
        </TableContainer>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import classes from './OrdersData.module.css'
import { ColorRing } from 'react-loader-spinner';
const OrderTable = () => {
    const [products, setProducts] = useState([]);
    const [statuses] = useState(['pending', 'shipping', 'delivered','canceled']);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getOrders() {
          setIsLoading(true);
            try {
              const { data } = await axios.get(
                `https://nodee-f764.onrender.com/customer/order/all`,
                {
                  headers: {
                    authorization: localStorage.getItem("retailerToken"),
                  },
                }
              );
              setProducts(data);
              setIsLoading(false);

            } catch (err) {
              console.log(err.message);
              setIsLoading(false);
            }
          }
          getOrders();
    }, []);
    const getSeverity = (status) => {
        switch (status) {
            case 'canceled':
                return 'danger';

            case 'delivered':
                return 'success';

            case 'pending':
                return 'info';

            case 'shipping':
                return 'warning';
            default:
                return 'pending'
        }
    };
    async function editOrder(status,productID,orderID){
        try {
            await axios({
                method: 'patch',
                url: `https://nodee-f764.onrender.com/customer/order/${orderID}`,
                headers:  {
                    authorization: localStorage.getItem("retailerToken"),
                  },
                  data:{
                    productID,
                    status
                }
              });
              window.location.reload();
           
          } catch (err) {
            console.log(err.message);
          }

    }
    const editTitle = (product) => {
      return <p className='fw-bold'>{product.title.toString().split(' ').splice(0,1).join(' ')}</p>
    };

    const editOrderStatus = (product) => {
        return <select className={classes.selectO} onChange={(e)=>editOrder(e.target.value,product.id,product.orderID)}>
            <option selected disabled>edit</option>
            <option value='pending'>pending</option>
            <option value='shipping'>shipping</option>
            <option value='delivered'>delivered</option>
        </select>;
      };
    const ProductImgTemp = (option)=>{
        return <img className='rounded-circle w-100' src={option.img} alt='imag l'/>
    }
    const productPriceTemp = (option)=>{
        return <p>${option.price}</p>
    }
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };
    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };
    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };
  return <>
    {isLoading?
      <div className=' w-100 py-5 fs-1 d-flex justify-content-center align-items-center ' style={{}}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
      :
    <div className="card">
            <DataTable 
             paginator
             rows={5} rowsPerPageOptions={[1, 3]}
            value={products.reverse()} removableSort tableStyle={{ minWidth: '10rem' }}>
                <Column field="customerName" header="Customer Name" sortable style={{ width: '25%' , fontWeight:'bold' }}></Column>
                <Column field="customerEmail" header="Customer Email" sortable style={{ width: '25%', fontWeight:'bold' }}></Column>
                <Column  header="Name" body={editTitle} sortable style={{ width: '100%' }}></Column>
                <Column field="img" header="image" body={ProductImgTemp}  style={{ width: '25%' }}></Column>
                <Column field="price" header="price" sortable body={productPriceTemp} style={{ width: '25%', fontWeight:'bold' }}></Column>
                <Column field="quantity" header="Quantity" sortable style={{ width: '25%', fontWeight:'bold' }}></Column>
                <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: 'fit-content' }}  body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} style={{  fontWeight:'bold' }}></Column>
                <Column header="edit status" body = {editOrderStatus}></Column>

            </DataTable>
        </div>
        }
  </>
}

export default OrderTable
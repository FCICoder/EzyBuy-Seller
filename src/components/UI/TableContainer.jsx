import classes from './Container.module.css'
const TableContainer =({children})=>{
    
    return <>
        <div className={classes.tableContainer}>
            {children}
        </div>
        </>
}
export default TableContainer
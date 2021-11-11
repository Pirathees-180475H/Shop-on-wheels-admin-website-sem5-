import React from 'react';
import MUIDataTable from "mui-datatables";

function customerTable({userTableData}) {
    return (
        <div>
            <MUIDataTable
            title="customers List"
            data={userTableData}
            columns={["username", "email", "mobile", "paymentMethod",'language','lastname',"id"]}
            options={{
            filterType: "checkbox",
            downloadOptions:{
            filterOptions:{
            useDisplayedColumnsOnly:true,
            useDisplayedRowsOnly:true
            }
              },
            selectableRows:"none"}}
          />
        </div>
    )
}

export default customerTable

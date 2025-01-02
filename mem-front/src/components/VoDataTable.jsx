
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Link } from "@mui/material";

// const columns = [
//   {field: 'id', headerName: 'ID'},
//   {field: 'res_title', headerName: 'Title'},
//   {field: 'res_description', headerName: 'Description'},
//   {field: 'content_level', headerName: 'Content Level'},
//   {field: 'waveband', headerName: 'Waveband'},
//   {field: 'created', headerName: 'Created at'},
//   {field: 'updated', headerName: 'Last updated at'},
//   {field: 'access_urls', headerName: 'Access Urls'},
//   {field: 'access_modes', headerName: 'Access Modes'},
// ]

function getCols(raw_cols){
  const columns = raw_cols.map((col) => {
    let cap_col = String(col).charAt(0).toUpperCase() + String(col).slice(1);
    if (String(col) == "url"){
      return {
        field: String(col), 
        headerName: "URL", 
        renderCell: (params) => <Link href={params.value} target="_blank">{params.value}</Link>
      }
    }
    return {field: String(col), headerName: cap_col.replace("_"," ")}
  })
  return columns;
}

const paginationModel = { page: 0, pageSize: 3 };

function VoDataTable(table_obj, height=400, width='100%', pageSize=[3,6]) {  
  var data_table = table_obj.table_obj;
  for (let i = 1; i <= data_table.length; i++){
    data_table[i-1].id = i;
  }
  const columns = getCols(Object.keys(data_table[0]));
  return (
    <Paper sx={{ height: height, width: width }}>
      <DataGrid
        rows={data_table}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSize}
        sx={{ 
          border: 0,
          "& .MuiDataGrid-cell": { // Contenedeor directo del texto
            whiteSpace: "normal",
            lineHeight: "normal",
            height: "unset !important"
          },
          "& .MuiDataGrid-row": { // "Fila"
            // Forced to use important since overriding inline styles
            maxHeight: "168px !important"
          }

        }}
        autosizeOnMount
        density="comfortable"
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableColumnSorting
        disableDensitySelector
        disableRowSelectionOnClick
      />
    </Paper>
  );
}

export default VoDataTable;
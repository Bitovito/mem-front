
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  {field: 'id', headerName: 'ID'},
  {field: 'res_title', headerName: 'Title'},
  {field: 'res_description', headerName: 'Description'},
  {field: 'content_level', headerName: 'Content Level'},
  {field: 'waveband', headerName: 'Waveband'},
  {field: 'created', headerName: 'Created at'},
  {field: 'updated', headerName: 'Last updated at'},
  {field: 'access_urls', headerName: 'Access Urls'},
  {field: 'access_modes', headerName: 'Access Modes'},
]

const paginationModel = { page: 0, pageSize: 3 };

function VoDataTable(table_obj, height=400, width='100%', pageSize=[3,6]) {  
  var data_table = table_obj.table_obj;
  for (let i = 1; i <= data_table.length; i++){
    data_table[i-1].id = i;
  }
  return (
    <Paper sx={{ height: height, width: width }}>
      <DataGrid
        rows={data_table}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSize}
        sx={{ border: 0 }}
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
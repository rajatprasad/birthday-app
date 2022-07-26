import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./people.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Peoples({ data, deleteData, updateData }) {
  const handleDelete = (event, cellValues) => {
    deleteData(cellValues.row.id);
  };

  const handleUpdate = (event, cellValues) => {
    updateData(cellValues.row.id);
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "friends",
      headerName: "Friends",
      width: 300,
      renderCell: (params) => (
        <div className="users">
          <img src={params.row.img} alt="" />
          {params.row.name}
        </div>
      ),
    },

    {
      field: "age",
      headerName: "Age",
      //   type: "number",
      width: 150,
    },

    {
      field: "birthday",
      headerName: "Birth Date",
      //   type: "number",
      width: 200,
    },
    {
      field: "Edit",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Link to="/add">
            <Button
              className="edit__btn"
              variant="contained"
              onClick={(event) => {
                handleUpdate(event, cellValues);
              }}
            >
              Edit
            </Button>
          </Link>
        );
      },
    },
    {
      field: "Delete",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              handleDelete(event, cellValues);
            }}
          >
            <DeleteIcon className="delete__btn" />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className="people">
      <Box sx={{ height: 400, width: "100%" }}>
        <h1 className="people__title">Friends</h1>
        <DataGrid
          className="table"
          autoHeight={true}
          rows={data}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          // checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
}

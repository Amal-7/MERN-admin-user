import React, { useEffect, useState } from 'react'
import instance from '../../Axios/axios';
import MUIDataTable from "mui-datatables";
import { styled } from '@mui/system';
import { Button, Modal, TextField,Dialog, DialogActions, DialogTitle  } from '@mui/material';



const UserList = () => {
    const [rows,setRows] = useState([])
    const [openDialog, setOpenDialog] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    useEffect(()=>{
        instance.get('/admin/userList').then((res)=>{
            setRows([...rows,...res.data])

        }).catch((res)=>{

        })
    },[])

    const ButtonGroup = styled('div')({
        '& > *': {
          marginRight: 8,
        },
        
       
      });
      const ModalContent = styled('div')({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        padding: 16,
        outline: 'none',
      });
      
      const CustomActionsCell = ({ row,  onDelete }) => {
        const [modalOpen, setModalOpen] = useState(false);
        const [formData, setFormData] = useState({});
      
        useEffect(() => {
          setFormData(row);
        }, [row]);
      
        const handleOpenModal = () => {
          setModalOpen(true);
        };
      
        const handleCloseModal = () => {
          setModalOpen(false);
        };
      
        const handleInputChange = (event) => {
          const { name, value } = event.target;
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        };

      
      
        const handleFormSubmit = (event) => {
          event.preventDefault();
          instance.put('/admin/user',formData).then((res)=>{
            const updatedData= rows.map((row)=>{
                if(row._id===res.data._id){
                    return res.data
                }else{
                    return row
                }

            })
            setRows([...updatedData])
          }).catch((res)=>{
                alert(res)
          })
          handleCloseModal();
        };
      
        return (
          <ButtonGroup>
            <Button className='mx-3' variant="contained" color="primary" onClick={handleOpenModal}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={()=>onDelete(row)}>
              Delete
            </Button>
            <Modal open={modalOpen} onClose={handleCloseModal}>
              <ModalContent>
                <form onSubmit={handleFormSubmit}>
                  <TextField
                    name="name"
                    label="UserName"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="number"
                    label="Number"
                    value={formData.number || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  {/* Add more form fields as needed */}
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </form>
              </ModalContent>
            </Modal>
            <Dialog open={openDialog} onClose={cancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error">
                    Delete
                    </Button>
                </DialogActions>
        </Dialog>
          </ButtonGroup>
        );
      };

      const handleDelete = (row) => {
        setDeletingUser(row);
        setOpenDialog(true);
      };

      const confirmDelete = () => {
        // Perform the delete operation with deletingUser
        // ...

        instance.post('/admin/user',deletingUser).then((res)=>{
            console.log(res.data,'res data')
            if(res.data){

                let id = res.data._id
                const updatedList = (rows.filter((row)=>{
                    return row._id !== id
                }))
                console.log(updatedList)
                setRows(updatedList)
            }

        }).catch((err)=>{
            alert(err)
        })
      
        // Close the dialog and reset deletingUser
        setOpenDialog(false);
        setDeletingUser(null);
      };
    
      const cancelDelete = () => {
        setOpenDialog(false);
        setDeletingUser(null);
      };

      

      
      


    const columns = [
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "email",
         label: "Email",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "number",
         label: "Number",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
            name: 'Actions',
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta) => (
                <CustomActionsCell
                  row={rows[tableMeta.rowIndex]}
                  onDelete={handleDelete}
                />
              ),
            },
          }
       
       ];
       
       
       const options = {
         filterType: 'checkbox',
       };
  return (
    <div className='container'>
        <MUIDataTable
            title={"Users List"}
            data={rows}
            columns={columns}
            options={options}
        />

 

    </div>
  )
}

export default UserList
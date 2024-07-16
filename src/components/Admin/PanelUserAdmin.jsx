import React, { useState, useEffect } from "react";
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import instance from "../../api/axios"; 

const UserAdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 

  const fetchData = async () => {
    try {
      const response = await instance.get(`/user/getAll`); 
      const filteredUsers = response.data.filter(user => user.role === 'client');
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (_id, userName) => {
    try {
      setIsLoading(true);
      if (window.confirm(`Are you sure you want to permanently delete the user ${userName}?`)) {
        await instance.delete(`/user/delete/${_id}`);
        const totalPagesAfterDelete = Math.ceil((users.length - 1) / itemsPerPage);
        const newCurrentPage = Math.min(currentPage, totalPagesAfterDelete); 
        setCurrentPage(newCurrentPage);
        setChangeFlag(!changeFlag);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [changeFlag]);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" component="h3" align="center" pt={12} gutterBottom>
        User Administration
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress />
        </Box>
      ) : users.length === 0 ? (
        <Typography variant="body1" align="center">No users to display</Typography>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>Full Name</b></TableCell>
                  <TableCell align="center"><b>DNI</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{user.fullName}</TableCell>
                    <TableCell align="center">{user.dni}</TableCell>
                    <TableCell align="center">
                      <Button variant='contained' color='error' size='small' onClick={() => handleDeleteUser(user._id, user.fullName)}>
                        <DeleteIcon fontSize='small'/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" my={3}>
            <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
          </Box>
        </>
      )}
    </Container>
  );
};

export default UserAdminPanel;

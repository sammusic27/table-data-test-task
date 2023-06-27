import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import { useUsers, User } from './hocs/users'
import './App.css'

const columns: TableColumn<User>[] = [
  {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
  },
  {
      name: 'Username',
      selector: row => row.username,
      sortable: true,
  },
  {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
    sortable: true,
},
];

function App() {
  // state of users
  const { data, isLoading, error, addNewUser, deleteUsers } = useUsers();

  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);

  // custom filter for email and username
	const filteredItems = data.filter(
		(item) => {
      const filteredText = filterText.toLowerCase();
      return [item.email, item.username].some((property) => property.toLowerCase().includes(filteredText));
  }
	);

  // include the filter component into table
	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
      <div>
        <input type="text" onChange={(e:any) => setFilterText(e.target.value)} value={filterText} />
        <button onClick={handleClear}>Clear</button>
      </div>
		);
	}, [filterText, resetPaginationToggle]);

  // add new user handler
  const handleAddNewUser = () => {
    const latestId = [...data].sort((a, b) => a.id > b.id ? -1 : 1)?.[0]?.id;
    const newId = latestId ? latestId + 1 : 1;

    addNewUser({
      id: newId,
      username: `new-user-${newId}`,
      email: `new-user-${newId}@gmail.com`,
      phone: '999999'
    });
  }
  
  const handleRowSelected = React.useCallback((state: any) => {
		setSelectedRows(state.selectedRows);
	}, []);

  // add delete action for all selected users
	const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r: User) => r.id).join(', ')}?`)) {
				setToggleCleared(!toggleCleared);
				deleteUsers(selectedRows);
			}
		};

		return (
			<button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} >
				Delete
			</button>
		);
	}, [filteredItems, selectedRows, toggleCleared]);

  const isAddNewUserDisabled = !!error || isLoading;

  return (
    <>
      {error}
      {!error && <DataTable
        title="Users"
        columns={columns}
        data={filteredItems}
        defaultSortFieldId={1}
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        progressPending={isLoading}
        subHeader
			  subHeaderComponent={subHeaderComponentMemo}
        pagination 
        paginationResetDefaultPage={resetPaginationToggle}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        dense
      />}
      <button onClick={handleAddNewUser} disabled={isAddNewUserDisabled}>Add New User</button>
    </>
  )
}

export default App

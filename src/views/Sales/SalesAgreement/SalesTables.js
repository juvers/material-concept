import React, {useMemo} from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
  useColumnOrder
} from "react-table";
import matchSorter from "match-sorter";
import Button from "components/CustomButtons/Button";

// icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import PollIcon from '@material-ui/icons/Poll';
import LeakAddIcon from '@material-ui/icons/LeakAdd';
import LeakRemoveIcon from '@material-ui/icons/LeakRemove';

// recoil 
import {useRecoilValueLoadable} from 'recoil';
import {fetchJobDetailsState} from './SalesAgreement';

// loader
import Loader from 'components/Loader/Loader';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';

// import makeData from "./makeData";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border-collapse: collapse;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tr:nth-child(even){background-color: #f2f2f2;}
    tr:hover {background-color: #ddd;}
   

    th,
    td {
      margin: 0;
      border: 1px solid #ddd;
      padding: 8px;

      :last-child {
        border-right: 0;
      }
    }

    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #6d2a5b;
    color: white;
  }
  .pagination {
    padding: 0.5rem;
  }
  div{
    overflow-x:auto;
  }
`;

// Create an editable cell renderer
// const EditableCell = ({
//   value: initialValue,
//   row: { index },
//   column: { id },
//   updateMyData, // This is a custom function that we supplied to our table instance
//   editable
// }) => {
//   // We need to keep and update the state of the cell normally
//   const [value, setValue] = React.useState(initialValue);

//   const onChange = (e) => {
//     setValue(e.target.value);
//   };

//   // only update the external data when the input is blurred
//   // const onBlur = () => {
//   //   updateMyData(index, id, value);
//   // };

//   // If the initialValue is changed externall, sync it up with our state
//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   if (!editable) {
//     return `${initialValue}`;
//   }

//   return <input value={value} onChange={onChange} />;
// };

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      style={{minWidth: "100px"}}
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
// function SliderColumnFilter({
//   column: { filterValue, setFilter, preFilteredRows, id }
// }) {
//   // Calculate the min and max
//   // using the preFilteredRows

//   const [min, max] = React.useMemo(() => {
//     let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
//     preFilteredRows.forEach((row) => {
     
//       if(isNaN(+(row.values[id]) )){
//         min = 0;
//         max = 0;
//       }else{
//         min = Math.min(+(row.values[id]), min);
//         max = Math.max(+(row.values[id]), max); 
//       }
     
     
//     });
//     return [min, max];
//   }, [id, preFilteredRows]);
//   console.log("Minimun val: ", typeof min, min)

//   console.log("Minimun val: ", typeof max, max)

//   return (
//     <>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={filterValue || min}
//         onChange={(e) => {
//           setFilter(parseInt(e.target.value, 10));
//         }}
//       />
//       <button onClick={() => setFilter(undefined)}>Off</button>
//     </>
//   );
// }

// This is a custom UI for 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
   
    preFilteredRows.forEach((row) => {
      if(isNaN(+(row.values[id]) )){
        min = 0;
        max = 0;
      }else{
        min = Math.min(+(row.values[id]), min);
        max = Math.max(+(row.values[id]), max); 
      }
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = +(e.target.value);
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1]
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem"
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = +(e.target.value);
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem"
        }}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
  );

  function shuffle(arr) {
    arr = [...arr]
    const shuffled = []
    while (arr.length) {
      const rand = Math.floor(Math.random() * arr.length)
      shuffled.push(arr.splice(rand, 1)[0])
    }
    return shuffled
  }
// Be sure to pass updateMyData and the skipReset option
function Table({ columns, data, updateMyData, skipReset }) {


  const getDataValue = (data, id) =>{
    const newData = data.find(value => value.JobNumber === id);
    return newData;
  }

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      //TODO: make all cells editable
      // Cell: EditableCell
    }),
    []
  );

  

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // rows,
    page, // Instead of using 'rows', use page,
    // which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    getToggleHideAllColumnsProps,
    setColumnOrder,
    visibleColumns,
    allColumns,
    state: {
      pageIndex,
      pageSize,
      // sortBy,
      // groupBy,
      // expanded,
      // filters,
      // columnOrder,
      //   hiddenColumns,
      // selectedRowIds
    }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true
    },
    useColumnOrder,
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    // Use a plugin to add our selection column
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            // Make this column a groupByBoundary. This ensures that groupBy columns
            // are placed after it
            groupByBoundary: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
              View
                {/*<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} /> */}
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            // TODO: render clickable eye icon to view page
            Cell: ({ row }) => (
                <div style={{display: "flex"}}>
              {/*<div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div> */}
              <Link to={{pathname: `/admin/sales-details/${row.original.JobNumber}`, state: getDataValue(data, row.original.JobNumber)}}>

              <VisibilityIcon onClick={() => console.log(row.original.JobNumber)} style={{marginTop: "-3px", marginLeft: "3px", cursor: "pointer"}}/> </Link>
              </div>
            )
          },
          ...columns
        ];
      });
    }
  );

  // const spring = React.useMemo(
  //   () => ({
  //     type: 'spring',
  //     damping: 50,
  //     stiffness: 100,
  //   }),
  //   []
  // );

  const randomizeColumns = () => {
    setColumnOrder(shuffle(visibleColumns.map(d => d.id)))
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  // Render the UI for your table
  return (
    <>
    <div style={{overflowX: "auto"}}>
     <div>
     <Button
     color="info" aria-describedby={id} type="button" onClick={handleClick}>
             Table Settings
           </Button>
           <Popper id={id} open={open} anchorEl={anchorEl} transition placement={'bottom-start'}>
             {({ TransitionProps }) => (
               <Fade {...TransitionProps} timeout={350}>

                 <div className={classes.paper}>
                 
                 
                 <Button
                 color="info"
                 // className={classes.marginRight}
                 onClick={() => randomizeColumns({})}>
                 Randomize Columns
               </Button>

               <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>

        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
               
               </div>
               </Fade>
             )}
           </Popper>
   
        
       
        <br />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? <GroupWorkIcon /> :  <PollIcon />}
                      </span>
                    ) : null}
                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? <LeakRemoveIcon /> : <LeakAddIcon />}
                          </span>{" "}
                          {cell.render("Cell", { editable: false })} (
                          {row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell                 
                        
                        cell.render("Cell", { editable: true })
                       
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>
      <pre>
 {/*   <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              sortBy,
              groupBy,
              expanded: expanded,
              filters,
              columnOrder,
              hiddenColumns,
              selectedRowIds: selectedRowIds
            },
            null,
            2
          )}
          </code>  */}
       
      </pre>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
// function roundedMedian(leafValues) {
//   let min = leafValues[0] || 0;
//   let max = leafValues[0] || 0;

//   leafValues.forEach((value) => {
//     min = Math.min(min, value);
//     max = Math.max(max, value);
//   });

//   return Math.round((min + max) / 2);
// }


function SalesTables() {

  const jobDetailsLocal = useRecoilValueLoadable(fetchJobDetailsState);
  const fetchDetails = useMemo(() => jobDetailsLocal, [jobDetailsLocal]);



  const salesColumnz = useMemo(() =>
      [
        { 
        accessor: 'JobNumber', 
        Header: 'Job Number', minWidth: 150,
        aggregate: "count",
        Aggregated: ({ value }) => `${value} Job(s)`
        },
        { 
          accessor: 'ProjectName', 
          Header: 'Project Name', 
          minWidth: 150,
          aggregate: "count",
          Aggregated: ({ value }) => `${value} Project(s)` 
        },
        { 
          accessor: 'Address', 
          Header: 'Address', 
          minWidth: 150,
          aggregate: "count",
          Aggregated: ({ value }) => `${value} Address(es)` 
        },
        { 
          accessor: 'City', 
          Header: 'City', 
          minWidth: 150,
          aggregate: "count",
          Filter: SelectColumnFilter,
          filter: "includes" 
        },
        { 
          accessor: 'State', 
          Header: 'State', 
          minWidth: 150,
          aggregate: "count",
          Filter: SelectColumnFilter,
          filter: "includes" 
        },
        { 
          accessor: 'Zip', 
          Header: 'Zip', 
          minWidth: 100,
          Filter: NumberRangeColumnFilter,
          filter: "between",
            // Aggregate the sum of all zips
          aggregate: "count",
          Aggregated: ({ value }) => `${+value} (codes)`
        },
        { 
          accessor: 'County', 
          Header: 'County', 
          minWidth: 150,
          aggregate: "count",
          Filter: SelectColumnFilter,
          filter: "includes"
        },
        { 
          accessor: 'Plan', 
          Header: 'Plan', 
          minWidth: 150,
          aggregate: "count",
          Aggregated: ({ value }) => `${value} Address(es)` 
        },
        { 
          accessor: 'Elevation', 
          Header: 'Elevation', 
          minWidth: 100,
          aggregate: "uniqueCount",
          Filter: SelectColumnFilter,
          filter: "includes"

        },
        { 
          accessor: 'PurchaserName', 
          Header: 'Purchaser Name', 
          minWidth: 150,
          filter: "fuzzyText",
                  // Use another two-stage aggregator here to
                  // first count the UNIQUE values from the rows
                  // being aggregated, then sum those counts if
                  // they are aggregated further
          aggregate: "uniqueCount",
          Aggregated: ({ value }) => `${value} Unique Names`
        },
        { 
          accessor: 'SalesPrice', 
          Header: 'Sales Price', 
          minWidth: 150,
          Filter: NumberRangeColumnFilter,
          filter: "between",
          // Aggregate the average age of visitors
          aggregate: "sum",
          Aggregated: ({ value }) => `${value} (sum)`
        }
      ],[]);


//   get data and pass to state
//   const [data, setData] = React.useState(() => makeData(10000));
//  console.log("Checking value in data: ", data);

//   const [originalData] = React.useState(data);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  // const skipResetRef = React.useRef(false);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  // const updateMyData = (rowIndex, columnId, value) => {
  //   // We also turn on the flag to not reset the page
  //   skipResetRef.current = true;
  //   setData((old) =>
  //     old.map((row, index) => {
  //       if (index === rowIndex) {
  //         return {
  //           ...row,
  //           [columnId]: value
  //         };
  //       }
  //       return row;
  //     })
  //   );
  // };

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  // React.useEffect(() => {
  //   skipResetRef.current = false;
  // }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  // const resetData = () => {
  //   // Don't reset the page when we do this
  //   skipResetRef.current = true;
  //   setData(originalData);
  // };

  return (
<>


   
    {fetchDetails.state === 'hasValue' ?
    <Styles>
  
      <Table
        columns={salesColumnz}
        data={fetchDetails.contents.refinedData}
        // updateMyData={updateMyData}
        // skipReset={skipResetRef.current}
      />
    </Styles>
    : (fetchDetails.state === "loading" ? <Loader /> : <div>Error Loading Page</div>)}
    </>
  );
}

export default SalesTables;

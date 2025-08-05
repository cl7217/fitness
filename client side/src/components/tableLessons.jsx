import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

function RatingInputValue(props) {
  const { item, applyValue, focusElementRef } = props;

  const ratingRef = React.useRef(null);
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      ratingRef.current
        .querySelector(`input[value="${Number(item.value) || ''}"]`)
        .focus();
    },
  }));

  const handleFilterChange = (event, newValue) => {
    applyValue({ ...item, value: newValue });
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        pl: '20px',
      }}
    >
      <Rating
        name="custom-rating-filter-operator"
        value={Number(item.value)}
        onChange={handleFilterChange}
        precision={0.5}
        ref={ratingRef}
      />
    </Box>
  );
}

const ratingOnlyOperators = [
  {
    label: 'Above',
    value: 'above',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null;
      }
      return (value) => {
        return Number(value) >= Number(filterItem.value);
      };
    },
    InputComponent: RatingInputValue,
    getValueAsString: (value) => `${value} Stars`,
  },
];

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function CustomRatingOperator() {
  const { data, loading } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  // Modern theme for the data grid
  const theme = createTheme({
    palette: {
      primary: {
        main: orange[800],
      },
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            backgroundColor: '#ffffff',
          },
          columnHeaders: {
            backgroundColor: 'linear-gradient(135deg, #f57c00 0%, #e65100 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
            borderBottom: 'none',
            '& .MuiDataGrid-columnHeader': {
              borderRight: '1px solid rgba(255,255,255,0.1)',
              '&:last-child': {
                borderRight: 'none',
              },
            },
          },
          row: {
            '&:nth-of-type(even)': {
              backgroundColor: '#fafafa',
            },
            '&:hover': {
              backgroundColor: 'rgba(245, 124, 0, 0.04)',
              transform: 'translateY(-1px)',
              transition: 'all 0.2s ease',
            },
            borderBottom: '1px solid #f0f0f0',
          },
          cell: {
            borderRight: '1px solid #f0f0f0',
            fontSize: '14px',
            fontWeight: 400,
            '&:last-child': {
              borderRight: 'none',
            },
          },
          footerContainer: {
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fafafa',
          },
        },
      },
    },
  });

  const columns = React.useMemo(
    () =>
      data.columns.map((col) =>
        col.field === 'rating'
          ? {
              ...col,
              filterOperators: ratingOnlyOperators,
            }
          : col,
      ),
    [data.columns],
  );
  console.log("col",columns);
  

  return (
    <ThemeProvider theme={theme}>
      <div style={{ 
        height: 500, 
        width: '100%',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '16px'
      }}>
        <Box sx={{
          mb: 3,
          textAlign: 'center'
        }}>
          <h2 style={{
            color: orange[800],
            fontSize: '28px',
            fontWeight: 600,
            margin: '0 0 8px 0',
            fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
          }}>
            מערכת השעות
          </h2>
          <p style={{
            color: '#666',
            fontSize: '16px',
            margin: 0,
            fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
          }}>
            צפה וניהול השעורים שלך
          </p>
        </Box>
        
        <DataGrid
          {...data}
          loading={loading}
          columns={columns}
          showToolbar
          sx={{
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #f0f0f0',
              padding: '12px 16px',
              borderRadius: '8px 8px 0 0',
            },
            '& .MuiDataGrid-toolbarContainer button': {
              backgroundColor: orange[800],
              color: 'white',
              borderRadius: '6px',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: orange[700],
              },
            },
          }}
          initialState={{
            ...data.initialState,
            filter: {
              ...data.initialState?.filter,
              filterModel: {
                items: [
                  {
                    id: 1,
                    field: 'rating',
                    value: '3.5',
                    operator: 'above',
                  },
                ],
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

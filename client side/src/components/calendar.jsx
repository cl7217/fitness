import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Modal } from './Modal';

export default function BasicDateCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar 
          onChange={handleDateClick}
          sx={{
            '& .MuiPickersDay-root': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#e3f2fd',
              }
            }
          }}
        />
      </LocalizationProvider>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={selectedDate ? `תאריך נבחר: ${selectedDate.format('DD/MM/YYYY')}` : 'פרטי התאריך'}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            לחצת על התאריך: {selectedDate ? selectedDate.format('DD/MM/YYYY') : ''}
          </p>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-800">פעולות זמינות:</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                הוסף אירוע
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                צפה באירועים
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">פרטים נוספים:</h4>
            <p className="text-sm text-gray-600">
              כאן תוכל להוסיף פרטים נוספים על התאריך הנבחר או לראות אירועים קיימים.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
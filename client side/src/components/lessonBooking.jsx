import React, { useState } from 'react';
import { Modal } from './Modal';

const LessonBooking = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myLessons, setMyLessons] = useState([]);

  // ימי השבוע
  const daysOfWeek = [
    { id: 0, name: 'ראשון', hebrew: 'ראשון' },
    { id: 1, name: 'שני', hebrew: 'שני' },
    { id: 2, name: 'שלישי', hebrew: 'שלישי' },
    { id: 3, name: 'רביעי', hebrew: 'רביעי' },
    { id: 4, name: 'חמישי', hebrew: 'חמישי' },
    { id: 5, name: 'שישי', hebrew: 'שישי' },
    { id: 6, name: 'שבת', hebrew: 'שבת' }
  ];

  // שעות זמינות
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // יצירת 4 השבועות הבאים
  const getNextWeeks = () => {
    const weeks = [];
    const today = new Date();
    
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + (i * 7));
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      weeks.push({
        id: i,
        start: weekStart,
        end: weekEnd,
        label: `שבוע ${i + 1} (${weekStart.toLocaleDateString('he-IL')} - ${weekEnd.toLocaleDateString('he-IL')})`
      });
    }
    
    return weeks;
  };

  const weeks = getNextWeeks();

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
  };

  const handleConfirmBooking = () => {
    if (selectedDay && selectedTime && selectedWeek) {
      const newLesson = {
        id: Date.now(),
        day: selectedDay,
        time: selectedTime,
        week: selectedWeek,
        date: new Date(selectedWeek.start.getTime() + (selectedDay.id * 24 * 60 * 60 * 1000)),
        status: 'confirmed'
      };
      
      setMyLessons([...myLessons, newLesson]);
      setIsModalOpen(false);
      setSelectedDay(null);
      setSelectedTime(null);
      setSelectedWeek(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
    setSelectedTime(null);
    setSelectedWeek(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">רכישת כרטיסים לשעורים</h1>
      
      {/* לוח השעות השבועי */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">בחר יום ושעה:</h2>
        
        <div className="grid grid-cols-7 gap-4">
          {daysOfWeek.map((day) => (
            <div key={day.id} className="text-center">
              <div className="font-medium text-gray-600 mb-2">{day.hebrew}</div>
              <div className="space-y-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleDayClick(day)}
                    className="w-full py-2 px-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors text-sm"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* השעורים שלי */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">השעורים שלי:</h2>
        {myLessons.length === 0 ? (
          <p className="text-gray-500 text-center py-8">אין שעורים שמורים עדיין</p>
        ) : (
          <div className="space-y-3">
            {myLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <div className="font-medium text-green-800">
                    {lesson.day.hebrew} - {lesson.time}
                  </div>
                  <div className="text-sm text-green-600">
                    {lesson.week.label}
                  </div>
                  <div className="text-sm text-green-600">
                    {lesson.date.toLocaleDateString('he-IL')}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {lesson.status === 'confirmed' ? 'מאושר' : 'ממתין'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal לבחירת שבוע */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`בחר שבוע עבור ${selectedDay?.hebrew} - ${selectedTime}`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {weeks.map((week) => (
              <button
                key={week.id}
                onClick={() => handleWeekSelect(week)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedWeek?.id === week.id
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="font-medium">{week.label}</div>
                <div className="text-sm text-gray-600">
                  {week.start.toLocaleDateString('he-IL')} - {week.end.toLocaleDateString('he-IL')}
                </div>
              </button>
            ))}
          </div>

          {selectedWeek && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">פרטי השעור:</h3>
                <div className="text-blue-700">
                  <div>יום: {selectedDay?.hebrew}</div>
                  <div>שעה: {selectedTime}</div>
                  <div>תאריך: {new Date(selectedWeek.start.getTime() + (selectedDay.id * 24 * 60 * 60 * 1000)).toLocaleDateString('he-IL')}</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                >
                  אישור הזמנה
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ביטול
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LessonBooking; 
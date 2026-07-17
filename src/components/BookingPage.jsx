import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { seatSelectorStyles } from '../assets/dummyStyles';
import moviesData from '../assets/dummymoviedata';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, Monitor, Calendar, Clock, Ticket, Info, CheckCircle2 } from 'lucide-react';

// Pricing
const PRICES = {
  STANDARD: 200,
  RECLINER: 350
};

// Mock dates
const DATES = [
  { id: 1, label: 'Today', date: '17 Jul' },
  { id: 2, label: 'Tomorrow', date: '18 Jul' },
  { id: 3, label: 'Thu', date: '19 Jul' }
];

// Mock times
const TIMES = ['10:00 AM', '01:30 PM', '04:45 PM', '08:00 PM'];

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get movie from route state, else fallback to first movie
  const initialMovie = location.state?.movie || moviesData[0];
  const [movie, setMovie] = useState(initialMovie);
  
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState(TIMES[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(['A3', 'A4', 'C7', 'C8', 'D4', 'D5']); // Random mock booked seats
  const [isProcessing, setIsProcessing] = useState(false);

  // Seat Grid Configuration
  // 5 rows, 8 seats each. A-C Standard, D-E Recliner
  const rows = [
    { label: 'A', type: 'standard' },
    { label: 'B', type: 'standard' },
    { label: 'C', type: 'standard' },
    { label: 'D', type: 'recliner' },
    { label: 'E', type: 'recliner' },
  ];

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId); // Deselect
      }
      if (prev.length >= 10) {
        toast.warning("You can only book up to 10 seats at once!");
        return prev;
      }
      return [...prev, seatId].sort();
    });
  };

  const calculateTotal = () => {
    let total = 0;
    selectedSeats.forEach(seat => {
      const row = seat.charAt(0);
      if (row === 'D' || row === 'E') {
        total += PRICES.RECLINER;
      } else {
        total += PRICES.STANDARD;
      }
    });
    return total;
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat!");
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Successfully booked ${selectedSeats.length} seats for ${movie.title}!`);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }, 1500);
  };

  return (
    <div className={seatSelectorStyles.pageContainer}>
      <style>{seatSelectorStyles.customCSS}</style>
      <ToastContainer theme="dark" position="top-center" autoClose={2000} />
      
      <div className={seatSelectorStyles.mainContainer}>
        {/* Header */}
        <div className={seatSelectorStyles.headerContainer}>
          <button onClick={() => navigate(-1)} className={seatSelectorStyles.backButton}>
            <ArrowLeft className={seatSelectorStyles.backButtonIcon} />
            <span>Back</span>
          </button>
          
          <div className={seatSelectorStyles.titleContainer}>
            <h1 className={seatSelectorStyles.movieTitle}>{movie.title}</h1>
            <div className={seatSelectorStyles.showtimeText}>
              <span className="bg-red-900/30 text-red-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">{movie.category}</span>
              <span>•</span>
              <span>{movie.duration}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Monitor size={14}/> Screen 1</span>
            </div>
          </div>
          
          {/* Spacer for flex balance */}
          <div className="w-24"></div>
        </div>

        <div className={seatSelectorStyles.mainContent}>
          
          {/* Date & Time Selectors */}
          <div className="flex flex-col md:flex-row gap-6 mb-10 pb-6 border-b border-gray-800">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2"><Calendar size={16}/> Select Date</h3>
              <div className="flex gap-3">
                {DATES.map(date => (
                  <button 
                    key={date.id}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-1 py-3 rounded-xl transition-all ${selectedDate.id === date.id ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    <div className="text-xs text-gray-400">{date.label}</div>
                    <div className="font-bold">{date.date}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2"><Clock size={16}/> Select Time</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {TIMES.map(time => (
                  <button 
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl transition-all font-semibold ${selectedTime === time ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Screen area */}
          <div className={seatSelectorStyles.screenContainer}>
            <div className={seatSelectorStyles.screen}>
              <div className={seatSelectorStyles.screenText}>SCREEN THIS WAY</div>
              <div className={seatSelectorStyles.screenSubtext}>Eyes up here</div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] opacity-70"></div>
            </div>
          </div>

          {/* Seat Grid */}
          <div className={seatSelectorStyles.seatGridContainer}>
            {rows.map(row => (
              <div key={row.label} className={seatSelectorStyles.rowContainer}>
                {row.label === 'A' && <div className={seatSelectorStyles.rowHeader}><div className={seatSelectorStyles.rowType}>STANDARD - ₹{PRICES.STANDARD}</div></div>}
                {row.label === 'D' && <div className={seatSelectorStyles.rowHeader}><div className={seatSelectorStyles.rowType}>RECLINER - ₹{PRICES.RECLINER}</div></div>}
                
                <div className="flex items-center w-full justify-center">
                  <div className={seatSelectorStyles.rowLabel}>{row.label}</div>
                  <div className={seatSelectorStyles.seatGrid}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                      const seatId = `${row.label}${num}`;
                      const isBooked = bookedSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);
                      
                      let seatClass = '';
                      if (isBooked) {
                        seatClass = seatSelectorStyles.seatButtonBooked;
                      } else if (isSelected) {
                        seatClass = row.type === 'standard' 
                          ? seatSelectorStyles.seatButtonSelectedStandard 
                          : seatSelectorStyles.seatButtonSelectedRecliner;
                      } else {
                        seatClass = row.type === 'standard' 
                          ? seatSelectorStyles.seatButtonAvailableStandard 
                          : seatSelectorStyles.seatButtonAvailableRecliner;
                      }
                      
                      return (
                        <button
                          key={seatId}
                          disabled={isBooked}
                          onClick={() => handleSeatClick(seatId)}
                          className={`${seatSelectorStyles.seatButton} ${seatClass}`}
                        >
                          <div className={seatSelectorStyles.seatContent}>
                            <span className={seatSelectorStyles.seatNumber}>{num}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className={seatSelectorStyles.rowLabel}>{row.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Legends */}
          <div className="flex justify-center gap-6 mt-12 mb-4 text-sm font-semibold">
            <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-md bg-red-600"></div> Selected</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-md bg-gray-800 border border-gray-600"></div> Standard</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-md bg-green-900 border border-green-700"></div> Recliner</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-md bg-gray-800 opacity-40"></div> Booked</div>
          </div>
          
        </div>

        {/* Summary Section */}
        <div className={seatSelectorStyles.summaryGrid}>
          <div className={seatSelectorStyles.summaryContainer}>
            <div className={seatSelectorStyles.summaryTitle}>
              <Ticket size={20} className="text-red-400"/> Booking Summary
            </div>
            
            {selectedSeats.length > 0 ? (
              <div className="space-y-4">
                <div className={seatSelectorStyles.summaryItem}>
                  <div>
                    <div className={seatSelectorStyles.selectedSeatsLabel}>Seats Selected ({selectedSeats.length})</div>
                    <div className={seatSelectorStyles.selectedSeatsList}>
                      {selectedSeats.map(seat => (
                        <span key={seat} className={seatSelectorStyles.selectedSeatBadge}>{seat}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={seatSelectorStyles.totalContainer}>
                  <div className="flex justify-between items-center px-2">
                    <span className={seatSelectorStyles.totalLabel}>Total Amount</span>
                    <span className={seatSelectorStyles.totalValue}>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={seatSelectorStyles.emptyState}>
                <Monitor className="mx-auto mb-3 opacity-20" size={48}/>
                <h4 className={seatSelectorStyles.emptyStateTitle}>No seats selected</h4>
                <p className={seatSelectorStyles.emptyStateSubtitle}>Please select your preferred seats from the layout above.</p>
              </div>
            )}
            
            <div className={seatSelectorStyles.actionButtons}>
              <button 
                onClick={() => setSelectedSeats([])}
                disabled={selectedSeats.length === 0}
                className={seatSelectorStyles.clearButton}
              >
                Clear Selection
              </button>
              <button 
                onClick={handleConfirmBooking}
                disabled={selectedSeats.length === 0 || isProcessing}
                className={seatSelectorStyles.confirmButton}
              >
                {isProcessing ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
          
          <div className={seatSelectorStyles.pricingContainer}>
            <div className={seatSelectorStyles.pricingTitle}>
              <Info size={20} className="text-red-400"/> Ticket Pricing
            </div>
            <div className="space-y-3">
              <div className={seatSelectorStyles.pricingItem}>
                <div className={seatSelectorStyles.pricingRow}>
                  <span className={seatSelectorStyles.pricingLabel}>Standard</span>
                  <span className={seatSelectorStyles.pricingValueStandard}>₹{PRICES.STANDARD}</span>
                </div>
                <div className={seatSelectorStyles.pricingNote}>Rows A to C</div>
              </div>
              <div className={seatSelectorStyles.pricingItem}>
                <div className={seatSelectorStyles.pricingRow}>
                  <span className={seatSelectorStyles.pricingLabel}>Recliner</span>
                  <span className={seatSelectorStyles.pricingValueRecliner}>₹{PRICES.RECLINER}</span>
                </div>
                <div className={seatSelectorStyles.pricingNote}>Rows D to E</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default BookingPage;
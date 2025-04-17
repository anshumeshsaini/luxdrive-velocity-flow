import React, { useState } from 'react';
import { Calendar, Users, Car, Phone, CheckCircle, X, Loader2 } from 'lucide-react';
import car from '../Assests/car.png'

const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    pickupDate: '',
    returnDate: '',
    guests: ''
  });
  
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    carModel: false,
    pickupDate: false,
    returnDate: false,
    guests: false
  });
  
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const carOptions = [
    'Select a car',
    'Lamborghini Aventador',
    'Porsche 911 GT3',
    'Ferrari F8 Tributo',
    'Mercedes-AMG GT',
    'Aston Martin DBS',
    'McLaren 720S'
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set all fields as touched for validation
    const allTouched = Object.keys(touched).reduce((acc, key) => {
      return { ...acc, [key]: true };
    }, touched);
    setTouched(allTouched);
    
    // Validate form
    if (
      !formData.name || 
      !formData.phone || 
      !formData.carModel || 
      formData.carModel === 'Select a car' ||
      !formData.pickupDate || 
      !formData.returnDate
    ) {
      return;
    }
    
    // Submit form
    setFormState('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormState('idle');
        setFormData({
          name: '',
          phone: '',
          carModel: '',
          pickupDate: '',
          returnDate: '',
          guests: ''
        });
        setTouched({
          name: false,
          phone: false,
          carModel: false,
          pickupDate: false,
          returnDate: false,
          guests: false
        });
      }, 3000);
    }, 1500);
  };
  
  const getFieldClasses = (fieldName: keyof typeof touched) => {
    const baseClasses = "w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300";
    
    if (!touched[fieldName]) {
      return `${baseClasses} border-white/10 focus:ring-luxdrive-blue/50`;
    }
    
    const value = formData[fieldName as keyof typeof formData];
    const isValid = value && (fieldName !== 'carModel' || value !== 'Select a car');
    
    return isValid
      ? `${baseClasses} border-green-500/50 focus:ring-green-500/30`
      : `${baseClasses} border-red-500/50 focus:ring-red-500/30`;
  };
  
  return (
    <div className="py-20 bg-white" id="booking">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto glass-card rounded-2xl overflow-hidden bg-white">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1583870908951-71149f42bcf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lcmNlZGVzfGVufDB8fDB8fHww"
                alt="Luxury car keys" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-transparent md:bg-gradient-to-b"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Ready for the <span className="text-glow">Ultimate</span> Drive?</h3>
                <p className="text-blue-600/80 hidden md:block">Book your dream car today and experience luxury on wheels.</p>
              </div>
            </div>
            
            {/* Right side - Form */}
            <div className="md:w-1/2 p-8 md:p-12 bg-white">
              <h3 className="text-2xl font-bold text-blue-600 mb-6 md:hidden">Reserve Your Luxury Experience</h3>
              
              {formState === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-blue-600 mb-2">Booking Confirmed!</h4>
                  <p className="text-blue-600/70 mb-6">Your reservation has been successfully submitted. We'll contact you shortly.</p>
                  <div className="animate-pulse text-sm text-blue-600/50">Redirecting...</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-blue-600 mb-2 text-sm">Your Name</label>
                    <div className="relative">
                      <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${getFieldClasses('name')} text-blue-600 placeholder-blue-600 focus:outline-none bg-white`} 
                          placeholder="John Doe"
                          disabled={formState === 'submitting'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-blue-600 mb-2 text-sm">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${getFieldClasses('phone')} text-blue-600 placeholder-blue-600 focus:outline-none bg-white`}
                        placeholder="+1 (555) 000-0000"
                        disabled={formState === 'submitting'}
                      />
                      <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/20 h-5 w-5" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-blue-600 mb-2 text-sm">Car Model</label>
                    <div className="relative">
                      <select
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${getFieldClasses('carModel')} text-blue-600 placeholder-blue-600 focus:outline-none bg-white`}
                        disabled={formState === 'submitting'}
                      >
                        {carOptions.map(car => (
                          <option key={car} value={car}>{car}</option>
                        ))}
                      </select>
                      <Car className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/20 h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-600 mb-2 text-sm">Pickup Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${getFieldClasses('pickupDate')} text-blue-600 placeholder-blue-600 focus:outline-none bg-white`}
                          min={new Date().toISOString().split('T')[0]}
                          disabled={formState === 'submitting'}
                        />
                        <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/20 h-5 w-5" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-blue-600 mb-2 text-sm">Return Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${getFieldClasses('returnDate')} text-blue-600 placeholder-blue-600 focus:outline-none bg-white`}
                          min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                          disabled={formState === 'submitting'}
                        />
                        <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/20 h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-blue-600 mb-2 text-sm">Number of Guests (Optional)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${getFieldClasses('guests')} text-blue-600 placeholder-blue-600 focus:outline-none bg-white`}
                        placeholder="2"
                        min="1"
                        max="7"
                        disabled={formState === 'submitting'}
                      />
                      <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/20 h-5 w-5" />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-luxury py-4 flex items-center justify-center"
                    disabled={formState === 'submitting'}
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Processing...
                      </>
                    ) : (
                      'Book Now'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;

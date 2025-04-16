
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon, CreditCard, CheckCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface BookingFormProps {
  carId: number;
  carName: string;
  price: number;
  onClose: () => void;
}

type FormStep = 'personal' | 'payment' | 'confirmation';

const BookingForm: React.FC<BookingFormProps> = ({ carId, carName, price, onClose }) => {
  const [step, setStep] = useState<FormStep>('personal');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    nameOnCard: '',
  });
  const { toast } = useToast();

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 1;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    const days = calculateTotalDays();
    return price * days;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVC || !formData.nameOnCard) {
      toast({
        title: "Missing payment information",
        description: "Please fill in all payment fields",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate payment processing
    toast({
      title: "Processing payment",
      description: "Please wait while we process your payment"
    });
    
    setTimeout(() => {
      setStep('confirmation');
      toast({
        title: "Booking confirmed!",
        description: "Your booking has been successfully processed",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <div className="mt-4">
      {step === 'personal' && (
        <form onSubmit={handlePersonalSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleInputChange} 
              placeholder="John Doe" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              placeholder="john@example.com" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              placeholder="+1 (555) 123-4567" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleInputChange} 
              placeholder="123 Main St, City, Country" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => date < (startDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between mb-2">
              <span>Days:</span>
              <span>{calculateTotalDays()}</span>
            </div>
            <div className="flex justify-between font-bold text-luxdrive-blue">
              <span>Total:</span>
              <span>${calculateTotal().toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-luxdrive-blue hover:bg-luxdrive-blue/90">Continue to Payment</Button>
          </div>
        </form>
      )}
      
      {step === 'payment' && (
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            <div className="text-xl font-bold text-luxdrive-blue">${calculateTotal().toLocaleString()}</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input 
              id="nameOnCard" 
              name="nameOnCard" 
              value={formData.nameOnCard} 
              onChange={handleInputChange} 
              placeholder="John Doe" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input 
                id="cardNumber" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleInputChange} 
                placeholder="4242 4242 4242 4242" 
                maxLength={19} 
                required 
              />
              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">Expiry Date</Label>
              <Input 
                id="cardExpiry" 
                name="cardExpiry" 
                value={formData.cardExpiry} 
                onChange={handleInputChange} 
                placeholder="MM/YY" 
                maxLength={5} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardCVC">CVC</Label>
              <Input 
                id="cardCVC" 
                name="cardCVC" 
                value={formData.cardCVC} 
                onChange={handleInputChange} 
                placeholder="123" 
                maxLength={3} 
                required 
              />
            </div>
          </div>
          
          <div className="pt-4 text-sm text-muted-foreground">
            <p>This is a demo. No actual payment will be processed.</p>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setStep('personal')}>Back</Button>
            <Button type="submit" className="bg-luxdrive-blue hover:bg-luxdrive-blue/90">Complete Booking</Button>
          </div>
        </form>
      )}
      
      {step === 'confirmation' && (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 mb-4 text-green-500">
            <CheckCircle className="w-16 h-16" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
          <p className="text-muted-foreground mb-6">
            Your {carName} is booked from {startDate && format(startDate, 'PPP')} to {endDate && format(endDate, 'PPP')}
          </p>
          <p className="font-semibold mb-4">Booking Reference: LUX-{carId}-{Math.floor(Math.random() * 10000)}</p>
          <p className="text-sm text-muted-foreground mb-6">
            A confirmation email has been sent to {formData.email}
          </p>
          <Button onClick={onClose} className="bg-luxdrive-blue hover:bg-luxdrive-blue/90">
            Done
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;

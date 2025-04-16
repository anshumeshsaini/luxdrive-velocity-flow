
import React, { useRef, useState, useEffect } from 'react';
import { Star, ChevronRight, Users, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from './BookingForm';

interface CarCardProps {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  transmission: string;
  seats: number;
  engineSound?: string;
  description?: string;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  name,
  category,
  image,
  price,
  rating,
  transmission,
  seats,
  engineSound,
  description
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
  });
  const [isHovered, setIsHovered] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (engineSound) {
      audioRef.current = new Audio(engineSound);
      audioRef.current.volume = 0.3;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [engineSound]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 15;
    const rotateX = (centerY - y) / 15;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    });
    
    if (engineSound && audioRef.current && !audioPlaying && isHovered) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      setAudioPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
    setIsHovered(false);
    
    if (audioRef.current && audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  };

  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);
  const openBooking = () => {
    setIsDetailsOpen(false);
    setIsBookingOpen(true);
  };
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <>
      <div 
        ref={cardRef}
        className="glass-card rounded-xl overflow-hidden transition-all duration-300"
        style={style}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-56 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-luxdrive-blue/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-foreground border border-luxdrive-blue/20">
            {category}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent h-20"></div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-luxdrive-gold text-luxdrive-gold" />
              <span className="ml-1 text-foreground">{rating}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-muted-foreground text-sm">{transmission} • {seats} seats</div>
            <div className="text-xl font-bold text-luxdrive-blue">${price}<span className="text-xs text-muted-foreground">/day</span></div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={openDetails}
              className="text-luxdrive-blue hover:text-luxdrive-blue/80 text-sm font-medium flex items-center"
            >
              View Details <ChevronRight className="w-4 h-4 ml-1" />
            </button>
            <button onClick={openDetails} className="btn-luxury text-sm py-1.5 px-4">Rent Now</button>
          </div>
        </div>
      </div>

      {/* Car Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={closeDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{category} Car</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="rounded-lg overflow-hidden h-64">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-luxdrive-blue" />
                <span>{transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-luxdrive-blue" />
                <span>{seats} Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-luxdrive-gold text-luxdrive-gold" />
                <span>{rating} Rating</span>
              </div>
              <div className="font-bold text-luxdrive-blue">
                ${price}<span className="text-xs text-muted-foreground">/day</span>
              </div>
            </div>
            
            <p className="text-foreground">{description || 'Experience luxury and performance with this exceptional vehicle.'}</p>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={closeDetails}>Close</Button>
              <Button className="bg-luxdrive-blue hover:bg-luxdrive-blue/90" onClick={openBooking}>Book Now</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={closeBooking}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Book {name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">Fill out the form below to book this vehicle</DialogDescription>
          </DialogHeader>
          <BookingForm carId={id} carName={name} price={price} onClose={closeBooking} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarCard;

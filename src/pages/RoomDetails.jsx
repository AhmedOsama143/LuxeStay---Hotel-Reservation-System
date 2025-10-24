import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addReservation } from "@/store/slices/reservationsSlice";
import { updateRoomAvailability } from "@/store/slices/roomsSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Users, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const room = rooms.find((r) => r.id === id);
  const [checkIn, setCheckIn] = useState(undefined);
  const [checkOut, setCheckOut] = useState(undefined);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (!room) {
      navigate("/");
    }
  }, [room, navigate]);

  if (!room) return null;

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    return nights > 0 ? nights * room.pricePerNight : 0;
  };

  const totalPrice = calculateTotalPrice();
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (checkIn >= checkOut) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    setIsBooking(true);

    setTimeout(() => {
      dispatch(
        addReservation({
          roomId: room.id,
          roomType: room.roomType,
          userId: user.id,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          totalPrice,
        })
      );

      dispatch(
        updateRoomAvailability({ roomId: room.id, availability: false })
      );

      toast.success("Booking confirmed!", {
        description: `Your reservation for ${room.roomType} has been confirmed.`,
      });

      setIsBooking(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Rooms
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 overflow-hidden rounded-2xl shadow-md">
                <img
                  src={room.images[0]}
                  alt={`${room.roomType} main`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {room.images.slice(1, 5).map((img, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={img}
                      alt={`${room.roomType} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    {room.roomType}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      <Users className="h-3 w-3 mr-1" />
                      Up to {room.capacity} guests
                    </Badge>
                    {room.availability ? (
                      <Badge
                        variant="success"
                        className="border-green-500 text-green-700 "
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Unavailable</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-accent">
                    ${room.pricePerNight}
                  </p>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {room.description}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
                <CardDescription>
                  {room.availability
                    ? "Select your check-in and check-out dates to book your stay."
                    : "This room is currently unavailable."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isAuthenticated && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Please login to book this room
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date() || !room.availability}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) =>
                      !checkIn || date <= checkIn || !room.availability
                    }
                    className="rounded-md border"
                  />
                </div>

                {checkIn && checkOut && nights > 0 && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Check-in:</span>
                      <span className="font-medium">
                        {format(checkIn, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Check-out:</span>
                      <span className="font-medium">
                        {format(checkOut, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Nights:</span>
                      <span className="font-medium">{nights}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-accent">${totalPrice}</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBooking}
                  disabled={
                    !isAuthenticated ||
                    !checkIn ||
                    !checkOut ||
                    !room.availability ||
                    isBooking
                  }
                >
                  {isBooking ? "Processing..." : "Book Now"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

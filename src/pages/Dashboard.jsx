import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cancelReservation } from "@/store/slices/reservationsSlice";
import { updateRoomAvailability } from "@/store/slices/roomsSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, DollarSign, User, Hotel } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { reservations } = useSelector((state) => state.reservations);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const userReservations = reservations.filter(
    (res) => res.userId === user?.id
  );

  const activeReservations = userReservations.filter(
    (res) => res.status === "confirmed"
  );

  const totalSpent = userReservations
    .filter((res) => res.status === "confirmed")
    .reduce((sum, res) => sum + res.totalPrice, 0);

  const handleCancelReservation = (reservationId, roomId) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      dispatch(cancelReservation(reservationId));
      dispatch(updateRoomAvailability({ roomId, availability: true }));
      toast.success("Reservation cancelled successfully");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your reservations and account
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Reservations
              </CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activeReservations.length}
              </div>
              <p className="text-xs text-muted-foreground">Current bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent}</div>
              <p className="text-xs text-muted-foreground">Lifetime bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">{user?.email}</div>
              <p className="text-xs text-muted-foreground">
                Member since today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* reservations list */}
        <Card>
          <CardHeader>
            <CardTitle>Your Reservations</CardTitle>
            <CardDescription>
              View and manage your hotel bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userReservations.length === 0 ? (
              <div className="text-center py-12">
                <Hotel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No reservations yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start exploring our rooms and book your perfect stay
                </p>
                <Button
                  onClick={() =>
                    navigate("/", { state: { scrollTo: "rooms" } })
                  }
                >
                  Browse Rooms
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userReservations.map((reservation) => (
                  <Card key={reservation.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-lg">
                                {reservation.roomType}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Reservation ID: {reservation.id}
                              </p>
                            </div>
                            <Badge
                              variant={
                                reservation.status === "confirmed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {reservation.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                Check-in:{" "}
                                {format(
                                  new Date(reservation.checkIn),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                Check-out:{" "}
                                {format(
                                  new Date(reservation.checkOut),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-accent">
                              ${reservation.totalPrice}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          {reservation.status === "confirmed" && (
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleCancelReservation(
                                  reservation.id,
                                  reservation.roomId
                                )
                              }
                            >
                              Cancel Reservation
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

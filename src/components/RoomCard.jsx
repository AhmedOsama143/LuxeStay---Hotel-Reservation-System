import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Wifi, Tv } from "lucide-react";

const RoomCard = ({ room }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={room.images[0]}
          alt={room.roomType}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <Badge
          variant={room.availability ? "success" : "destructive"}
          className={`absolute top-3 right-3 ${room.availability ? "text-white bg-green-700 border-none" : ""}`}
        >
          {room.availability ? "Available" : "Unavailable"}
        </Badge>
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-foreground">{room.roomType}</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">
              ${room.pricePerNight}
            </p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {room.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            {room.capacity} guests
          </Badge>
          {room.amenities.includes("Free WiFi") && (
            <Badge variant="secondary" className="text-xs">
              <Wifi className="h-3 w-3 mr-1" />
              WiFi
            </Badge>
          )}
          {room.amenities.includes("Smart TV") && (
            <Badge variant="secondary" className="text-xs">
              <Tv className="h-3 w-3 mr-1" />
              TV
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button
          asChild
          className="w-full"
          variant={room.availability ? "default" : "secondary"}
          disabled={!room.availability}
        >
          <Link to={`/room/${room.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;

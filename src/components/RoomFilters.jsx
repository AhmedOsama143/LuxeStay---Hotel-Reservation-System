import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/store/slices/roomsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const RoomFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.rooms);

  const handlePriceChange = (value) => {
    dispatch(setFilters({ priceRange: [value[0], value[1]] }));
  };

  const handleRoomTypeChange = (value) => {
    dispatch(setFilters({ roomType: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Rooms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="roomType">Room Type</Label>
          <Select value={filters.roomType} onValueChange={handleRoomTypeChange}>
            <SelectTrigger id="roomType">
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Single Room">Single Room</SelectItem>
              <SelectItem value="Double Room">Double Room</SelectItem>
              <SelectItem value="Suite">Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Price Range (per night)</Label>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <Slider
            min={0}
            max={1000}
            step={50}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomFilters;

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/slices/roomsSlice";
import RoomCard from "@/components/RoomCard";
import RoomFilters from "@/components/RoomFilters";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hotel.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { filteredRooms, currentPage, roomsPerPage } = useSelector(
    (state) => state.rooms
  );

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const location = useLocation();

  const scrollToRooms = () => {
    const rooms = document.getElementById("rooms");
    rooms?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.scrollTo === "rooms") {
      scrollToRooms();
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury hotel lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Welcome to LuxeStay
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-8">
            Experience unparalleled luxury and comfort in our exquisite
            accommodations. Your perfect stay awaits.
          </p>
          <Button variant="hero" size="lg" onClick={scrollToRooms}>
            Explore Rooms
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <RoomFilters />
            </div>
          </aside>

          <div className="lg:col-span-3" id="rooms">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-foreground">All Rooms</h2>
              <p className="text-muted-foreground">
                {filteredRooms.length}{" "}
                {filteredRooms.length === 1 ? "room" : "rooms"} found
              </p>
            </div>

            {currentRooms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No rooms match your filters. Try adjusting your criteria.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => handlePageChange(page)}
                          className="min-w-[2.5rem]"
                        >
                          {page}
                        </Button>
                      )
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

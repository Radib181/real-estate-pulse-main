import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, Home, MoreHorizontal, Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Event {
  id: number;
  title: string;
  type: "viewing" | "meeting" | "call" | "open_house";
  property?: string;
  client?: string;
  agent: string;
  date: string;
  time: string;
  duration: string;
  location?: string;
  notes?: string;
}

const events: Event[] = [
  { id: 1, title: "Property Viewing", type: "viewing", property: "Sunset Villa", client: "Robert Brown", agent: "Sarah Johnson", date: "2024-01-29", time: "10:00 AM", duration: "1 hour", location: "Beverly Hills, CA", notes: "First viewing, client interested in pool area" },
  { id: 2, title: "Client Meeting", type: "meeting", client: "Amanda White", agent: "Michael Chen", date: "2024-01-29", time: "2:00 PM", duration: "45 min", location: "Office", notes: "Discuss financing options" },
  { id: 3, title: "Open House", type: "open_house", property: "Ocean View Apt", agent: "Emily Davis", date: "2024-01-30", time: "11:00 AM", duration: "3 hours", location: "Malibu, CA", notes: "Public open house event" },
  { id: 4, title: "Follow-up Call", type: "call", client: "David Miller", agent: "James Wilson", date: "2024-01-30", time: "3:30 PM", duration: "30 min", notes: "Discuss offer terms" },
  { id: 5, title: "Property Viewing", type: "viewing", property: "Garden House", client: "Jennifer Lee", agent: "Sarah Johnson", date: "2024-01-31", time: "9:00 AM", duration: "1 hour", location: "Pasadena, CA" },
  { id: 6, title: "Team Meeting", type: "meeting", agent: "All Agents", date: "2024-01-31", time: "4:00 PM", duration: "1 hour", location: "Conference Room", notes: "Weekly sales review" },
  { id: 7, title: "Virtual Tour", type: "viewing", property: "Mountain View Home", client: "Chris Jones", agent: "Lisa Anderson", date: "2024-02-01", time: "11:00 AM", duration: "45 min", notes: "Video call tour" },
];

const typeConfig = {
  viewing: { label: "Viewing", className: "bg-primary/20 text-primary border-primary/30", icon: Home },
  meeting: { label: "Meeting", className: "bg-accent/20 text-accent border-accent/30", icon: User },
  call: { label: "Call", className: "bg-success/20 text-success border-success/30", icon: Phone },
  open_house: { label: "Open House", className: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: Home },
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 29)); // Jan 29, 2024
  const [selectedDate, setSelectedDate] = useState<string>("2024-01-29");
  const [view, setView] = useState<"week" | "month">("week");

  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(event => event.date === dateStr);
  };

  const selectedEvents = getEventsForDate(selectedDate);
  const weekDates = getWeekDates();

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
          <p className="text-sm text-muted-foreground">Manage your appointments and viewings</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow gap-2">
          <Plus className="w-4 h-4" />
          New Event
        </Button>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateWeek(-1)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h2 className="text-lg font-semibold text-foreground">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={() => navigateWeek(1)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="flex rounded-xl border border-border overflow-hidden">
          <button
            onClick={() => setView("week")}
            className={cn("px-4 py-2 text-sm font-medium transition-colors", view === "week" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground")}
          >
            Week
          </button>
          <button
            onClick={() => setView("month")}
            className={cn("px-4 py-2 text-sm font-medium transition-colors", view === "month" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground")}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Week Calendar */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          {/* Week Header */}
          <div className="grid grid-cols-7 border-b border-border">
            {weekDates.map((date, index) => {
              const dateStr = formatDate(date);
              const isSelected = dateStr === selectedDate;
              const hasEvents = getEventsForDate(dateStr).length > 0;
              const isToday = dateStr === "2024-01-29"; // Mock today
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    "p-4 text-center transition-all hover:bg-secondary/50",
                    isSelected && "bg-primary/10 border-b-2 border-primary"
                  )}
                >
                  <p className="text-xs text-muted-foreground">{daysOfWeek[date.getDay()]}</p>
                  <p className={cn(
                    "text-lg font-semibold mt-1",
                    isSelected ? "text-primary" : isToday ? "text-accent" : "text-foreground"
                  )}>
                    {date.getDate()}
                  </p>
                  {hasEvents && (
                    <div className="flex justify-center gap-1 mt-1">
                      {getEventsForDate(dateStr).slice(0, 3).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Events Timeline */}
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => {
                const config = typeConfig[event.type];
                const Icon = config.icon;
                return (
                  <div
                    key={event.id}
                    className="flex gap-4 p-4 rounded-xl border border-border hover:bg-secondary/30 transition-all group cursor-pointer"
                  >
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", config.className)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{event.title}</h4>
                          {event.property && (
                            <p className="text-sm text-primary">{event.property}</p>
                          )}
                        </div>
                        <span className={cn("px-2 py-0.5 text-xs font-medium rounded-full border", config.className)}>
                          {config.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{event.time} • {event.duration}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      {event.client && (
                        <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                          <User className="w-3.5 h-3.5" />
                          <span>{event.client}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {event.type === "call" && (
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <Phone className="w-4 h-4 text-success" />
                        </button>
                      )}
                      {event.type === "viewing" && event.notes?.includes("Video") && (
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <Video className="w-4 h-4 text-primary" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">No Events</h3>
                <p className="text-sm text-muted-foreground mt-1">No events scheduled for this day</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {events.slice(0, 5).map((event) => {
              const config = typeConfig[event.type];
              const Icon = config.icon;
              return (
                <div key={event.id} className="flex items-start gap-3 group cursor-pointer">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", config.className)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                    {event.property && (
                      <p className="text-xs text-primary truncate">{event.property}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-4">This Week</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
                <p className="text-2xl font-bold text-primary">{events.filter(e => e.type === "viewing").length}</p>
                <p className="text-xs text-muted-foreground">Viewings</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10 border border-accent/30">
                <p className="text-2xl font-bold text-accent">{events.filter(e => e.type === "meeting").length}</p>
                <p className="text-xs text-muted-foreground">Meetings</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10 border border-success/30">
                <p className="text-2xl font-bold text-success">{events.filter(e => e.type === "call").length}</p>
                <p className="text-xs text-muted-foreground">Calls</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <p className="text-2xl font-bold text-purple-400">{events.filter(e => e.type === "open_house").length}</p>
                <p className="text-xs text-muted-foreground">Open Houses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

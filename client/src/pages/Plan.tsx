import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";
import { MapPin, Clock, Users, ChevronRight } from "lucide-react";

const savedPlans = [
  {
    id: 1,
    title: "Rooftop chill night",
    time: "Thứ bảy, 18:30",
    stops: "3 điểm đến",
    cost: "520k/người",
    group: "Bạn bè",
    mood: "Chill",
    status: "Chờ vote",
    statusColor: "bg-yellow",
  },
  {
    id: 2,
    title: "Food tour Quận 1",
    time: "Chủ nhật, 17:00",
    stops: "4 điểm đến",
    cost: "380k/người",
    group: "Gia đình",
    mood: "Ăn ngon",
    status: "Đã chốt",
    statusColor: "bg-sage",
  },
  {
    id: 3,
    title: "Picnic công viên",
    time: "Thứ năm, 15:00",
    stops: "2 điểm đến",
    cost: "260k/người",
    group: "Người yêu",
    mood: "Nhẹ nhàng",
    status: "Nháp",
    statusColor: "bg-muted",
  },
];

export default function Plan() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f3eee8] flex flex-col max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Status bar */}
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-sm font-medium text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[26px] font-bold text-ink">Plan đã lưu</h1>
          <button
            onClick={() => setLocation("/create-plan")}
            className="px-4 py-2 rounded-full bg-sage text-white text-[13px] font-semibold hover:bg-sage/90 transition-colors"
          >
            + Tạo mới
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 bg-white rounded-[16px] p-3 border border-border/30 text-center">
            <p className="text-[20px] font-bold text-sage">{savedPlans.length}</p>
            <p className="text-[12px] text-muted-foreground">Plan sẵn sàng</p>
          </div>
          <div className="flex-1 bg-white rounded-[16px] p-3 border border-border/30 text-center">
            <p className="text-[20px] font-bold text-coral">1</p>
            <p className="text-[12px] text-muted-foreground">Đang chờ vote</p>
          </div>
          <div className="flex-1 bg-white rounded-[16px] p-3 border border-border/30 text-center">
            <p className="text-[20px] font-bold text-sage">1</p>
            <p className="text-[12px] text-muted-foreground">Đã chốt</p>
          </div>
        </div>

        {/* Plan List */}
        <div className="space-y-3">
          {savedPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setLocation(plan.status === "Chờ vote" ? "/vote" : "/plan-detail")}
              className="bg-white rounded-[16px] p-4 border border-border/30 cursor-pointer hover:shadow-lg transition-shadow"
              data-testid={`plan-card-${plan.id}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold text-white px-2 py-0.5 rounded-full ${plan.statusColor}`}>
                      {plan.status}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{plan.group}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-ink">{plan.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{plan.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{plan.stops}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{plan.cost}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-[11px] font-medium">
                  {plan.mood}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

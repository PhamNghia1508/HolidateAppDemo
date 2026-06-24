import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";

const members = [
  { name: "Nghĩa", status: "Đồng ý", color: "bg-sage" },
  { name: "Linh", status: "Đồng ý", color: "bg-sage" },
  { name: "Minh", status: "Có thể", color: "bg-yellow" },
  { name: "An", status: "Đợi", color: "bg-muted" },
];

export default function Vote() {
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

        {/* Title */}
        <h1 className="text-[26px] font-bold text-ink mb-2">Cả nhóm vote plan</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          Khỏi chat lòng vòng — chốt nhanh trong một shared space.
        </p>

        {/* Vote Progress */}
        <div className="bg-sage-light/30 rounded-[16px] p-4 mb-5">
          <p className="text-[16px] font-bold text-sage mb-1">3/4 người đã vote</p>
          <p className="text-[13px] text-muted-foreground mb-3">Còn An chưa phản hồi</p>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <div className="w-[75%] h-full bg-sage rounded-full" />
          </div>
        </div>

        {/* Members */}
        <div className="bg-white rounded-[20px] p-5 border border-border/30 mb-5">
          <div className="grid grid-cols-4 gap-3">
            {members.map((m) => (
              <div key={m.name} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full ${m.color} flex items-center justify-center mb-1`}>
                  <span className="text-[14px] font-bold text-white">{m.name[0]}</span>
                </div>
                <p className="text-[12px] font-semibold text-ink">{m.name}</p>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5 ${
                  m.status === "Đồng ý" ? "bg-sage/10 text-sage" :
                  m.status === "Có thể" ? "bg-yellow/20 text-yellow" :
                  "bg-muted/30 text-muted-foreground"
                }`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Your choice */}
        <div className="bg-white rounded-[20px] p-5 border border-border/30 mb-5">
          <h3 className="text-[16px] font-bold text-ink mb-3">Bạn chọn gì?</h3>
          <div className="flex gap-2 mb-3">
            <span className="px-4 py-2 rounded-full bg-sage text-white text-[13px] font-medium">Đồng ý</span>
            <span className="px-4 py-2 rounded-full bg-white text-sage text-[13px] font-medium border border-sage/30">Có thể</span>
            <span className="px-4 py-2 rounded-full bg-white text-sage text-[13px] font-medium border border-sage/30">Đổi giờ</span>
          </div>
          <p className="text-[12px] text-muted-foreground">Mỗi lựa chọn đều cập nhật cho cả nhóm.</p>
        </div>

        {/* CTA */}
        <button
          onClick={() => setLocation("/confirmed")}
          className="w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors"
          data-testid="button-confirm"
        >
          Chốt plan & gửi nhắc hẹn
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

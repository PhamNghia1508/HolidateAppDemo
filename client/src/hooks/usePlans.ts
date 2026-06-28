import { useQuery } from "@tanstack/react-query";

const BLUE = "#C8371E";
const WARN = "#C8860A";
const GREEN = "#3D6B4F";

const savedPlans = [
  {
    id: 1,
    title: "Rooftop chill night",
    time: "Thứ bảy, 18:30",
    stops: ["Vinhomes", "Skyline Coffee", "Bar 86"],
    cost: "520k/người",
    group: "Bạn bè",
    groupColor: BLUE,
    mood: "Chill 🌙",
    status: "voting" as const,
    urgencyText: "Linh và Minh đã đồng ý • còn An",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=240&h=120&fit=crop",
    members: [
      { i: "N", color: BLUE },
      { i: "L", color: "#8B5CF6" },
      { i: "M", color: WARN },
      { i: "A", color: "#9C8470" },
    ],
    votedCount: 2,
    totalCount: 4,
  },
  {
    id: 2,
    title: "Food tour Quận 1",
    time: "Chủ nhật, 17:00",
    stops: ["Bến Thành", "Nhà Hàng Ngon", "Chả Cá", "Cà Phê Trứng"],
    cost: "380k/người",
    group: "Gia đình",
    groupColor: WARN,
    mood: "Ăn ngon 🍜",
    status: "locked" as const,
    urgencyText: null,
    img: null,
    members: [
      { i: "B", color: WARN },
      { i: "M", color: "#F97316" },
      { i: "D", color: GREEN },
    ],
    votedCount: 3,
    totalCount: 3,
  },
  {
    id: 3,
    title: "Picnic công viên",
    time: "Thứ năm, 15:00",
    stops: ["Công viên Gia Định", "Cafe sân vườn"],
    cost: "260k/người",
    group: "Người yêu",
    groupColor: "#EC4899",
    mood: "Nhẹ nhàng 🌸",
    status: "draft" as const,
    urgencyText: null,
    img: null,
    members: [
      { i: "N", color: BLUE },
      { i: "T", color: "#EC4899" },
    ],
    votedCount: 0,
    totalCount: 2,
  },
  {
    id: 4,
    title: "Team Building 2026",
    time: "Thứ bảy, 08:00",
    stops: ["Hội trường công ty", "Khu resort", "BBQ ngoài trời"],
    cost: "800k/người",
    group: "Công ty",
    groupColor: "#10B981",
    mood: "Gắn kết 🤝",
    status: "voting" as const,
    urgencyText: "HR và Kế toán đã đồng ý • còn Dev Team",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=240&h=120&fit=crop",
    members: [
      { i: "T", color: "#10B981" },
      { i: "H", color: "#10B981" },
      { i: "K", color: "#F59E0B" },
      { i: "D", color: "#94A3B8" },
    ],
    votedCount: 2,
    totalCount: 4,
  },
];

const fetchPlans = async () => {
  // Simulate network latency (production-like)
  await new Promise((resolve) => setTimeout(resolve, 800));
  return savedPlans;
};

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });
}

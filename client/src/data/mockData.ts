export interface TimelineItem {
  time: string;
  title: string;
  desc: string;
  active?: boolean;
}

export interface PlanData {
  id: number;
  tag: string;
  title: string;
  time: string; // Used for listing in Suggested
  stops: string;
  cost: string;
  desc: string;
  mood: string;
  matchScore: number;
  img: string;
  transport: string;
  timeline: TimelineItem[];
}

export const getPlansByGroup = (group: string): PlanData[] => {
  if (group === "family") {
    return [
      {
        id: 1, tag: "Thích hợp nhất", title: "Ăn tối ấm cúng",
        time: "16:00", stops: "3 điểm đến", cost: "600k/người",
        desc: "Không gian rộng rãi, phù hợp trẻ nhỏ", mood: "Gắn kết",
        matchScore: 95,
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop",
        transport: "Ô tô gia đình",
        timeline: [
          { time: "16:00", title: "Khu vui chơi TiniWorld", desc: "Cho bé chơi trượt ống, nhà bóng", active: true },
          { time: "18:30", title: "Pizza 4P's", desc: "Ăn tối không gian rộng rãi, có ghế em bé", active: false },
          { time: "20:00", title: "Siêu thị mua sắm", desc: "Chuẩn bị đồ dùng cho tuần mới", active: false },
        ]
      },
      {
        id: 2, tag: "Hoạt động chung", title: "Công viên dã ngoại",
        time: "15:00", stops: "1 điểm đến", cost: "300k/người",
        desc: "Gần gũi thiên nhiên, thoải mái", mood: "Thư giãn",
        matchScore: 82,
        img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop",
        transport: "Ô tô gia đình",
        timeline: [
          { time: "15:00", title: "Công viên Yên Sở", desc: "Dựng lều, trải thảm picnic", active: true },
          { time: "16:30", title: "Hoạt động ngoài trời", desc: "Thả diều, nướng BBQ", active: false },
          { time: "18:00", title: "Ngắm hoàng hôn", desc: "Dọn dẹp và ngắm cảnh", active: false },
        ]
      },
      {
        id: 3, tag: "Giải trí", title: "Khu vui chơi & Ăn nhẹ",
        time: "19:00", stops: "2 điểm đến", cost: "400k/người",
        desc: "Trẻ em thích mê", mood: "Vui nhộn",
        matchScore: 70,
        img: "https://images.unsplash.com/photo-1566450653303-2614cbb292ea?w=600&auto=format&fit=crop",
        transport: "Taxi",
        timeline: [
          { time: "19:00", title: "Time City Aquarium", desc: "Tham quan thủy cung", active: true },
          { time: "21:00", title: "Cửa hàng kem tươi", desc: "Tráng miệng", active: false },
        ]
      }
    ];
  }
  
  if (group === "couple") {
    return [
      {
        id: 1, tag: "Lãng mạn nhất", title: "Bữa tối dưới ánh nến",
        time: "18:30", stops: "3 điểm đến", cost: "850k/người",
        desc: "Riêng tư, có nhạc nhẹ", mood: "Lãng mạn",
        matchScore: 98,
        img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop",
        transport: "Xe máy",
        timeline: [
          { time: "18:30", title: "La Badiane", desc: "Nhà hàng Pháp lãng mạn", active: true },
          { time: "20:30", title: "Rạp chiếu phim", desc: "Xem phim suất muộn", active: false },
          { time: "22:30", title: "Dạo phố đêm", desc: "Lái xe ngắm thành phố", active: false },
        ]
      },
      {
        id: 2, tag: "Sáng tạo", title: "Workshop làm gốm",
        time: "14:30", stops: "2 điểm đến", cost: "450k/người",
        desc: "Trải nghiệm mới lạ cùng nhau", mood: "Nghệ thuật",
        matchScore: 85,
        img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop",
        transport: "Xe máy",
        timeline: [
          { time: "14:30", title: "Tiệm Gốm Gốc Xưa", desc: "Tự tay làm gốm nghệ thuật", active: true },
          { time: "17:00", title: "Cà phê check-in", desc: "Uống cafe và chụp hình thành phẩm", active: false },
        ]
      },
      {
        id: 3, tag: "Nhẹ nhàng", title: "Xem phim & Dạo phố",
        time: "20:00", stops: "2 điểm đến", cost: "350k/người",
        desc: "Cổ điển nhưng không bao giờ cũ", mood: "Thư giãn",
        matchScore: 75,
        img: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=600&auto=format&fit=crop",
        transport: "Xe máy",
        timeline: [
          { time: "20:00", title: "CGV Vincom", desc: "Xem phim tình cảm", active: true },
          { time: "22:30", title: "Phố đi bộ", desc: "Đi dạo, ăn kem tràng tiền", active: false },
        ]
      }
    ];
  }
  
  if (group === "company") {
    return [];
  }
  
  // Default: Friends
  return [
    {
      id: 1, tag: "Hợp mood nhất", title: "Rooftop chill night",
      time: "18:30", stops: "3 điểm đến", cost: "520k/người",
      desc: "Hợp nhóm thích chill và chụp ảnh", mood: "Chill",
      matchScore: 92,
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop",
      transport: "Xe máy",
      timeline: [
        { time: "18:30", title: "Bistro Nhà Gỗ", desc: "Ăn tối nhẹ — chọn đồ ăn kiểu tapas", active: true },
        { time: "20:00", title: "Skyline Coffee", desc: "Rooftop ngắm thành phố, check-in", active: false },
        { time: "21:30", title: "River Walk", desc: "Đi dạo bờ sông & chụp ảnh", active: false },
      ]
    },
    {
      id: 2, tag: "Tiết kiệm nhất", title: "Food tour gần trung tâm",
      time: "19:00", stops: "4 điểm đến", cost: "250k/người",
      desc: "Nhiều món, chi phí dễ chịu", mood: "Ăn ngon",
      matchScore: 78,
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop",
      transport: "Đi bộ",
      timeline: [
        { time: "19:00", title: "Bánh tráng nướng", desc: "Ăn vặt khởi động", active: true },
        { time: "19:45", title: "Bún bò Huế", desc: "Ăn no bụng", active: false },
        { time: "20:30", title: "Chè thập cẩm", desc: "Tráng miệng mát lạnh", active: false },
        { time: "21:15", title: "Trà chanh chém gió", desc: "Ngồi lề đường tám chuyện", active: false },
      ]
    },
    {
      id: 3, tag: "Nhẹ nhàng", title: "Picnic + boardgame",
      time: "15:30", stops: "2 điểm đến", cost: "260k/người",
      desc: "Ít di chuyển, hợp buổi nhẹ nhàng", mood: "Nhẹ nhàng",
      matchScore: 65,
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&auto=format&fit=crop",
      transport: "Taxi",
      timeline: [
        { time: "15:30", title: "Bãi cỏ Landmark", desc: "Trải thảm picnic", active: true },
        { time: "16:30", title: "Chơi ma sói", desc: "Boardgame gắn kết", active: false },
      ]
    },
  ];
};

export const getPlanById = (group: string, planId: number): PlanData | undefined => {
  const plans = getPlansByGroup(group);
  return plans.find(p => p.id === planId) || plans[0]; // Fallback to first plan if not found
};

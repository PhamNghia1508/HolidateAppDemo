import { motion, AnimatePresence } from "framer-motion";
import { CurrencyDollar, Plus, Receipt, UserFocus, Heart, Wallet } from "@phosphor-icons/react";
import { useState } from "react";

export function MoneyPoolSheet({ onClose, groupParam }: { onClose: () => void, groupParam: string }) {
  const [activeTab, setActiveTab] = useState<"balances" | "expenses">("balances");

  const isCouple = groupParam === "couple";
  const isFamily = groupParam === "family";
  const isFriends = !isCouple && !isFamily;

  const headerTitle = isCouple ? "Quỹ Tình Yêu" : isFamily ? "Chi Phí Gia Đình" : "Quỹ Nhóm";
  const accentColor = isCouple ? "pink" : isFamily ? "amber" : "emerald";

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-slate-900/40 backdrop-blur-sm flex justify-center items-end"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col max-h-[85vh] overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100 flex flex-col items-center pb-2 relative shrink-0">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-4" />
            <h2 className="text-xl font-bold text-slate-800">{headerTitle}</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Tổng chi tiêu: <span className="text-rose-500 font-bold">1,250,000đ</span></p>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
              <Plus className="w-4 h-4 rotate-45" weight="bold" />
            </button>
            
            {!isFamily && (
              <div className="flex w-full mt-4 bg-slate-100 rounded-xl p-1">
                <button 
                  onClick={() => setActiveTab("balances")}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === "balances" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                >
                  {isCouple ? "Tổng quan" : "Số dư"}
                </button>
                <button 
                  onClick={() => setActiveTab("expenses")}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === "expenses" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
                >
                  Giao dịch
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {isFamily || activeTab === "expenses" ? (
              // EXPENSES / FAMILY VIEW
              <div className="space-y-3">
                {isFamily && (
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                        <Wallet weight="fill" className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">Ngân sách (5M)</p>
                        <p className="text-lg font-bold text-amber-700">Còn: 3,750,000đ</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Receipt className="w-5 h-5" weight="fill" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">Ăn trưa bún chả</p>
                    <p className="text-slate-400 text-xs mt-0.5">{isCouple ? "Bạn trả" : isFamily ? "Mẹ trả" : "Bạn trả • 4 người"}</p>
                  </div>
                  <p className="text-slate-800 font-bold text-sm">600,000đ</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Receipt className="w-5 h-5" weight="fill" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">Tiền Taxi</p>
                    <p className="text-slate-400 text-xs mt-0.5">{isCouple ? "Người ấy trả" : isFamily ? "Ba trả" : "Linh trả • 4 người"}</p>
                  </div>
                  <p className="text-slate-800 font-bold text-sm">150,000đ</p>
                </div>
              </div>
            ) : (
              // BALANCES VIEW (Friends / Couple)
              <div className="space-y-4">
                {isCouple ? (
                  <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                        <Heart weight="fill" className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-pink-600 font-bold uppercase tracking-wider">Bạn đã chi</p>
                        <p className="text-lg font-bold text-pink-700">800,000đ</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow-sm transition-colors">Đóng góp thêm</button>
                  </div>
                ) : (
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <CurrencyDollar weight="fill" className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Bạn cho nợ</p>
                        <p className="text-lg font-bold text-emerald-700">350,000đ</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-sm transition-colors">Đòi tiền</button>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Chi tiết</h3>
                  
                  {isCouple ? (
                    <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop" className="w-10 h-10 rounded-full" alt="Linh" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">Linh <span className="text-slate-400 font-normal">đã chi</span></p>
                        <p className="text-pink-600 font-bold text-sm">450,000đ</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop" className="w-10 h-10 rounded-full" alt="Minh" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">Minh <span className="text-slate-400 font-normal">nợ bạn</span></p>
                          <p className="text-emerald-600 font-bold text-sm">150,000đ</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600">
                          <UserFocus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop" className="w-10 h-10 rounded-full" alt="An" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">An <span className="text-slate-400 font-normal">nợ bạn</span></p>
                          <p className="text-emerald-600 font-bold text-sm">200,000đ</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600">
                          <UserFocus className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 shrink-0 pb-safe">
            <button className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(15,23,42,0.2)] hover:bg-slate-800 transition-colors">
              <Plus className="w-5 h-5" weight="bold" />
              Thêm khoản chi mới
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

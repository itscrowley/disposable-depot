'use client';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '₹ 45,231', change: '+20%', color: 'text-green-500' },
    { title: 'Total Orders', value: '150', change: '+5%', color: 'text-blue-500' },
    { title: 'Pending', value: '12', change: '-2%', color: 'text-orange-500' },
    { title: 'Products', value: '45', change: '+4%', color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Title */}
      <h2 className="text-2xl font-bold opacity-80">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          // ✅ Added 'admin-card' class here
          <div key={index} className="admin-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-bold opacity-70 mb-2">{stat.title}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className={`text-sm font-bold ${stat.color}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      // ✅ Added 'admin-card' class here
      <div className="admin-card p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-6 border-b border-gray-100 dark:border-gray-700 pb-2 opacity-90">
          Recent Orders
        </h3>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div>
                <p className="font-bold text-sm">Order #ORD-{100 + i}</p>
                <p className="text-xs opacity-60">2 mins ago</p>
              </div>
              <span className="text-sm font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                Paid
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

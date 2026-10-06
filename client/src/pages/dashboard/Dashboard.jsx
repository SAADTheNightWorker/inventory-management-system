// import React, { useMemo, useState } from "react";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   RadialBarChart,
//   RadialBar,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
// } from "recharts";
// import { motion } from "framer-motion";
// import {
//   Users,
//   CalendarDays,
//   Target,
//   GraduationCap,
//   PieChart as PieChartIcon,
//   BriefcaseBusiness,
//   Network,
//   TrendingUp,
//   CreditCard,
//   BookOpen,
//   Plane,
//   Bell,
//   Search,
//   ChevronRight,
//   Award,
//   UserCheck,
//   UserX,
//   Wallet,
// } from "lucide-react";

// const GLDashboard = () => {
//   const [activeTile, setActiveTile] = useState("attrition");
//   const [selectedPeriod, setSelectedPeriod] = useState("Week");

//   const teamMembers = [
//     { id: 1, name: "Olivia", avatar: "O" },
//     { id: 2, name: "James", avatar: "J" },
//     { id: 3, name: "Mia", avatar: "M" },
//     { id: 4, name: "Ethan", avatar: "E" },
//     { id: 5, name: "Sophia", avatar: "S" },
//     { id: 6, name: "Noah", avatar: "N" },
//     { id: 7, name: "Ava", avatar: "A" },
//   ];

//   const attritionData = [
//     { name: "Apr", value: 7.4 },
//     { name: "May", value: 7.8 },
//     { name: "Jun", value: 8.1 },
//     { name: "Jul", value: 8.7 },
//     { name: "Aug", value: 8.9 },
//     { name: "Sep", value: 9.2 },
//   ];

//   const timeOffTrend = [
//     { name: "Mon", value: 1 },
//     { name: "Tue", value: 2 },
//     { name: "Wed", value: 2 },
//     { name: "Thu", value: 3 },
//     { name: "Fri", value: 2 },
//     { name: "Sat", value: 1 },
//     { name: "Sun", value: 0 },
//   ];

//   const insightData = [
//     { name: "Engagement", value: 28 },
//     { name: "Performance", value: 22 },
//     { name: "Hiring", value: 18 },
//     { name: "Learning", value: 16 },
//     { name: "Goals", value: 16 },
//   ];

//   const myLearningData = [{ name: "Progress", value: 60, fill: "#06b6d4" }];
//   const myGoalsData = [{ name: "Progress", value: 82, fill: "#3b82f6" }];

//   const quickStats = useMemo(
//     () => [
//       {
//         id: "manage",
//         title: "Manage My Team",
//         subtitle: "Direct reports",
//         value: "7",
//         meta: "23 total",
//         icon: Users,
//         tone: "from-sky-500 to-cyan-500",
//         content: (
//           <div className="flex items-center justify-between gap-4">
//             <div className="flex -space-x-2">
//               {teamMembers.map((m) => (
//                 <div
//                   key={m.id}
//                   className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-800 text-sm font-semibold text-white shadow"
//                 >
//                   {m.avatar}
//                 </div>
//               ))}
//             </div>
//             <div className="text-right">
//               <div className="text-4xl font-bold text-slate-900 dark:text-white">
//                 7
//               </div>
//               <div className="text-xs text-slate-500 dark:text-slate-400">
//                 Direct reports
//               </div>
//               <div className="text-xs text-slate-400">23 total</div>
//             </div>
//           </div>
//         ),
//       },
//       {
//         id: "timeoff",
//         title: "Team Time Off",
//         subtitle: "Absent this week",
//         value: "2",
//         meta: "2 planned",
//         icon: CalendarDays,
//         tone: "from-violet-500 to-fuchsia-500",
//         content: (
//           <div className="h-24">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={timeOffTrend}>
//                 <defs>
//                   <linearGradient id="timeOffFill" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
//                     <stop
//                       offset="95%"
//                       stopColor="#8b5cf6"
//                       stopOpacity={0.02}
//                     />
//                   </linearGradient>
//                 </defs>
//                 <Tooltip
//                   contentStyle={{
//                     background: "#0f172a",
//                     border: "1px solid #1e293b",
//                     borderRadius: 12,
//                     color: "#fff",
//                   }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#8b5cf6"
//                   strokeWidth={3}
//                   fill="url(#timeOffFill)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         ),
//       },
//       {
//         id: "goals",
//         title: "Team Goals",
//         subtitle: "Person behind",
//         value: "1",
//         meta: "Needs review",
//         icon: Target,
//         tone: "from-amber-500 to-orange-500",
//       },
//       {
//         id: "learning",
//         title: "Team Learning",
//         subtitle: "People behind",
//         value: "2",
//         meta: "Mandatory courses",
//         icon: GraduationCap,
//         tone: "from-emerald-500 to-teal-500",
//       },
//       {
//         id: "insights",
//         title: "Team Insights",
//         subtitle: "Metrics available",
//         value: "5",
//         meta: "Latest snapshot",
//         icon: PieChartIcon,
//         tone: "from-pink-500 to-rose-500",
//         content: (
//           <div className="h-24">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={insightData}
//                   dataKey="value"
//                   nameKey="name"
//                   innerRadius={26}
//                   outerRadius={42}
//                   paddingAngle={4}
//                 >
//                   {["#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b", "#10b981"].map(
//                     (color, i) => (
//                       <Cell key={i} fill={color} />
//                     )
//                   )}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     background: "#0f172a",
//                     border: "1px solid #1e293b",
//                     borderRadius: 12,
//                     color: "#fff",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         ),
//       },
//       {
//         id: "recruiting",
//         title: "Recruiting",
//         subtitle: "Open requisitions",
//         value: "3",
//         meta: "12 candidates",
//         icon: BriefcaseBusiness,
//         tone: "from-indigo-500 to-sky-500",
//       },
//       {
//         id: "org",
//         title: "Org Chart",
//         subtitle: "Direct reports",
//         value: "8",
//         meta: "23 total",
//         icon: Network,
//         tone: "from-cyan-500 to-blue-500",
//       },
//       {
//         id: "attrition",
//         title: "Attrition Rate",
//         subtitle: "As of Sep. 2014",
//         value: "9.2%",
//         meta: "Trending upward",
//         icon: TrendingUp,
//         tone: "from-rose-500 to-orange-500",
//         content: (
//           <div className="h-28">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={attritionData}>
//                 <Tooltip
//                   contentStyle={{
//                     background: "#0f172a",
//                     border: "1px solid #1e293b",
//                     borderRadius: 12,
//                     color: "#fff",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#0ea5e9"
//                   strokeWidth={3}
//                   dot={{ r: 4, fill: "#0ea5e9" }}
//                   activeDot={{ r: 6 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const personalCards = [
//     {
//       id: "profile",
//       title: "My Info",
//       large: true,
//       content: (
//         <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.16),transparent_30%)]" />
//           <div className="relative flex h-full min-h-[220px] flex-col justify-between p-6">
//             <div>
//               <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur">
//                 <UserCheck size={14} />
//                 Employee Profile
//               </div>
//               <h3 className="text-2xl font-semibold text-white">
//                 Welcome back, Gloria
//               </h3>
//               <p className="mt-2 max-w-md text-sm text-slate-300">
//                 Your profile, payroll, learning, goals, and time-off status in
//                 one place.
//               </p>
//             </div>

//             <div className="mt-6">
//               <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
//                 <span>Profile completion</span>
//                 <span className="font-semibold text-white">17%</span>
//               </div>
//               <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: "17%" }}
//                   transition={{ duration: 1, ease: "easeOut" }}
//                   className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       id: "pay",
//       title: "My Pay",
//       icon: CreditCard,
//       value: "2 days",
//       subtitle: "Next paycheck",
//       tone: "from-slate-900 to-slate-800",
//       miniIcon: Wallet,
//     },
//     {
//       id: "mylearning",
//       title: "Learning",
//       value: "9",
//       subtitle: "Courses total",
//       meta: "4 mandatory",
//       chart: (
//         <div className="h-24">
//           <ResponsiveContainer width="100%" height="100%">
//             <RadialBarChart
//               innerRadius="65%"
//               outerRadius="100%"
//               data={myLearningData}
//               startAngle={90}
//               endAngle={-270}
//             >
//               <RadialBar
//                 background={{ fill: "#e2e8f0" }}
//                 dataKey="value"
//                 cornerRadius={10}
//               />
//               <Tooltip />
//             </RadialBarChart>
//           </ResponsiveContainer>
//         </div>
//       ),
//       percent: "60%",
//     },
//     {
//       id: "mygoals",
//       title: "Goals",
//       value: "3",
//       subtitle: "Last update",
//       meta: "4 months ago",
//       chart: (
//         <div className="h-24">
//           <ResponsiveContainer width="100%" height="100%">
//             <RadialBarChart
//               innerRadius="65%"
//               outerRadius="100%"
//               data={myGoalsData}
//               startAngle={90}
//               endAngle={-270}
//             >
//               <RadialBar
//                 background={{ fill: "#e2e8f0" }}
//                 dataKey="value"
//                 cornerRadius={10}
//               />
//               <Tooltip />
//             </RadialBarChart>
//           </ResponsiveContainer>
//         </div>
//       ),
//       percent: "82%",
//     },
//     {
//       id: "vacation",
//       title: "Time Off",
//       icon: Plane,
//       value: "14",
//       subtitle: "Vacation days",
//       meta: "Next 3 in 1 week",
//       tone: "from-slate-900 to-slate-800",
//       miniIcon: UserX,
//     },
//   ];

//   const activeCard = quickStats.find((item) => item.id === activeTile);

//   return (
//     <div className="min-h-screen  text-slate-900 md:p-6">
//       <div className="mx-auto max-w-full">
//         <motion.div
//           initial={{ opacity: 0, y: 18 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.45 }}
//           className="overflow-hidden rounded-xl  border border-white/10
//            bg-white/70 shadow-2xl shadow-slate-950/20 backdrop-blur-xl "
//         >
//           <div className="border-slate-200/70 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 p-5 dark:border-slate-800">
//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <p className="text-sm font-medium text-white/80">
//                   Workforce Dashboard
//                 </p>
//                 <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
//                   People Operations Overview
//                 </h1>
//               </div>

//               <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//                 <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur">
//                   <Search size={18} />
//                   <input
//                     placeholder="Search dashboard..."
//                     className="w-full bg-transparent text-sm outline-none placeholder:text-white/70 sm:w-52"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   {["Day", "Week", "Month"].map((period) => (
//                     <button
//                       key={period}
//                       onClick={() => setSelectedPeriod(period)}
//                       className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
//                         selectedPeriod === period
//                           ? "bg-white text-slate-900 shadow"
//                           : "bg-white/10 text-white hover:bg-white/20"
//                       }`}
//                     >
//                       {period}
//                     </button>
//                   ))}
//                 </div>

//                 <button className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow hover:shadow-lg">
//                   <Bell size={16} />
//                   Alerts
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="grid gap-4 p-4 md:grid-cols-12 md:p-6">
//             <div className="md:col-span-8">
//               <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//                 {quickStats.map((item, index) => {
//                   const Icon = item.icon;
//                   const isActive = activeTile === item.id;

//                   return (
//                     <motion.button
//                       key={item.id}
//                       initial={{ opacity: 0, y: 24 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.35, delay: index * 0.05 }}
//                       whileHover={{ y: -4, scale: 1.01 }}
//                       whileTap={{ scale: 0.99 }}
//                       onClick={() => setActiveTile(item.id)}
//                       className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition ${
//                         isActive
//                           ? "border-cyan-400 bg-slate-950 text-white shadow-xl shadow-cyan-500/10"
//                           : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
//                       }`}
//                     >
//                       <div
//                         className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.tone}`}
//                       />
//                       <div className="mb-4 flex items-start justify-between">
//                         <div>
//                           <p className="text-sm font-semibold">{item.title}</p>
//                           <p
//                             className={`mt-1 text-xs ${
//                               isActive
//                                 ? "text-slate-300"
//                                 : "text-slate-500 dark:text-slate-400"
//                             }`}
//                           >
//                             {item.subtitle}
//                           </p>
//                         </div>
//                         <div
//                           className={`rounded-2xl p-3 ${
//                             isActive
//                               ? "bg-white/10"
//                               : "bg-slate-100 dark:bg-slate-800"
//                           }`}
//                         >
//                           <Icon size={18} />
//                         </div>
//                       </div>

//                       {item.content ? (
//                         item.content
//                       ) : (
//                         <div className="mt-8 flex items-end justify-between">
//                           <div>
//                             <div className="text-4xl font-bold">
//                               {item.value}
//                             </div>
//                             <div
//                               className={`mt-1 text-xs ${
//                                 isActive
//                                   ? "text-slate-400"
//                                   : "text-slate-500 dark:text-slate-400"
//                               }`}
//                             >
//                               {item.meta}
//                             </div>
//                           </div>
//                           <ChevronRight
//                             size={18}
//                             className={`transition ${
//                               isActive
//                                 ? "text-white"
//                                 : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
//                             }`}
//                           />
//                         </div>
//                       )}
//                     </motion.button>
//                   );
//                 })}
//               </div>

//               <div className="mt-4 grid gap-4 lg:grid-cols-3">
//                 <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
//                   <div className="mb-4 flex items-center justify-between">
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
//                         Detail View
//                       </h3>
//                       <p className="text-sm text-slate-500 dark:text-slate-400">
//                         Interactive summary for the selected card
//                       </p>
//                     </div>
//                     <div className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
//                       {activeCard?.title}
//                     </div>
//                   </div>

//                   <div className="grid gap-4 md:grid-cols-2">
//                     <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
//                       <p className="text-sm text-slate-500 dark:text-slate-400">
//                         Primary metric
//                       </p>
//                       <h4 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
//                         {activeCard?.value}
//                       </h4>
//                       <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
//                         {activeCard?.subtitle}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {activeCard?.meta}
//                       </p>
//                     </div>

//                     <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
//                       <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
//                         Health indicators
//                       </p>
//                       <div className="space-y-3">
//                         {[
//                           { label: "On track", value: 72 },
//                           { label: "Needs attention", value: 18 },
//                           { label: "Critical", value: 10 },
//                         ].map((row) => (
//                           <div key={row.label}>
//                             <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
//                               <span>{row.label}</span>
//                               <span>{row.value}%</span>
//                             </div>
//                             <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
//                               <motion.div
//                                 initial={{ width: 0 }}
//                                 animate={{ width: `${row.value}%` }}
//                                 transition={{ duration: 0.7 }}
//                                 className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4 h-60 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={attritionData}>
//                         <defs>
//                           <linearGradient
//                             id="activeChartFill"
//                             x1="0"
//                             y1="0"
//                             x2="0"
//                             y2="1"
//                           >
//                             <stop
//                               offset="5%"
//                               stopColor="#0ea5e9"
//                               stopOpacity={0.35}
//                             />
//                             <stop
//                               offset="95%"
//                               stopColor="#0ea5e9"
//                               stopOpacity={0.02}
//                             />
//                           </linearGradient>
//                         </defs>
//                         <Tooltip
//                           contentStyle={{
//                             background: "#0f172a",
//                             border: "1px solid #1e293b",
//                             borderRadius: 12,
//                             color: "#fff",
//                           }}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="value"
//                           stroke="#0ea5e9"
//                           strokeWidth={3}
//                           fill="url(#activeChartFill)"
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
//                   <div className="mb-4 flex items-center justify-between">
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
//                         Team Highlights
//                       </h3>
//                       <p className="text-sm text-slate-500 dark:text-slate-400">
//                         Snapshot this week
//                       </p>
//                     </div>
//                     <Award className="text-cyan-500" size={20} />
//                   </div>

//                   <div className="space-y-3">
//                     {[
//                       {
//                         label: "Best engagement score",
//                         value: "Marketing",
//                       },
//                       {
//                         label: "Most open requisitions",
//                         value: "Engineering",
//                       },
//                       {
//                         label: "Learning completion leader",
//                         value: "Operations",
//                       },
//                       {
//                         label: "Highest attrition risk",
//                         value: "Sales",
//                       },
//                     ].map((item, i) => (
//                       <motion.div
//                         key={item.label}
//                         initial={{ opacity: 0, x: 14 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.06 }}
//                         className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60"
//                       >
//                         <p className="text-xs text-slate-500 dark:text-slate-400">
//                           {item.label}
//                         </p>
//                         <p className="mt-1 font-semibold text-slate-900 dark:text-white">
//                           {item.value}
//                         </p>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="md:col-span-4">
//               <div className="grid gap-4">
//                 {personalCards.map((card, index) => {
//                   const Icon = card.icon;
//                   const MiniIcon = card.miniIcon;

//                   if (card.large) {
//                     return (
//                       <motion.div
//                         key={card.id}
//                         initial={{ opacity: 0, y: 18 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.08 }}
//                       >
//                         {card.content}
//                       </motion.div>
//                     );
//                   }

//                   return (
//                     <motion.div
//                       key={card.id}
//                       initial={{ opacity: 0, y: 18 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.08 }}
//                       whileHover={{ y: -3 }}
//                       className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
//                     >
//                       <div className="mb-4 flex items-start justify-between">
//                         <div>
//                           <h3 className="text-base font-semibold text-slate-900 dark:text-white">
//                             {card.title}
//                           </h3>
//                           <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
//                             {card.subtitle}
//                           </p>
//                         </div>

//                         <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
//                           {Icon ? (
//                             <Icon
//                               size={18}
//                               className="text-slate-700 dark:text-slate-200"
//                             />
//                           ) : MiniIcon ? (
//                             <MiniIcon
//                               size={18}
//                               className="text-slate-700 dark:text-slate-200"
//                             />
//                           ) : null}
//                         </div>
//                       </div>

//                       {card.chart ? (
//                         <div className="grid grid-cols-[90px_1fr] items-center gap-4">
//                           <div className="relative">
//                             {card.chart}
//                             <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-700 dark:text-slate-200">
//                               {card.percent}
//                             </div>
//                           </div>
//                           <div>
//                             <div className="text-4xl font-bold text-slate-900 dark:text-white">
//                               {card.value}
//                             </div>
//                             <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//                               {card.subtitle}
//                             </div>
//                             <div className="mt-1 text-xs text-slate-400">
//                               {card.meta}
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div>
//                           <div className="text-4xl font-bold text-slate-900 dark:text-white">
//                             {card.value}
//                           </div>
//                           <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//                             {card.subtitle}
//                           </div>
//                           <div className="mt-1 text-xs text-slate-400">
//                             {card.meta}
//                           </div>
//                         </div>
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default GLDashboard;

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";
import {
  Search,
  Bell,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Check,
  Circle,
  ArrowLeft,
} from "lucide-react";
import { BellAlertIcon } from "@heroicons/react/24/outline";

const workingFormatData = [
  { name: "Office", value: 50, fill: "#9DDBCA" },
  { name: "Hybrid", value: 30, fill: "#C8D86D" },
  { name: "Remote", value: 20, fill: "#D7A4B9" },
];

const onboardingTasksSeed = [
  {
    id: 1,
    title: "Onboarding Session",
    day: "MON, FEB 3",
    time: "10:00",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=300&q=80",
    done: true,
  },
  {
    id: 2,
    title: "Interview",
    day: "MON, FEB 3",
    time: "14:00",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80",
    done: true,
  },
  {
    id: 3,
    title: "Project Update",
    day: "MON, FEB 3",
    time: "14:30",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=300&q=80",
    done: true,
  },
  {
    id: 4,
    title: "HR Policy Review",
    day: "MON, FEB 3",
    time: "16:00",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80",
    done: true,
  },
  {
    id: 5,
    title: "Team Meeting",
    day: "MON, FEB 3",
    time: "17:00",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80",
    done: false,
  },
];

const timelineDays = [
  { label: "MON.", date: 3 },
  { label: "TUE.", date: 4 },
  { label: "WED.", date: 5 },
  { label: "THU.", date: 6 },
  { label: "FRI.", date: 7 },
  { label: "SAT.", date: 8 },
  { label: "SUN.", date: 9 },
];

const timeRows = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 AM",
  "13:00 AM",
];

const productivityData = [
  { name: "W1", value: 35 },
  { name: "W2", value: 52 },
  { name: "W3", value: 49 },
  { name: "W4", value: 66 },
  { name: "W5", value: 58 },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState(onboardingTasksSeed);
  const [selectedTask, setSelectedTask] = useState(onboardingTasksSeed[0].id);
  const [activeMetric, setActiveMetric] = useState("projects");
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const completedPercent = useMemo(() => {
    const done = tasks.filter((t) => t.done).length;
    return Math.round((done / tasks.length) * 100);
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  // FOR PIE CHART
  const [activeIndex, setActiveIndex] = useState(0);

  const totalLocations = workingFormatData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const activeLocation = workingFormatData[activeIndex];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const item = payload[0]?.payload;

    return (
      <div className="rounded-2xl border border-white/10 bg-[#111] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="mt-1 text-xs text-white/70">
          {item.value}% of workforce distribution
        </p>
      </div>
    );
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  // FOR PIE CHART

  const statCards = [
    {
      id: "days",
      value: "500",
      label: "Days in the company",
      change: "+8% last month",
      type: "chart",
    },
    {
      id: "projects",
      value: "38",
      label: "Completed projects",
      change: "+4 last month",
      type: "button",
      accent: true,
    },
    {
      id: "progress",
      value: "8",
      label: "Projects in progress",
      change: "+3 last month",
      type: "button",
    },
    {
      id: "salary",
      value: "$6,110",
      label: "Salary",
      change: "+40% last month",
      type: "glow",
    },
    {
      id: "personal",
      value: "",
      label: "Personal data",
      change: "",
      type: "image",
    },
  ];

  const scheduleEvents = [
    {
      id: 1,
      title: "Onboarding Session",
      dayIndex: 0,
      startRow: 2,
      width: 2,
      avatars: ["HV", "AN", "MK"],
    },
    {
      id: 2,
      title: "Design Team Sync",
      dayIndex: 2,
      startRow: 4,
      width: 2,
      avatars: ["OL", "JD", "RA"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#e9e7e2] p-3 md:p-5">
      <div className="mx-auto rounded-[28px] bg-[#f5f3ee]/40 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.08)] md:p-6 mb-10">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#111111] md:text-5xl">
              Hello Olivia
            </h1>
            <button className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#2b2b2b]/80 transition hover:text-black">
              <ArrowLeft size={16} />
              Go back to the list of employees
            </button>
          </div>

          <div className="flex items-center gap-3 self-start">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -1 }}
              className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ebe8e2] text-[#111]"
            >
              <Search size={22} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -1 }}
              className="relative grid h-11 w-11 place-items-center rounded-2xl bg-[#ebe8e2] text-[#111]"
            >
              <BellAlertIcon className="h-8" />
              {/* <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-black" /> */}
            </motion.button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.95fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[30px] bg-[#d9d8d4] p-4"
          >
            <div className="relative h-[580px] overflow-hidden rounded-[28px]">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
                alt="Employee profile"
                className="h-full border rounded-3xl w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                // bg-[#e8e5df]/85
                className="absolute bottom-4 left-4 right-4 rounded-[24px] bg-[#e8e5df]/20 p-5 backdrop-blur-md"
              >
                {/* text-[#111] */}
                <h2 className="text-3xl font-semibold tracking-tight text-[#ffff]/90">
                  Helen Vasilovsky
                </h2>
                <p className="mt-1 text-sm uppercase tracking-wide text-[#ffff]/70">
                  UX Designer
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-[30px] bg-[#fbfaf7] p-5"
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-[20px] font-semibold text-[#111]">
                Working format
              </h3>
              <button className="rounded-xl p-2 text-[#111]/70 transition hover:bg-black/5">
                <MoreVertical size={18} />
              </button>
            </div>
            {/* h-[220px] */}
            <div className="relative mx-auto h-[320px] w-full max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={workingFormatData}
                  innerRadius="58%"
                  outerRadius="100%"
                  barSize={10}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    background={{ fill: "#ece8e0" }}
                    dataKey="value"
                    cornerRadius={30}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "none",
                      background: "#111",
                      color: "#fff",
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[42px] font-semibold leading-none text-[#111]">
                  500
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#111]/65">
                  Days
                </div>
              </div>
            </div>
            {/* mt-2 */}
            <div className="mt-10 ml-10 grid grid-cols-3 gap-3">
              {workingFormatData.map((item) => (
                <button
                  key={item.name}
                  className="rounded-2xl p-2 text-left transition hover:bg-[#f1eee8]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-lg font-semibold text-[#111]">
                      {item.value}%
                    </span>
                  </div>
                  <p className="text-md font-semibold uppercase leading-tight tracking-wide text-[#111]/65">
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[30px] bg-[#d8d3c6] p-5"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-[20px] font-semibold text-[#111]">
                  Onboarding tasks
                </h3>
              </div>
              <div className="text-right">
                <div className="text-5xl font-semibold leading-none text-[#111]">
                  {completedPercent}%
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="relative h-2 rounded-full bg-[#c8c48f]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completedPercent}%` }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-0 top-0 h-2 rounded-full bg-[#97b446]"
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-semibold text-[#111]/75">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedTask(task.id)}
                  className={`flex cursor-pointer items-center gap-3 rounded-[22px] p-2 transition ${
                    selectedTask === task.id
                      ? "bg-[#f4f1eb]"
                      : "bg-transparent hover:bg-[#efebe2]/70"
                  }`}
                >
                  <img
                    src={task.image}
                    alt={task.title}
                    className="h-16 w-16 rounded-[18px] object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold uppercase text-[#111]">
                      {task.title}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#111]/70">
                      {task.day} | {task.time}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-full text-[#111]"
                  >
                    {task.done ? (
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#111] text-white">
                        <Check size={13} />
                      </span>
                    ) : (
                      <Circle size={20} className="text-[#111]/75" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.95fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-[30px] bg-[#e6e3dc] p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#f6f3ee] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#111]">
                <ChevronLeft size={14} />
                January
              </button>

              <h3 className="text-2xl font-semibold text-[#111]">
                February 2025
              </h3>

              <button className="inline-flex items-center gap-2 rounded-full bg-[#f6f3ee] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#111]">
                March
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[780px]">
                <div className="grid grid-cols-[90px_repeat(7,1fr)] text-[12px] font-semibold uppercase tracking-wide text-[#111]/60">
                  <div />
                  {timelineDays.map((d) => (
                    <div key={d.date} className="pb-3 text-center">
                      {d.label} {d.date}
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <div className="grid grid-cols-[90px_repeat(7,1fr)]">
                    <div className="space-y-5 pr-3">
                      {timeRows.map((t) => (
                        <div
                          key={t}
                          className="h-[46px] text-xs font-medium text-[#111]/70"
                        >
                          {t}
                        </div>
                      ))}
                    </div>

                    {timelineDays.map((d) => (
                      <div
                        key={d.date}
                        className="relative border-l border-dashed border-[#beb8ae] pb-2"
                      >
                        {timeRows.map((t, idx) => (
                          <div key={`${d.date}-${idx}`} className="h-[46px]" />
                        ))}
                      </div>
                    ))}
                  </div>

                  {scheduleEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      layout
                      onHoverStart={() => setHoveredEvent(event.id)}
                      onHoverEnd={() => setHoveredEvent(null)}
                      className="absolute z-10"
                      style={{
                        left: `calc(90px + ${event.dayIndex} * ((100% - 90px) / 7) + 10px)`,
                        top: `${event.startRow * 46 + 10}px`,
                        width: `calc(${event.width} * ((100% - 90px) / 7) - 20px)`,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.015 }}
                        className="flex h-[38px] items-center justify-between rounded-full bg-[#111111] px-4 text-white shadow-lg"
                      >
                        <span className="truncate text-[11px] font-semibold uppercase tracking-wide">
                          {event.title}
                        </span>

                        <div className="ml-3 flex -space-x-2">
                          {event.avatars.map((avatar) => (
                            <div
                              key={avatar}
                              className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-[#d7c7b2] text-[9px] font-bold text-black"
                            >
                              {avatar}
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      <AnimatePresence>
                        {hoveredEvent === event.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="mt-2 rounded-2xl bg-white px-3 py-2 text-xs text-[#111] shadow-xl"
                          >
                            Team session with 3 participants
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="rounded-[30px] bg-[#f8f6f1] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[20px] font-semibold text-[#111]">
                Performance trend
              </h3>
              <div className="rounded-full bg-[#efebe4] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#111]/70">
                Monthly
              </div>
            </div>
            {/* h-[260px] */}
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData}>
                  <defs>
                    <linearGradient id="prodFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#c8d86d"
                        stopOpacity={0.65}
                      />
                      <stop
                        offset="100%"
                        stopColor="#c8d86d"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b6b6b", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "none",
                      background: "#111",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#111111"
                    strokeWidth={2.5}
                    fill="url(#prodFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {["projects", "attendance", "focus"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveMetric(item)}
                  className={`rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    activeMetric === item
                      ? "bg-[#111] text-white"
                      : "bg-[#efebe4] text-[#111]/75 hover:bg-[#e8e3da]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + index * 0.04 }}
              whileHover={{ y: -3 }}
              className={`min-h-[170px] rounded-[30px] p-5 ${
                card.accent
                  ? "bg-[#e8dfb9]"
                  : card.type === "glow"
                    ? "bg-[radial-gradient(circle_at_top,#efe5dd_0%,#c8b59d_45%,#aea191_100%)]"
                    : card.type === "image"
                      ? "bg-[#ddd8cf]"
                      : "bg-[#ffffff]"
              }`}
            >
              {card.type !== "image" && (
                <>
                  <div className="text-5xl font-semibold leading-none text-[#111]">
                    {card.value}
                  </div>
                  <p className="mt-3 text-sm font-semibold uppercase leading-tight tracking-wide text-[#111]">
                    {card.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#111]/65">
                    {card.change}
                  </p>
                </>
              )}

              {card.type === "chart" && (
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-[#111]/70">
                    <span>0</span>
                    <span>250</span>
                    <span>500</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#ebe7dd]">
                    <div className="h-full w-full bg-[linear-gradient(90deg,#e3a3bc_0%,#dfe69d_50%,#9cd9c6_100%)]" />
                  </div>
                </div>
              )}

              {card.type === "button" && (
                <button className="mt-8 rounded-full bg-[#f6f3ee] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#111] transition hover:bg-white">
                  View all
                </button>
              )}

              {card.type === "glow" && (
                <div className="mt-8 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-white/25 blur-sm" />
                </div>
              )}

              {card.type === "image" && (
                <div className="flex h-full flex-col justify-between">
                  <div className="overflow-hidden rounded-[24px]">
                    <img
                      src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
                      alt="Personal data"
                      className="h-[105px] w-full object-cover"
                    />
                  </div>
                  <button className="mt-4 rounded-full bg-[#f6f3ee] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#111] transition hover:bg-white">
                    Personal data
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-[30px] border border-[#111]/6 bg-[#fbfaf7] p-5 shadow-[0_10px_30px_rgba(17,17,17,0.04)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-[20px] font-semibold text-[#111]">
                  Location mix
                </h3>
                <p className="mt-1 text-sm text-[#111]/55">
                  Interactive distribution overview
                </p>
              </div>

              <div className="rounded-full bg-[#111]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111]/60">
                Live breakdown
              </div>
            </div>

            <div className="grid items-center gap-4 md:grid-cols-[220px_1fr]">
              <div className="relative h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workingFormatData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={62}
                      outerRadius={88}
                      paddingAngle={4}
                      cornerRadius={10}
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                    >
                      {workingFormatData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={entry.fill}
                          style={{
                            cursor: "pointer",
                            opacity: activeIndex === index ? 1 : 0.78,
                            transition: "all 0.2s ease",
                          }}
                        />
                      ))}
                    </Pie>

                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[30px] font-semibold leading-none text-[#111]">
                    {totalLocations}%
                  </span>
                  <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111]/45">
                    Total mix
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {workingFormatData.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className={`flex w-full items-center justify-between rounded-[20px] px-4 py-3 text-left transition-all duration-200 ${
                        isActive
                          ? "bg-white shadow-[0_8px_24px_rgba(17,17,17,0.06)] ring-1 ring-[#111]/8"
                          : "bg-[#f3f1ec] hover:bg-white/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.fill }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#111]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#111]/50">
                            {isActive
                              ? "Currently selected"
                              : "Hover to inspect"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#111]">
                          {item.value}%
                        </p>
                        <div className="mt-2 h-1.5 w-20 overflow-hidden rounded-full bg-[#111]/8">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${item.value}%`,
                              backgroundColor: item.fill,
                            }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}

                {activeLocation && (
                  <motion.div
                    key={activeLocation.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-[22px] bg-[#111] px-4 py-4 text-white"
                  >
                    <p className="text-sm font-semibold">
                      {activeLocation.name}
                    </p>
                    <p className="mt-1 text-sm text-white/72">
                      Represents {activeLocation.value}% of the current location
                      distribution.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          {/* PIE CHART */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="rounded-[30px] bg-[#e6e1d9] p-5"
          >
            <h3 className="text-[20px] font-semibold text-[#111]">
              Selected task details
            </h3>

            <AnimatePresence mode="wait">
              {tasks
                .filter((task) => task.id === selectedTask)
                .map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="mt-4"
                  >
                    <img
                      src={task.image}
                      alt={task.title}
                      className="h-[180px] w-full rounded-[24px] object-cover"
                    />
                    <h4 className="mt-4 text-2xl font-semibold text-[#111]">
                      {task.title}
                    </h4>
                    <p className="mt-2 text-sm font-medium uppercase tracking-wide text-[#111]/70">
                      {task.day} · {task.time}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[#111]/75">
                      Review attendee notes, documents, and progress before the
                      meeting. Toggle completion on the task list to update the
                      dashboard percentage in real time.
                    </p>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

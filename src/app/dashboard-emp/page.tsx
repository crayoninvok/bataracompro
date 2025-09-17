"use client"
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Calendar,
  Users,
  Clock,
  ChevronRight,
  Activity,
  Briefcase,
  Target,
  BarChart3,
  FileText,
  Settings,
  Award,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";

// Types
interface StatType {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
  color: string;
}

interface ProjectType {
  id: number;
  name: string;
  status: 'In Progress' | 'Planning' | 'Completed' | 'On Hold';
  progress: number;
  deadline: string;
  team: number;
  priority: 'High' | 'Medium' | 'Low';
}

interface TaskType {
  id: number;
  title: string;
  time: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
}

interface ActivityType {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

export default function Dashboard(): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats: StatType[] = [
    {
      title: "Active Projects",
      value: "8",
      change: "+2 this week",
      changeType: 'increase',
      icon: Briefcase,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Pending Tasks",
      value: "24",
      change: "-3 completed today",
      changeType: 'decrease',
      icon: Target,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+1 new member",
      changeType: 'increase',
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Hours Logged",
      value: "156",
      change: "+8 hours today",
      changeType: 'increase',
      icon: Timer,
      color: "from-green-500 to-green-600",
    },
  ];

  const recentProjects: ProjectType[] = [
    {
      id: 1,
      name: "Green Building Complex",
      status: "In Progress",
      progress: 75,
      deadline: "2024-12-15",
      team: 8,
      priority: "High",
    },
    {
      id: 2,
      name: "Smart Office Tower",
      status: "Planning",
      progress: 25,
      deadline: "2025-03-20",
      team: 12,
      priority: "Medium",
    },
    {
      id: 3,
      name: "Residential Park",
      status: "In Progress",
      progress: 60,
      deadline: "2024-11-30",
      team: 6,
      priority: "High",
    },
    {
      id: 4,
      name: "Corporate Headquarters",
      status: "Completed",
      progress: 100,
      deadline: "2024-10-15",
      team: 15,
      priority: "High",
    },
  ];

  const todaysTasks: TaskType[] = [
    {
      id: 1,
      title: "Review design mockups",
      time: "09:00",
      type: "Review",
      priority: "high",
      status: "completed",
    },
    {
      id: 2,
      title: "Client meeting - Project Alpha",
      time: "11:30",
      type: "Meeting",
      priority: "high",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Update project documentation",
      time: "14:00",
      type: "Documentation",
      priority: "medium",
      status: "pending",
    },
    {
      id: 4,
      title: "Code review session",
      time: "16:00",
      type: "Review",
      priority: "medium",
      status: "pending",
    },
  ];

  const recentActivity: ActivityType[] = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "completed",
      target: "UI Design Review",
      time: "2 minutes ago",
      avatar: "SJ",
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "updated",
      target: "Project Timeline",
      time: "15 minutes ago",
      avatar: "MC",
    },
    {
      id: 3,
      user: "Emily Davis",
      action: "created",
      target: "New Task Assignment",
      time: "1 hour ago",
      avatar: "ED",
    },
    {
      id: 4,
      user: "David Wilson",
      action: "submitted",
      target: "Weekly Report",
      time: "2 hours ago",
      avatar: "DW",
    },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Progress":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Planning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "On Hold":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "in-progress":
        return <Timer className="w-4 h-4 text-cyan-400" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10 rounded-xl p-6 border border-gray-700/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Good {mounted && currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}! 👋
            </h1>
            <p className="text-gray-400">
              Here's what's happening with your projects today.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-orange-500 hover:to-orange-600 text-black font-medium px-4 py-2 rounded-lg transition-all duration-300">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat: StatType, index: number) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              {stat.changeType === 'increase' ? (
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-400" />
              )}
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
            <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Projects */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                My Projects
              </h2>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1 transition-colors">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {recentProjects.map((project: ProjectType) => (
                <div
                  key={project.id}
                  className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-200 hover:bg-gray-800/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{project.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.team} members
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due {formatDate(project.deadline)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-cyan-400 font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Today's Tasks
            </h2>

            <div className="space-y-3">
              {todaysTasks.map((task: TaskType) => (
                <div
                  key={task.id}
                  className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 hover:border-gray-600/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                    {getTaskStatusIcon(task.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{task.time} • {task.type}</span>
                    <span className={`px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Recent Activity
            </h2>

            <div className="space-y-3">
              {recentActivity.map((activity: ActivityType) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-400"> {activity.action} </span>
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-400" />
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-3 transition-colors border border-gray-700/50 text-center group">
                <FileText className="w-5 h-5 mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs">New Report</span>
              </button>
              <button className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-3 transition-colors border border-gray-700/50 text-center group">
                <Users className="w-5 h-5 mx-auto mb-2 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs">Team Chat</span>
              </button>
              <button className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-3 transition-colors border border-gray-700/50 text-center group">
                <BarChart3 className="w-5 h-5 mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs">Analytics</span>
              </button>
              <button className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-3 transition-colors border border-gray-700/50 text-center group">
                <Calendar className="w-5 h-5 mx-auto mb-2 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs">Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
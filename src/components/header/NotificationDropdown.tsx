import { useState } from "react";
import { Bell, Mail, FileCheck, UserPlus, AlertCircle, CheckCircle } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const notifications = [
    {
      id: 1,
      type: "message",
      user: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      message: "sent you a contact message",
      subject: "Website Inquiry",
      time: "2 min ago",
      online: true
    },
    {
      id: 2,
      type: "application",
      user: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=13",
      message: "submitted an application for",
      subject: "Senior Developer Position",
      time: "15 min ago",
      online: true
    },
    {
      id: 3,
      type: "message",
      user: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=5",
      message: "sent you a contact message",
      subject: "Partnership Opportunity",
      time: "1 hr ago",
      online: true
    },
    {
      id: 4,
      type: "application",
      user: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=12",
      message: "submitted an application for",
      subject: "Marketing Manager Role",
      time: "2 hrs ago",
      online: false
    },
    {
      id: 5,
      type: "permission",
      user: "Terry Franci",
      avatar: "https://i.pravatar.cc/150?img=3",
      message: "requests permission to change",
      subject: "Project - Nganter App",
      time: "3 hrs ago",
      online: true
    },
    {
      id: 6,
      type: "message",
      user: "Lisa Anderson",
      avatar: "https://i.pravatar.cc/150?img=9",
      message: "sent you a contact message",
      subject: "Technical Support Request",
      time: "5 hrs ago",
      online: true
    },
    {
      id: 7,
      type: "application",
      user: "James Wilson",
      avatar: "https://i.pravatar.cc/150?img=14",
      message: "submitted an application for",
      subject: "UX Designer Position",
      time: "1 day ago",
      online: false
    },
    {
      id: 8,
      type: "message",
      user: "Maria Garcia",
      avatar: "https://i.pravatar.cc/150?img=26",
      message: "sent you a contact message",
      subject: "Collaboration Request",
      time: "1 day ago",
      online: true
    }
  ];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  const getNotificationIcon = (type: any) => {
    switch (type) {
      case "message":
        return <Mail className="w-3 h-3" />;
      case "application":
        return <FileCheck className="w-3 h-3" />;
      case "permission":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Bell className="w-3 h-3" />;
    }
  };

  const getNotificationBadgeColor = (type: any) => {
    switch (type) {
      case "message":
        return "bg-blue-500";
      case "application":
        return "bg-green-500";
      case "permission":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <button
          className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100"
          onClick={handleClick}
        >
          <span
            className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
              !notifying ? "hidden" : "flex"
            }`}
          >
            <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
          </span>
          <Bell className="w-5 h-5" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={closeDropdown}
            ></div>
            <div className="absolute right-0 z-50 flex flex-col w-[380px] mt-4 bg-white border border-gray-200 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h5 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h5>
                <button
                  onClick={toggleDropdown}
                  className="text-gray-500 transition hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <ul className="overflow-y-auto max-h-[480px] divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <li key={notification.id}>
                    <button
                      onClick={closeDropdown}
                      className="flex w-full gap-3 p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          width={40}
                          height={40}
                          src={notification.avatar}
                          alt={notification.user}
                          className="w-10 h-10 rounded-full"
                        />
                        <span
                          className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full text-white ${getNotificationBadgeColor(
                            notification.type
                          )}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <p className="mb-1 text-sm text-gray-500">
                          <span className="font-medium text-gray-800">
                            {notification.user}
                          </span>{" "}
                          {notification.message}{" "}
                          <span className="font-medium text-gray-800">
                            {notification.subject}
                          </span>
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="capitalize">
                            {notification.type}
                          </span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={closeDropdown}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
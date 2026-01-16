export function MessagesScreen() {
  const conversations = [
    {
      id: 1,
      name: "Sarah",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      lastMessage: "See you at the hike tomorrow!",
      time: "2h ago",
      unread: true,
    },
    {
      id: 2,
      name: "Marcus",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      lastMessage: "Thanks for joining the dinner party",
      time: "1d ago",
      unread: false,
    },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-4">
        <h1 className="text-2xl">Messages</h1>
        <p className="text-sm text-gray-600 mt-1">
          Chat with event hosts and attendees
        </p>
      </div>

      {/* Conversations */}
      <div className="divide-y divide-gray-100">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={conversation.unread ? "" : "text-gray-600"}>
                    {conversation.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {conversation.time}
                  </span>
                </div>
                <p
                  className={`text-sm truncate ${
                    conversation.unread ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg mb-2">No messages yet</h3>
          <p className="text-gray-600 text-sm max-w-sm">
            Start a conversation by joining an event or hosting one
          </p>
        </div>
      )}
    </div>
  );
}

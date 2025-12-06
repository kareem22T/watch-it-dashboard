"use client"

import { useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import {
  toggleMessageSelection,
  selectAllMessages,
  clearMessageSelection,
  deleteMultipleMessages,
} from "../../../store/contactMessagesSlice"
import { BulkActionBar } from "./bulk-action-bar"
import { Mail, Calendar } from "lucide-react"

export function ContactMessagesList() {
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.contactMessages.messages)
  const selected = useSelector((state: RootState) => state.contactMessages.selectedMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null)

  const filteredMessages = useMemo(() => {
    return messages.filter(
      (msg) =>
        msg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [messages, searchTerm])

  const allSelected = selected.size === filteredMessages.length && filteredMessages.length > 0

  const handleSelectAll = () => {
    if (allSelected) {
      dispatch(clearMessageSelection())
    } else {
      dispatch(selectAllMessages())
    }
  }

  const handleDelete = () => {
    if (selected.size > 0) {
      dispatch(deleteMultipleMessages(Array.from(selected)))
    }
  }

  return (
    <div className="space-y-4">
      {selected.size > 0 && (
        <BulkActionBar
          count={selected.size}
          onDelete={handleDelete}
          onClear={() => dispatch(clearMessageSelection())}
        />
      )}

      <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        />

        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No messages found</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div key={msg.id} className="border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3 p-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setExpandedMessage(expandedMessage === msg.id ? null : msg.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {msg.firstName} {msg.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{msg.email}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                        <Calendar className="w-3 h-3" />
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 text-sm mb-1">{msg.subject}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                  </div>
                </div>

                {expandedMessage === msg.id && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Full Message:</h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">From:</p>
                        <p className="font-medium text-gray-900">
                          {msg.firstName} {msg.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email:</p>
                        <a href={`mailto:${msg.email}`} className="text-brand-600 hover:underline">
                          {msg.email}
                        </a>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Received:</p>
                        <p className="font-medium text-gray-900">{new Date(msg.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

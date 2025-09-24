import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Mail, Calendar, User, Trash2, Eye, Reply } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminContact = () => {
  const { contacts, updateContactStatus, deleteContact } = useData();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  const handleStatusChange = (id, status) => {
    updateContactStatus(id, status);
    toast.success(`Message marked as ${status}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteContact(id);
      toast.success('Message deleted successfully!');
      if (selectedMessage === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleViewMessage = (id) => {
    setSelectedMessage(id);
    const contact = contacts.find(c => c.id === id);
    if (contact && contact.status === 'unread') {
      handleStatusChange(id, 'read');
    }
  };

  const selectedContact = contacts.find(c => c.id === selectedMessage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
        <div className="flex space-x-2">
          {['all', 'unread', 'read', 'replied'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              Messages ({filteredContacts.length})
            </h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredContacts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No messages found
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage === contact.id ? 'bg-orange-50 border-orange-200' : ''
                  }`}
                  onClick={() => handleViewMessage(contact.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contact.status === 'unread' ? 'bg-red-100 text-red-600' :
                        contact.status === 'read' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewMessage(contact.id);
                        }}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(contact.id);
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Subject:</strong> {contact.subject}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(contact.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Message Details</h3>
          </div>
          
          <div className="p-4">
            {selectedContact ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedContact.name}</h4>
                    <p className="text-sm text-gray-600">{selectedContact.email}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Subject:</h5>
                  <p className="text-gray-700">{selectedContact.subject}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Message:</h5>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Received on {new Date(selectedContact.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => handleStatusChange(selectedContact.id, 'replied')}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Reply className="h-4 w-4" />
                    <span>Mark as Replied</span>
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange(selectedContact.id, 'read')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Mark as Read</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
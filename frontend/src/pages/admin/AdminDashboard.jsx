import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, FolderOpen, Wrench, MessageSquare } from 'lucide-react';
import api from "../../api.js"

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes, teamRes, contactsRes] = await Promise.all([
          api.get('/services'),
          api.get('/projects'),
          api.get('/team'),
          api.get('/contacts'),
        ]);

        setServices(servicesRes.data);
        setProjects(projectsRes.data);
        setTeam(teamRes.data);
        setContacts(contactsRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      name: 'Total Services',
      value: services.length,
      icon: Wrench,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      name: 'Active Projects',
      value: projects.filter(p => p.status === 'In Progress').length,
      icon: FolderOpen,
      color: 'bg-green-500',
      trend: '+8%',
    },
    {
      name: 'Team Members',
      value: team.length,
      icon: Users,
      color: 'bg-purple-500',
      trend: '+2%',
    },
    {
      name: 'New Messages',
      value: contacts.filter(c => c.status === 'unread').length,
      icon: MessageSquare,
      color: 'bg-orange-500',
      trend: '+25%',
    },
  ];

  const recentProjects = projects.slice(0, 5);
  const recentContacts = contacts.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin</h2>
        <p className="text-gray-600">
          Here's what's happening with your construction business today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm text-green-600 font-medium">{stat.trend}</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h3>
          <div className="space-y-4">
            {recentProjects.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No projects yet</p>
            ) : (
              recentProjects.map(project => (
                <div key={project._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{project.title}</p>
                      <p className="text-sm text-gray-500">{project.category}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : project.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
          <div className="space-y-4">
            {recentContacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No messages yet</p>
            ) : (
              recentContacts.map(contact => (
                <div key={contact._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.subject}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'unread'
                        ? 'bg-red-100 text-red-600'
                        : contact.status === 'read'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Add Service', icon: Wrench, href: '/admin/services' },
            { name: 'New Project', icon: FolderOpen, href: '/admin/projects' },
            { name: 'Add Team Member', icon: Users, href: '/admin/team' },
            { name: 'View Messages', icon: MessageSquare, href: '/admin/contact' },
          ].map(action => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                to={action.href}
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">{action.name}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

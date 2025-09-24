import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, Save, X, Mail, Linkedin } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminTeam = () => {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      skills: data.skills ? data.skills.split('\n').filter(s => s.trim() !== '') : []
    };

    if (editingMember) {
      updateTeamMember(editingMember, formattedData);
      toast.success('Team member updated successfully!');
    } else {
      addTeamMember(formattedData);
      toast.success('Team member added successfully!');
    }
    
    handleCloseForm();
  };

  const handleEdit = (member) => {
    setEditingMember(member.id);
    setValue('name', member.name);
    setValue('position', member.position);
    setValue('image', member.image);
    setValue('bio', member.bio);
    setValue('skills', member.skills.join('\n'));
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteTeamMember(id);
      toast.success('Team member deleted successfully!');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingMember(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-200">{member.position}</p>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-600 mb-4">{member.bio}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button className="text-gray-400 hover:text-orange-500 transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-orange-500 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  {...register('position', { required: 'Position is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Job title"
                />
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  {...register('image', { required: 'Image URL is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio *
                </label>
                <textarea
                  {...register('bio', { required: 'Bio is required' })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Brief description about the team member"
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (one per line)
                </label>
                <textarea
                  {...register('skills')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Skill 1&#10;Skill 2&#10;Skill 3"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingMember ? 'Update' : 'Add'} Member</span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
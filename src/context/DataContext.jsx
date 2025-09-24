import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [services, setServices] = useState([
    {
      id: '1',
      title: 'Residential Construction',
      description: 'Custom home building and renovation services',
      icon: 'Home',
      price: '$150,000+',
      features: ['Custom Design', 'Quality Materials', 'Expert Craftsmanship', '24/7 Support']
    },
    {
      id: '2',
      title: 'Commercial Construction',
      description: 'Office buildings, retail spaces, and commercial facilities',
      icon: 'Building',
      price: '$500,000+',
      features: ['Project Management', 'Timeline Guarantee', 'Safety Compliance', 'Modern Technology']
    },
    {
      id: '3',
      title: 'Infrastructure Development',
      description: 'Roads, bridges, and public infrastructure projects',
      icon: 'HardHat',
      price: '$1,000,000+',
      features: ['Large Scale Projects', 'Government Contracts', 'Environmental Compliance', 'Expert Engineering']
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Skyline Tower',
      description: 'Modern 50-story residential tower in downtown',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Commercial',
      date: '2023-12-01',
      client: 'Metropolitan Development',
      status: 'Completed'
    },
    {
      id: '2',
      title: 'Green Valley Homes',
      description: 'Sustainable residential community with 200 homes',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Residential',
      date: '2023-11-15',
      client: 'Valley Developers',
      status: 'In Progress'
    },
    {
      id: '3',
      title: 'Highway Bridge 101',
      description: 'Major highway bridge reconstruction project',
      image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Infrastructure',
      date: '2023-10-20',
      client: 'State Department of Transportation',
      status: 'Planning'
    }
  ]);

  const [team, setTeam] = useState([
    {
      id: '1',
      name: 'John Smith',
      position: 'Project Manager',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Experienced project manager with 15+ years in construction',
      skills: ['Project Management', 'Team Leadership', 'Budget Planning', 'Quality Control']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      position: 'Senior Architect',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Award-winning architect specializing in sustainable design',
      skills: ['Architectural Design', 'CAD Software', 'Sustainable Design', 'Client Relations']
    },
    {
      id: '3',
      name: 'Mike Davis',
      position: 'Construction Supervisor',
      image: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Hands-on supervisor ensuring quality and safety standards',
      skills: ['Site Management', 'Safety Compliance', 'Quality Assurance', 'Team Coordination']
    }
  ]);

  const [contacts, setContacts] = useState([]);

  // Service functions
  const addService = (service) => {
    const newService = { ...service, id: Date.now().toString() };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id, service) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...service } : s));
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Project functions
  const addProject = (project) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id, project) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...project } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Team functions
  const addTeamMember = (member) => {
    const newMember = { ...member, id: Date.now().toString() };
    setTeam(prev => [...prev, newMember]);
  };

  const updateTeamMember = (id, member) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, ...member } : m));
  };

  const deleteTeamMember = (id) => {
    setTeam(prev => prev.filter(m => m.id !== id));
  };

  // Contact functions
  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'unread'
    };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContactStatus = (id, status) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <DataContext.Provider value={{
      services,
      projects,
      team,
      contacts,
      addService,
      updateService,
      deleteService,
      addProject,
      updateProject,
      deleteProject,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addContact,
      updateContactStatus,
      deleteContact
    }}>
      {children}
    </DataContext.Provider>
  );
};
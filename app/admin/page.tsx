'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  EyeIcon,
  TrashIcon,
  ArrowLeftIcon,
  LockClosedIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import toast from 'react-hot-toast';

interface ContactLead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

type Tab = 'contacts' | 'users' | 'settings';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [contacts, setContacts] = useState<ContactLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactLead | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/contact-api/admin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        toast.success('Logged in successfully');
      } else {
        toast.error('Invalid password');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('/contact-api/admin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_contacts' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await fetch('/contact-api/admin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_contact', id })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setContacts(contacts.filter(c => c.id !== id));
        setSelectedContact(null);
        toast.success('Contact deleted');
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-50 dark:bg-dark-900">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LockClosedIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-dark-500 mt-2">Enter password to access admin panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-dark-50 dark:bg-dark-700 rounded-lg">
            <p className="text-sm text-dark-500 text-center">
              Default password: <code className="bg-dark-200 dark:bg-dark-600 px-2 py-1 rounded">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero
        image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=60"
        title="Admin Panel"
        subtitle="Manage your website data"
        height="250px"
      />
      
      <main className="container-custom py-12">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-dark-500 hover:text-dark-900 dark:hover:text-white"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Site
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <ShieldCheckIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Admin Mode</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white dark:bg-dark-800 rounded-xl p-4 sticky top-32">
              <nav className="space-y-1">
                {[
                  { id: 'contacts', label: 'Contact Leads', icon: EnvelopeIcon, count: contacts.length },
                  { id: 'users', label: 'Users', icon: UsersIcon, count: null },
                  { id: 'settings', label: 'Settings', icon: ShieldCheckIcon, count: null },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-dark-100 dark:hover:bg-dark-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    {item.count !== null && (
                      <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            {activeTab === 'contacts' && (
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Contact Leads</h2>
                  <span className="text-sm text-dark-500">{contacts.length} total</span>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-12">
                    <EnvelopeIcon className="w-12 h-12 mx-auto text-dark-300 mb-4" />
                    <p className="text-dark-500">No contact submissions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div 
                        key={contact.id}
                        className="border border-dark-200 dark:border-dark-700 rounded-lg p-4 hover:bg-dark-50 dark:hover:bg-dark-700/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{contact.name}</h3>
                              <span className="text-xs text-dark-500 flex items-center gap-1">
                                <CalendarIcon className="w-3 h-3" />
                                {format(new Date(contact.created_at), 'MMM d, yyyy h:mm a')}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-dark-600 dark:text-dark-400">
                              <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-primary">
                                <EnvelopeIcon className="w-4 h-4" />
                                {contact.email}
                              </a>
                              {contact.phone && (
                                <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-primary">
                                  <PhoneIcon className="w-4 h-4" />
                                  {contact.phone}
                                </a>
                              )}
                            </div>
                            {contact.subject && (
                              <p className="text-sm text-primary mt-2">Subject: {contact.subject}</p>
                            )}
                            <p className="text-sm text-dark-500 mt-2 line-clamp-2">{contact.message}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => setSelectedContact(contact)}
                              className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg text-dark-500 hover:text-primary"
                              title="View Details"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteContact(contact.id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-dark-500 hover:text-red-600"
                              title="Delete"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Users</h2>
                <div className="text-center py-12">
                  <UsersIcon className="w-12 h-12 mx-auto text-dark-300 mb-4" />
                  <p className="text-dark-500">User management coming soon</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Settings</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-dark-50 dark:bg-dark-700 rounded-lg">
                    <h3 className="font-medium mb-2">Admin Password</h3>
                    <p className="text-sm text-dark-500 mb-4">Update your admin password</p>
                    <div className="flex gap-4">
                      <input
                        type="password"
                        placeholder="New password"
                        className="input-field flex-1"
                      />
                      <button className="btn-primary">Update</button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-dark-50 dark:bg-dark-700 rounded-lg">
                    <h3 className="font-medium mb-2">Site Information</h3>
                    <p className="text-sm text-dark-500">Manage your site settings</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedContact(null)}>
          <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Contact Details</h3>
              <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-dark-500">Name</label>
                <p className="font-medium">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm text-dark-500">Email</label>
                <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">{selectedContact.email}</a>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm text-dark-500">Phone</label>
                  <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">{selectedContact.phone}</a>
                </div>
              )}
              {selectedContact.subject && (
                <div>
                  <label className="text-sm text-dark-500">Subject</label>
                  <p>{selectedContact.subject}</p>
                </div>
              )}
              <div>
                <label className="text-sm text-dark-500">Message</label>
                <p className="whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div>
                <label className="text-sm text-dark-500">Submitted</label>
                <p>{format(new Date(selectedContact.created_at), 'MMMM d, yyyy h:mm a')}</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <a 
                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Contact Form Response'}`}
                className="btn-primary flex-1 text-center"
              >
                Reply via Email
              </a>
              <button 
                onClick={() => deleteContact(selectedContact.id)}
                className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

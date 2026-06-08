import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  FileSearch,
  BarChart3,
  Search,
  Plus,
  Edit3,
  Trash2,
  Download,
  ExternalLink,
  Save,
  Clock,
  MapPin,
  Check,
  X,
  FileCheck,
  UserCheck,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

import { supabase } from '../supabaseClient';

const Admin = () => {
  // Authentication states
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  // Dashboard states
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchName, setSearchName] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterExperience, setFilterExperience] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Selected Candidate for Resume Preview / Recruitment Actions
  const [selectedApp, setSelectedApp] = useState(null);
  const [notesText, setNotesText] = useState('');

  // Job Form State
  const initialJobForm = {
    title: '',
    department: '',
    salary: '',
    employmentType: 'Full Time',
    location: '',
    experience: '',
    skills: '',
    openings: 1,
    deadline: '',
    description: '',
    requirements: '',
    benefits: '',
    status: 'Active'
  };
  const [jobForm, setJobForm] = useState(initialJobForm);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobFormSuccess, setJobFormSuccess] = useState('');

  // Employees states
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  const [editEmployeeForm, setEditEmployeeForm] = useState(null);
  const [newEmployeeForm, setNewEmployeeForm] = useState({
    registration_no: '',
    name: '',
    father_name: '',
    dob: '',
    email: '',
    contact_number: '',
    role: '',
    department: '',
    start_date: '',
    alt_phone: '',
    aadhaar_no: '',
    permanent_address: '',
    current_address: '',
    account_no: '',
    ifsc_detail: '',
    salary: '',
    documents: []
  });

  // Handle Authentication Subscription
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Jobs and Applications
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all jobs from Supabase
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (jobsError) throw jobsError;

      // Fetch all applications and populate their job relations
      const { data: appsData, error: appsError } = await supabase
        .from('applications')
        .select('*, jobId:jobs(*)')
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;

      // Map snake_case database schema to camelCase expected by the React UI
      const mappedJobs = (jobsData || []).map(job => ({
        ...job,
        _id: job.id, // Keep key compatible
        employmentType: job.employment_type || job.employmentType
      }));

      const mappedApps = (appsData || []).map(app => ({
        ...app,
        _id: app.id, // Keep key compatible
        candidateName: app.candidate_name || app.candidateName,
        linkedInUrl: app.linkedin_url || app.linkedInUrl,
        portfolioUrl: app.portfolio_url || app.portfolioUrl,
        coverLetter: app.cover_letter || app.coverLetter,
        resume: app.resume_url || app.resume,
        createdAt: app.created_at || app.createdAt,
        jobId: app.jobId ? {
          ...app.jobId,
          _id: app.jobId.id,
          employmentType: app.jobId.employment_type || app.jobId.employmentType
        } : null
      }));

      setJobs(mappedJobs);
      setApplications(mappedApps);

      if (mappedApps.length > 0 && !selectedApp) {
        setSelectedApp(mappedApps[0]);
        setNotesText(mappedApps[0].notes || '');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to Supabase. Check your env keys.');
      // Local fallback for testing UI when server is loading
      setJobs([
        { _id: '1', title: 'Frontend Engineer', department: 'Engineering', salary: '$80,000 - $110,000', employmentType: 'Full Time', location: 'Remote', experience: '3+ Years', skills: 'React, Tailwind CSS, JavaScript', openings: 2, deadline: '2026-06-30', description: 'Build dynamic premium web interfaces.', status: 'Active', createdAt: new Date() },
        { _id: '2', title: 'Backend Developer', department: 'Engineering', salary: '$90,000 - $120,000', employmentType: 'Full Time', location: 'Remote', experience: '5+ Years', skills: 'Node.js, Express, MongoDB', openings: 1, deadline: '2026-07-15', description: 'Design robust backend services.', status: 'Active', createdAt: new Date() },
        { _id: '3', title: 'AI Specialist', department: 'Research', salary: '$120,000 - $160,000', employmentType: 'Full Time', location: 'Hybrid', experience: '4+ Years', skills: 'Python, PyTorch, LLMs', openings: 1, deadline: '2026-06-10', description: 'Train and optimize customized AI services.', status: 'Draft', createdAt: new Date() }
      ]);
      const mockApps = [
        { _id: 'app1', candidateName: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8901', location: 'New York', experience: '4 Years', linkedInUrl: 'https://linkedin.com/in/johndoe', portfolioUrl: 'https://johndoe.dev', coverLetter: 'I am highly interested in working at Macenza. I love AI products and high fidelity user interfaces.', resume: '/uploads/sample_resume.pdf', jobId: { _id: '1', title: 'Frontend Engineer' }, status: 'Applied', notes: 'Strong Javascript skills.', createdAt: new Date(Date.now() - 86400000) },
        { _id: 'app2', candidateName: 'Jane Smith', email: 'jane@example.com', phone: '+1 987 654 3210', location: 'San Francisco', experience: '6 Years', linkedInUrl: 'https://linkedin.com/in/janesmith', portfolioUrl: 'https://janesmith.design', coverLetter: 'Passionate about frontend and pixel perfect implementations.', resume: '/uploads/jane_resume.pdf', jobId: { _id: '1', title: 'Frontend Engineer' }, status: 'Shortlisted', notes: 'Scheduled a brief screening call.', createdAt: new Date(Date.now() - 172800000) }
      ];
      setApplications(mockApps);
      setSelectedApp(mockApps[0]);
      setNotesText(mockApps[0].notes || '');
    } finally {
      setLoading(false);
    }
  };



  const saveEmployeeSingle = async (updatedEmployee) => {
    const updatedList = employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp);
    setEmployees(updatedList);
    try {
      const { error } = await supabase
        .from('employees')
        .upsert(updatedEmployee);
      if (error) console.error('Supabase sync failed:', error.message);
    } catch (err) {
      console.error('Supabase sync exception:', err);
    }
  };

  const handleDeleteEmployee = async (empId, empName) => {
    if (!confirm(`Are you sure you want to remove employee ${empName}?`)) return;

    const updated = employees.filter(item => item.id !== empId);
    setEmployees(updated);

    if (selectedEmployee && selectedEmployee.id === empId) {
      setSelectedEmployee(null);
    }

    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', empId);
      if (error) {
        console.warn('Failed to delete employee from Supabase:', error.message);
      }
    } catch (err) {
      console.warn('Supabase delete exception:', err);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmp = {
      ...newEmployeeForm,
      id: 'emp_' + Date.now(),
      documents: []
    };
    
    const updated = [newEmp, ...employees];
    setEmployees(updated);

    setNewEmployeeForm({
      registration_no: '',
      name: '',
      father_name: '',
      dob: '',
      email: '',
      contact_number: '',
      role: '',
      department: '',
      start_date: '',
      alt_phone: '',
      aadhaar_no: '',
      permanent_address: '',
      current_address: '',
      account_no: '',
      ifsc_detail: '',
      salary: '',
      documents: []
    });

    try {
      const { error } = await supabase
        .from('employees')
        .insert(newEmp);
      if (error) {
        console.warn('Failed to insert employee into Supabase:', error.message);
      } else {
        alert('Employee profile created successfully!');
      }
    } catch (err) {
      console.warn('Supabase insert exception:', err);
    }
  };

  const handleSaveEmployeeEdit = async (e) => {
    e.preventDefault();
    if (!editEmployeeForm) return;
    
    const updated = employees.map(emp => 
      emp.id === editEmployeeForm.id ? editEmployeeForm : emp
    );
    setEmployees(updated);
    setSelectedEmployee(editEmployeeForm);
    setIsEditingEmployee(false);

    try {
      const { error } = await supabase
        .from('employees')
        .upsert(editEmployeeForm);
      if (error) {
        console.warn('Failed to update employee in Supabase:', error.message);
      } else {
        alert('Employee profile updated successfully!');
      }
    } catch (err) {
      console.warn('Supabase update exception:', err);
    }
  };

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedEmployee) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedEmployee.id}-${Date.now()}.${fileExt}`;
      let publicUrl = '';
      
      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('employee-docs')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('employee-docs')
          .getPublicUrl(fileName);
        
        publicUrl = url;
      } catch (storageErr) {
        console.warn('Supabase storage upload failed, using Object URL fallback', storageErr);
        publicUrl = URL.createObjectURL(file);
      }

      const newDoc = { name: file.name, url: publicUrl };
      const updatedDocs = [...(selectedEmployee.documents || []), newDoc];
      const updatedEmployee = { ...selectedEmployee, documents: updatedDocs };
      await saveEmployeeSingle(updatedEmployee);
      setSelectedEmployee(updatedEmployee);
      alert('Document uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload document: ' + err.message);
    }
  };

  // Load employees from Supabase
  useEffect(() => {
    if (user) {
      const loadEmployees = async () => {
        try {
          const { data, error } = await supabase
            .from('employees')
            .select('*');
          if (error) throw error;
          setEmployees(data || []);
        } catch (err) {
          console.error('Failed to load employees from database:', err.message);
          setEmployees([]);
        }
      };

      loadEmployees();
    }
  }, [user]);

  // Trigger data fetching on user login
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSignIn = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }
    setLoginError('');
    setSigningIn(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      console.error(err);
      setLoginError(err.message || 'Invalid sign-in credentials.');
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    if (!window.confirm('Are you sure you want to sign out of the Admin Portal?')) return;
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };





  // Update notesText when selectedApp changes
  useEffect(() => {
    if (selectedApp) {
      setNotesText(selectedApp.notes || '');
    }
  }, [selectedApp]);

  // Reset scroll position of active scrollable areas when active tab changes
  useEffect(() => {
    const scrollContainers = document.querySelectorAll('.overflow-y-auto');
    scrollContainers.forEach(el => el.scrollTo(0, 0));
  }, [activeTab]);

  // Handle Job Form Actions
  const handleJobFormChange = (e) => {
    const { name, value } = e.target;
    setJobForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePostJob = async (statusOverride = null) => {
    const jobData = {
      title: jobForm.title,
      department: jobForm.department,
      salary: jobForm.salary,
      employment_type: jobForm.employmentType, // snake_case DB mapping
      location: jobForm.location,
      experience: jobForm.experience,
      skills: jobForm.skills,
      openings: jobForm.openings,
      deadline: jobForm.deadline,
      description: jobForm.description,
      requirements: jobForm.requirements,
      benefits: jobForm.benefits,
      status: statusOverride || jobForm.status
    };

    try {
      if (editingJobId) {
        const { error } = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', editingJobId);
        if (error) throw error;
        setJobFormSuccess('Job updated successfully!');
      } else {
        const { error } = await supabase
          .from('jobs')
          .insert([jobData]);
        if (error) throw error;
        setJobFormSuccess('Job posted successfully!');
      }

      setJobForm(initialJobForm);
      setEditingJobId(null);
      fetchData();
      setTimeout(() => setJobFormSuccess(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    }
  };

  const handleEditJobClick = (job) => {
    setJobForm({
      title: job.title || '',
      department: job.department || '',
      salary: job.salary || '',
      employmentType: job.employmentType || 'Full Time',
      location: job.location || '',
      experience: job.experience || '',
      skills: job.skills || '',
      openings: job.openings || 1,
      deadline: job.deadline || '',
      description: job.description || '',
      requirements: job.requirements || '',
      benefits: job.benefits || '',
      status: job.status || 'Active'
    });
    setEditingJobId(job._id);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting? This cannot be undone.')) return;
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);
      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Could not delete job: ' + err.message);
    }
  };

  // Handle Application recruitment actions
  const handleUpdateApplicationStatus = async (status) => {
    if (!selectedApp) return;
    const appId = selectedApp.id || selectedApp._id;
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', appId)
        .select('*, jobId:jobs(*)')
        .single();

      if (error) throw error;

      const mapped = {
        ...data,
        _id: data.id,
        candidateName: data.candidate_name,
        linkedInUrl: data.linkedin_url,
        portfolioUrl: data.portfolio_url,
        coverLetter: data.cover_letter,
        resume: data.resume_url,
        createdAt: data.created_at || data.createdAt,
        jobId: data.jobId ? {
          ...data.jobId,
          _id: data.jobId.id,
          employmentType: data.jobId.employment_type || data.jobId.employmentType
        } : null
      };

      setApplications(prev => prev.map(a => (a.id === appId || a._id === appId) ? mapped : a));
      setSelectedApp(mapped);
    } catch (err) {
      console.error(err);
      alert('Error updating status: ' + err.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    const appId = selectedApp.id || selectedApp._id;
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ notes: notesText })
        .eq('id', appId)
        .select('*, jobId:jobs(*)')
        .single();

      if (error) throw error;

      const mapped = {
        ...data,
        _id: data.id,
        candidateName: data.candidate_name,
        linkedInUrl: data.linkedin_url,
        portfolioUrl: data.portfolio_url,
        coverLetter: data.cover_letter,
        resume: data.resume_url,
        createdAt: data.created_at || data.createdAt,
        jobId: data.jobId ? {
          ...data.jobId,
          _id: data.jobId.id,
          employmentType: data.jobId.employment_type || data.jobId.employmentType
        } : null
      };

      setApplications(prev => prev.map(a => (a.id === appId || a._id === appId) ? mapped : a));
      setSelectedApp(mapped);
      alert('Recruiter notes saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving notes: ' + err.message);
    }
  };

  const handleDownloadResume = async (e, url, candidateName) => {
    e.preventDefault();
    if (!url) return;

    const filename = candidateName
      ? `${candidateName.replace(/\s+/g, '_')}_Resume.${url.split('.').pop().split('?')[0] || 'pdf'}`
      : 'Resume.pdf';

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.warn('Direct download via fetch failed, trying query parameter fallback', error);
      if (url.includes('supabase.co')) {
        const downloadUrl = url.includes('?') ? `${url}&download=` : `${url}?download=`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_self';
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        window.open(url, '_blank');
      }
    }
  };

  // Filter Applications
  const filteredApplications = applications.filter(app => {
    // Name / Email search
    const matchesName = app.candidateName.toLowerCase().includes(searchName.toLowerCase()) ||
      app.email.toLowerCase().includes(searchName.toLowerCase());

    // Location Filter
    const matchesLocation = !filterLocation || app.location.toLowerCase().includes(filterLocation.toLowerCase());

    // Position Filter
    const matchesPosition = !filterPosition || (app.jobId && app.jobId.title === filterPosition);

    // Experience Filter
    const matchesExperience = !filterExperience || app.experience.toLowerCase().includes(filterExperience.toLowerCase());

    // Type Filter
    const matchesType = !filterType || (app.jobId && app.jobId.employmentType === filterType);

    // Date Filter (within X days)
    let matchesDate = true;
    if (filterDate) {
      const appDate = new Date(app.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - appDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      matchesDate = diffDays <= parseInt(filterDate);
    }

    return matchesName && matchesLocation && matchesPosition && matchesExperience && matchesType && matchesDate;
  });

  // Calculate Overview Stats
  const totalJobs = jobs.length;
  const totalApps = applications.length;
  const newApps = applications.filter(a => a.status === 'Applied').length;
  const shortlistedApps = applications.filter(a => a.status === 'Shortlisted').length;
  const scheduledApps = applications.filter(a => a.status === 'Interview Scheduled').length;
  const rejectedApps = applications.filter(a => a.status === 'Rejected').length;

  // Render Stats Card
  const renderStatsCard = (title, count, icon, subtext) => (
    <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-6 rounded-[2rem] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-black/60 text-sm font-semibold tracking-wider uppercase mb-1">{title}</p>
          <h3 className="text-4xl font-black text-black">{count}</h3>
        </div>
        <div className="p-3 bg-[#DBEAFE] rounded-2xl text-black">
          {icon}
        </div>
      </div>
      <span className="text-black/80 font-medium text-sm flex items-center gap-1">
        <span className="text-primary font-bold">{subtext}</span> overall activity
      </span>
    </div>
  );

  if (authChecking) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold tracking-widest text-black/40 uppercase animate-pulse">Verifying Credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center font-sans relative overflow-hidden px-6">
        {/* Futuristic glowing ambient background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-10 relative z-10">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl">M</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-black uppercase">MACENZA ADMIN</span>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md bg-[#EFF6FF]/60 backdrop-blur-xl border border-[#BFDBFE]/60 p-10 rounded-[3rem] shadow-2xl relative z-10 hover:border-primary/20 transition-all duration-500 group">
          <div className="mb-8">
            <h3 className="text-3xl font-black text-black mb-2 tracking-tight">System Sign In</h3>
            <p className="text-sm text-black/55 font-medium leading-relaxed">Enter your administrator credentials to securely connect to the recruitment pipelines.</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 font-semibold rounded-2xl text-xs flex items-center gap-2.5 animate-shake">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
              {loginError}
            </div>
          )}

          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-black/60 tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@macenza.com"
                className="bg-white border border-[#BFDBFE] p-4 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-black/60 tracking-wider">Security Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="bg-white border border-[#BFDBFE] p-4 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={signingIn}
              className="w-full py-4 mt-2 bg-primary text-white rounded-full font-black text-sm tracking-wider uppercase shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all duration-300 hover:shadow-2xl active:scale-98 disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {signingIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  Enter Dashboard ➔
                </>
              )}
            </button>
          </form>

          {/* Database Info Tip */}
          <div className="mt-8 pt-6 border-t border-[#BFDBFE]/60 flex items-center gap-3">
            <div className="p-2 bg-[#DBEAFE] rounded-xl text-primary">
              🔒
            </div>
            <p className="text-[10px] font-bold text-black/40 leading-normal uppercase">
              Secure authentication via Macenza database firewall.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#FFFFFF] min-h-screen font-sans text-black relative select-none">
      {/* Sidebar */}
      <aside className="w-64 bg-[#EFF6FF] border-r border-[#BFDBFE] flex flex-col justify-between h-screen sticky top-0 py-8 px-6 z-20">
        <div className="flex flex-col gap-12">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 pl-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-[#EFF6FF] font-black text-lg">M</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-black uppercase">MACENZA ADMIN</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2">
            {[
              { id: 'Dashboard', icon: "📊" },
              { id: 'Jobs', icon: "💼" },
              { id: 'Applications', icon: "📋" },
              { id: 'Resume Manager', icon: "🔍" },
              { id: 'Employees', icon: "👥" },
              { id: 'Analytics', icon: "📈" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 text-black/70 hover:text-black hover:bg-[#DBEAFE]/50 hover:pl-5 active:scale-95 group whitespace-nowrap"
                style={activeTab === item.id ? { backgroundColor: '#DBEAFE', color: 'black', paddingLeft: '20px', borderLeft: '4px solid #2563eb' } : {}}
              >
                <span className="text-xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                {item.id}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-3 py-4 bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 active:scale-95"
          >
            <span>🚪</span> Sign Out Admin
          </button>

          {/* Info panel at bottom */}
          <div className="bg-[#DBEAFE] rounded-3xl p-5 border border-[#BFDBFE]">
            <p className="text-xs font-bold text-black uppercase mb-1">Live Database Connection</p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-sm font-semibold text-black">Active Server Sync</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-[#BFDBFE] px-10 flex items-center justify-between z-10">
          <h2 className="text-2xl font-black tracking-tight text-black flex items-center gap-2">
            MACENZA CAREERS HUB <span className="text-black/40 font-normal">|</span> <span className="text-primary italic text-lg font-bold">{activeTab}</span>
          </h2>
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-black/60 bg-[#EFF6FF] border border-[#BFDBFE] px-4 py-2 rounded-full">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Work Area */}
        <div className="flex-1 p-10 bg-white overflow-y-auto" data-lenis-prevent>
          {error && (
            <div className="bg-[#EFF6FF] border border-amber-300 p-5 rounded-2xl mb-8 flex items-center gap-3 text-amber-950 font-bold text-sm">
              <span className="w-3 h-3 bg-amber-500 rounded-full animate-ping"></span>
              {error} - Fallback mock-data environment activated for premium demonstration.
            </div>
          )}

          {/* Tab 1: Dashboard Overview */}
          {activeTab === 'Dashboard' && (
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderStatsCard('Total Jobs Posted', totalJobs, <Briefcase className="w-6 h-6" />, 'Active recruitment')}
                {renderStatsCard('Total Applications', totalApps, <Users className="w-6 h-6" />, 'High volumes')}
                {renderStatsCard('New Applications', newApps, <FileText className="w-6 h-6 text-indigo-700" />, 'Action required')}
                {renderStatsCard('Shortlisted', shortlistedApps, <UserCheck className="w-6 h-6 text-emerald-700" />, 'Highly qualified')}
                {renderStatsCard('Interviews Scheduled', scheduledApps, <Clock className="w-6 h-6 text-amber-700" />, 'Calendar alignment')}
                {renderStatsCard('Rejected Candidates', rejectedApps, <X className="w-6 h-6 text-rose-700" />, 'Closed pipelines')}
              </div>

              {/* Quick Summary Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                {/* Active Jobs Box */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-8 rounded-[3rem] flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-black text-black">Active Hiring Pipelines</h4>
                    <button onClick={() => setActiveTab('Jobs')} className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                      Manage Jobs <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
                    {jobs.map(job => (
                      <div key={job._id} className="p-5 bg-white border border-[#BFDBFE] rounded-2xl flex justify-between items-center hover:scale-[1.01] transition-transform">
                        <div>
                          <h5 className="font-bold text-black text-base">{job.title}</h5>
                          <span className="text-xs text-black/50 font-semibold">{job.department} &bull; {job.location}</span>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                          {job.status}
                        </span>
                      </div>
                    ))}
                    {jobs.length === 0 && <p className="text-sm text-black/50 italic">No job postings recorded.</p>}
                  </div>
                </div>

                {/* Recent Candidates Box */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-8 rounded-[3rem] flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-black text-black">Recent Candidates</h4>
                    <button onClick={() => setActiveTab('Applications')} className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                      View Applications <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
                    {applications.slice(0, 4).map(app => (
                      <div
                        key={app._id}
                        onClick={() => {
                          setSelectedApp(app);
                          setActiveTab('Resume Manager');
                        }}
                        className="p-5 bg-white border border-[#BFDBFE] rounded-2xl flex justify-between items-center cursor-pointer hover:border-primary/40 hover:scale-[1.01] transition-all"
                      >
                        <div>
                          <h5 className="font-bold text-black text-base">{app.candidateName}</h5>
                          <span className="text-xs text-black/50 font-semibold">Applied for: {app.jobId ? app.jobId.title : 'General Placement'}</span>
                        </div>
                        <span className="px-4 py-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-full text-xs font-black uppercase text-black">
                          {app.status}
                        </span>
                      </div>
                    ))}
                    {applications.length === 0 && <p className="text-sm text-black/50 italic">No applications submitted yet.</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Job Posting CRUD Manager */}
          {activeTab === 'Jobs' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch h-[calc(100vh-200px)]">
              {/* Left Column: Form to create/edit jobs */}
              <div data-lenis-prevent className="xl:col-span-5 bg-[#EFF6FF] border border-[#BFDBFE] p-8 rounded-[3rem] flex flex-col gap-6 overflow-y-auto">
                <h4 className="text-2xl font-black text-black">
                  {editingJobId ? 'Edit Job Posting' : 'Create New Job'}
                </h4>
                {jobFormSuccess && (
                  <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold rounded-2xl text-sm flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-700" /> {jobFormSuccess}
                  </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Job Title</label>
                      <input
                        type="text"
                        name="title"
                        value={jobForm.title}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                        required
                        placeholder="e.g. Frontend Engineer"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={jobForm.department}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                        required
                        placeholder="e.g. Engineering"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Salary Range</label>
                      <input
                        type="text"
                        name="salary"
                        value={jobForm.salary}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                        placeholder="e.g. $80k - $100k"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Employment Type</label>
                      <select
                        name="employmentType"
                        value={jobForm.employmentType}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={jobForm.location}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                        required
                        placeholder="e.g. Remote / Hybrid"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Experience Required</label>
                      <input
                        type="text"
                        name="experience"
                        value={jobForm.experience}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                        placeholder="e.g. 3+ Years"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Skills Required (Comma separated)</label>
                      <input
                        type="text"
                        name="skills"
                        value={jobForm.skills}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                        placeholder="React, CSS, Node"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Number of Openings</label>
                      <input
                        type="number"
                        name="openings"
                        value={jobForm.openings}
                        onChange={handleJobFormChange}
                        min="1"
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Application Deadline</label>
                      <input
                        type="date"
                        name="deadline"
                        value={jobForm.deadline}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black uppercase text-black/60">Status</label>
                      <select
                        name="status"
                        value={jobForm.status}
                        onChange={handleJobFormChange}
                        className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary"
                      >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase text-black/60">Job Description</label>
                    <textarea
                      name="description"
                      value={jobForm.description}
                      onChange={handleJobFormChange}
                      rows="3"
                      className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary resize-none"
                      required
                      placeholder="Enter detailed job overview..."
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase text-black/60">Responsibilities (Line separated)</label>
                    <textarea
                      name="requirements"
                      value={jobForm.requirements}
                      onChange={handleJobFormChange}
                      rows="3"
                      className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary resize-none"
                      placeholder="e.g. Design sleek components&#10;Implement API routers"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black uppercase text-black/60">Skills & Requirements</label>
                    <textarea
                      name="benefits"
                      value={jobForm.benefits}
                      onChange={handleJobFormChange}
                      rows="3"
                      className="bg-white border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-sm outline-none focus:border-primary resize-none"
                      placeholder="e.g. Strong React understanding&#10;Good team collaboration"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2 mt-4">
                    {editingJobId ? (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handlePostJob()}
                          className="flex-1 bg-[#DBEAFE] border border-[#BFDBFE] py-3 rounded-xl text-black font-bold text-sm tracking-wider uppercase hover:bg-primary/20 active:scale-95 transition-all"
                        >
                          Update Job
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingJobId(null);
                            setJobForm(initialJobForm);
                          }}
                          className="bg-[#EFF6FF] border border-[#BFDBFE] px-5 py-3 rounded-xl text-black font-bold text-sm hover:bg-[#DBEAFE] active:scale-95 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handlePostJob('Active')}
                          className="flex-1 bg-[#DBEAFE] border border-[#BFDBFE] py-3 rounded-xl text-black font-bold text-sm tracking-wider uppercase hover:bg-primary/20 active:scale-95 transition-all"
                        >
                          Post Job
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePostJob('Draft')}
                          className="bg-[#EFF6FF] border border-[#BFDBFE] px-5 py-3 rounded-xl text-black font-bold text-sm hover:bg-[#DBEAFE] active:scale-95 transition-all"
                        >
                          Save Draft
                        </button>
                      </div>
                    )}
                    {editingJobId && (
                      <button
                        type="button"
                        onClick={() => handleDeleteJob(editingJobId)}
                        className="w-full bg-rose-100 border border-rose-300 py-3 rounded-xl text-rose-950 font-bold text-sm tracking-wider uppercase hover:bg-rose-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Job Posting
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: List of posted jobs */}
              <div data-lenis-prevent className="xl:col-span-7 bg-[#EFF6FF] border border-[#BFDBFE] p-8 rounded-[3rem] flex flex-col gap-6 overflow-y-auto">
                <h4 className="text-2xl font-black text-black">Active Postings List</h4>
                <div className="flex flex-col gap-4">
                  {jobs.map(job => (
                    <div
                      key={job._id}
                      className={`p-6 bg-white border rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:shadow-md transition-shadow ${editingJobId === job._id ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-[#BFDBFE]'
                        }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <h5 className="text-xl font-bold text-black">{job.title}</h5>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                            {job.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-black/50">{job.department} &bull; {job.location} &bull; {job.employmentType}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.skills && job.skills.split(',').map((skill, index) => (
                            <span key={index} className="text-xs bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-1 rounded-full font-bold text-black">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => handleEditJobClick(job)}
                          className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-xl text-black transition-colors"
                          title="Edit Job"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="p-3 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl text-rose-800 transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {jobs.length === 0 && <p className="text-sm text-black/50 italic text-center p-8 bg-white border border-[#BFDBFE] rounded-[2rem]">No job postings found. Create one using the form on the left.</p>}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Candidate Applications & Filters */}
          {activeTab === 'Applications' && (
            <div className="flex flex-col gap-8">
              {/* Filtering Suite */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-8 rounded-[3rem] flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#BFDBFE] pb-4">
                  <h4 className="text-xl font-black text-black">Structured Resume Filtering</h4>
                  <button
                    onClick={() => {
                      setSearchName('');
                      setFilterLocation('');
                      setFilterPosition('');
                      setFilterExperience('');
                      setFilterType('');
                      setFilterDate('');
                    }}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {/* Search by Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60">Candidate Name / Email</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full bg-white border border-[#BFDBFE] pl-9 pr-3 py-2.5 rounded-xl text-black font-semibold text-xs outline-none focus:border-primary"
                        placeholder="Search..."
                      />
                      <Search className="w-4 h-4 text-black/40 absolute left-3 top-3" />
                    </div>
                  </div>

                  {/* Filter by Location */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60">Location</label>
                    <input
                      type="text"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="bg-white border border-[#BFDBFE] px-3 py-2.5 rounded-xl text-black font-semibold text-xs outline-none focus:border-primary"
                      placeholder="e.g. Remote"
                    />
                  </div>

                  {/* Filter by Position */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60">Position</label>
                    <select
                      value={filterPosition}
                      onChange={(e) => setFilterPosition(e.target.value)}
                      className="bg-white border border-[#BFDBFE] px-3 py-2.5 rounded-xl text-black font-semibold text-xs outline-none focus:border-primary"
                    >
                      <option value="">All Positions</option>
                      {[...new Set(jobs.map(j => j.title))].map(title => (
                        <option key={title} value={title}>{title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Filter by Experience */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60">Experience</label>
                    <input
                      type="text"
                      value={filterExperience}
                      onChange={(e) => setFilterExperience(e.target.value)}
                      className="bg-white border border-[#BFDBFE] px-3 py-2.5 rounded-xl text-black font-semibold text-xs outline-none focus:border-primary"
                      placeholder="e.g. 4 Years"
                    />
                  </div>

                  {/* Filter by Employment Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60">Employment Type</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="bg-white border border-[#BFDBFE] px-3 py-2.5 rounded-xl text-black font-semibold text-xs outline-none focus:border-primary"
                    >
                      <option value="">All Types</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  {/* Filter by Application Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60">Applied Date</label>
                    <select
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="bg-white border border-[#BFDBFE] px-3 py-2.5 rounded-xl text-black font-semibold text-xs outline-none focus:border-primary"
                    >
                      <option value="">Any Time</option>
                      <option value="1">Last 24 Hours</option>
                      <option value="3">Last 3 Days</option>
                      <option value="7">Last Week</option>
                      <option value="30">Last Month</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] overflow-hidden">
                <div className="px-8 py-6 border-b border-[#BFDBFE] flex justify-between items-center bg-white">
                  <h4 className="font-black text-xl text-black">Applications Submissions ({filteredApplications.length})</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#BFDBFE] text-black bg-[#DBEAFE] font-bold text-xs uppercase tracking-wider">
                        <th className="px-8 py-4">Candidate</th>
                        <th className="px-6 py-4">Job Applied</th>
                        <th className="px-6 py-4">Experience</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Applied Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#BFDBFE] bg-white">
                      {filteredApplications.map(app => (
                        <tr key={app._id} className="hover:bg-[#EFF6FF]/60 transition-colors text-sm font-semibold">
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                              <span className="text-black font-black text-base">{app.candidateName}</span>
                              <span className="text-xs text-black/50">{app.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-black">
                            {app.jobId ? app.jobId.title : 'General Placement'}
                          </td>
                          <td className="px-6 py-5 text-black">{app.experience}</td>
                          <td className="px-6 py-5 text-black">{app.location || 'Remote'}</td>
                          <td className="px-6 py-5 text-black/50">
                            {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${app.status === 'Selected' ? 'bg-emerald-100 text-emerald-800' :
                              app.status === 'Shortlisted' ? 'bg-indigo-100 text-indigo-800' :
                                app.status === 'Interview Scheduled' ? 'bg-amber-100 text-amber-800' :
                                  app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button
                              onClick={() => {
                                setSelectedApp(app);
                                setActiveTab('Resume Manager');
                              }}
                              className="px-4 py-2 bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-xl text-black font-bold text-xs tracking-wider transition-colors inline-flex items-center gap-1.5"
                            >
                              Review <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredApplications.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center py-12 text-black/40 italic">
                            No candidate applications match selected filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Resume Manager & Preview Panel */}
          {activeTab === 'Resume Manager' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch h-[calc(100vh-200px)]">
              {/* Candidates Side Drawer List */}
              <div data-lenis-prevent className="xl:col-span-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-6 flex flex-col gap-4 overflow-y-auto">
                <h4 className="text-xl font-black text-black mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Active Pipeline ({applications.length})
                </h4>
                <div className="flex flex-col gap-3">
                  {applications.map(app => (
                    <div
                      key={app._id}
                      onClick={() => {
                        setSelectedApp(app);
                        setNotesText(app.notes || '');
                      }}
                      className={`p-5 rounded-[2rem] border cursor-pointer transition-all duration-300 ${selectedApp && selectedApp._id === app._id
                        ? 'bg-white border-primary shadow-lg ring-2 ring-primary/20 scale-[1.01]'
                        : 'bg-white border-[#BFDBFE] hover:border-primary/40'
                        }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h5 className="font-bold text-black text-base">{app.candidateName}</h5>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${app.status === 'Selected' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Shortlisted' ? 'bg-indigo-100 text-indigo-800' :
                            app.status === 'Interview Scheduled' ? 'bg-amber-100 text-amber-800' :
                              app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-black/50 mb-2 truncate">
                        {app.jobId ? app.jobId.title : 'General Placement'}
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-black/40 font-bold uppercase">
                        <span>{app.experience} Exp</span>
                        <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {applications.length === 0 && <p className="text-sm text-black/50 italic text-center p-8 bg-white border border-[#BFDBFE] rounded-2xl">No applications recorded.</p>}
                </div>
              </div>

              {/* Recruitment Review Panel & Resume Viewer */}
              <div data-lenis-prevent className="xl:col-span-8 bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-8 flex flex-col gap-6 overflow-y-auto">
                {selectedApp ? (
                  <div className="flex flex-col gap-6 w-full">
                    {/* Header Info */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-[#BFDBFE] pb-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4 flex-wrap">
                          <h3 className="text-3xl font-black text-black">{selectedApp.candidateName}</h3>
                          <span className="px-4 py-1.5 bg-[#DBEAFE] border border-[#BFDBFE] rounded-full text-xs font-black uppercase tracking-wider text-black">
                            {selectedApp.status}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-black/60">
                          Applied for: <span className="text-primary font-bold">{selectedApp.jobId ? selectedApp.jobId.title : 'General Placement'}</span> &bull; {selectedApp.experience} experience
                        </p>
                      </div>

                      {/* Download / Social Links */}
                      <div className="flex items-center gap-3">
                        {selectedApp.linkedInUrl && (
                          <a
                            href={selectedApp.linkedInUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-white border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-xl text-black transition-colors"
                            title="LinkedIn Profile"
                          >
                            <Users className="w-4 h-4" />
                          </a>
                        )}
                        {selectedApp.portfolioUrl && (
                          <a
                            href={selectedApp.portfolioUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-white border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-xl text-black transition-colors"
                            title="Portfolio Link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={selectedApp.resume}
                          onClick={(e) => handleDownloadResume(e, selectedApp.resume, selectedApp.candidateName)}
                          className="px-5 py-3 bg-[#DBEAFE] border border-[#BFDBFE] hover:bg-primary/20 rounded-xl text-black font-bold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-all active:scale-95"
                        >
                          <Download className="w-4 h-4" /> Download Resume
                        </a>
                      </div>
                    </div>

                    {/* Content Split: Left - Details/Notes, Right - Embed Resume Viewer */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch min-h-[450px]">
                      {/* Details, Cover Letter, Recruiter Notes */}
                      <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-white border border-[#BFDBFE] p-6 rounded-3xl flex flex-col gap-4">
                          <h5 className="font-black text-black text-sm uppercase tracking-wider border-b border-[#BFDBFE] pb-2">Profile Overview</h5>
                          <div className="flex flex-col gap-2.5 text-sm font-semibold">
                            <div className="flex justify-between">
                              <span className="text-black/50">Email:</span>
                              <span className="text-black">{selectedApp.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-black/50">Phone:</span>
                              <span className="text-black">{selectedApp.phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-black/50">Location:</span>
                              <span className="text-black">{selectedApp.location || 'Remote'}</span>
                            </div>
                          </div>
                        </div>

                        {selectedApp.coverLetter && (
                          <div className="bg-white border border-[#BFDBFE] p-6 rounded-3xl flex flex-col gap-3 max-h-[200px] overflow-y-auto">
                            <h5 className="font-black text-black text-sm uppercase tracking-wider border-b border-[#BFDBFE] pb-2">Cover Letter</h5>
                            <p className="text-xs text-black/70 leading-relaxed italic">"{selectedApp.coverLetter}"</p>
                          </div>
                        )}

                        {/* Recruiter Notes Block */}
                        <div className="bg-white border border-[#BFDBFE] p-6 rounded-3xl flex flex-col gap-4 flex-1">
                          <h5 className="font-black text-black text-sm uppercase tracking-wider border-b border-[#BFDBFE] pb-2">Recruiter Evaluation Notes</h5>
                          <textarea
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            rows="4"
                            className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-xl text-black font-semibold text-xs outline-none focus:border-primary resize-none flex-1"
                            placeholder="Add evaluation summary or interview feedback..."
                          />
                          <button
                            onClick={handleSaveNotes}
                            className="bg-[#DBEAFE] border border-[#BFDBFE] hover:bg-primary/20 py-2.5 rounded-xl text-black font-bold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all active:scale-95"
                          >
                            <Save className="w-3.5 h-3.5" /> Save Evaluation Notes
                          </button>
                        </div>
                      </div>

                      {/* Interactive PDF/Document Resume Preview */}
                      <div className="lg:col-span-7 bg-white border border-[#BFDBFE] rounded-3xl overflow-hidden flex flex-col items-stretch shadow-inner relative">
                        <div className="bg-[#EFF6FF] border-b border-[#BFDBFE] px-5 py-3 flex justify-between items-center">
                          <span className="text-xs font-black uppercase text-black">Interactive Resume Viewer</span>
                          <span className="text-[10px] bg-emerald-100 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded font-black uppercase">Live Embed</span>
                        </div>
                        <div className="flex-1 w-full bg-slate-100 relative min-h-[350px]">
                          {/* Attempt to preview PDF. Fallback dynamically to card if not PDF or offline */}
                          {selectedApp.resume && selectedApp.resume.toLowerCase().endsWith('.pdf') ? (
                            <iframe
                              src={`${selectedApp.resume}#toolbar=0`}
                              className="w-full h-full border-none absolute inset-0"
                              title="Resume Preview PDF"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white">
                              <div className="w-16 h-16 bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl flex items-center justify-center text-primary mb-4 glow-blue">
                                <FileSearch className="w-8 h-8" />
                              </div>
                              <h6 className="font-black text-black text-lg mb-2">Resume Preview unavailable</h6>
                              <p className="text-xs text-black/50 max-w-[250px] mb-6">
                                Docx formats or local development assets are safely secured. You can read, view, or download the full document here.
                              </p>
                              <a
                                href={selectedApp.resume}
                                onClick={(e) => handleDownloadResume(e, selectedApp.resume, selectedApp.candidateName)}
                                className="px-6 py-3 bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-xl text-black font-bold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-all"
                              >
                                <Download className="w-4 h-4" /> Download Resume Document
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Candidate Management Action Footer */}
                    <div className="bg-white border border-[#BFDBFE] p-6 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2 shadow-sm">
                      <span className="text-xs font-black uppercase text-black/60">Update Recruitment Stage:</span>
                      <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        <button
                          onClick={() => handleUpdateApplicationStatus('Shortlisted')}
                          className="flex-1 md:flex-initial px-5 py-3 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-xl text-indigo-900 font-bold text-xs tracking-wider uppercase transition-colors"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => handleUpdateApplicationStatus('Interview Scheduled')}
                          className="flex-1 md:flex-initial px-5 py-3 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-xl text-amber-900 font-bold text-xs tracking-wider uppercase transition-colors"
                        >
                          Schedule Interview
                        </button>
                        <button
                          onClick={() => handleUpdateApplicationStatus('Selected')}
                          className="flex-1 md:flex-initial px-5 py-3 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl text-emerald-900 font-bold text-xs tracking-wider uppercase transition-colors"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => handleUpdateApplicationStatus('Rejected')}
                          className="flex-1 md:flex-initial px-5 py-3 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl text-rose-900 font-bold text-xs tracking-wider uppercase transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <FileSearch className="w-12 h-12 text-black/40 mb-3" />
                    <p className="text-black/50 italic">No candidates selected for review.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Employees Management */}
          {activeTab === 'Employees' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch h-[calc(100vh-200px)]">
              {/* Left Side: Add Employee Form */}
              <div data-lenis-prevent className="xl:col-span-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-8 flex flex-col gap-6 overflow-y-auto">
                <div>
                  <h4 className="text-2xl font-black text-black tracking-tight">Add Employee</h4>
                  <p className="text-xs font-semibold text-black/45 uppercase tracking-wide mt-1">Create a new company record</p>
                </div>

                <form onSubmit={handleAddEmployee} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Registration No.</label>
                    <input
                      type="text"
                      value={newEmployeeForm.registration_no}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, registration_no: e.target.value})}
                      placeholder="e.g. EMP-003"
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newEmployeeForm.name}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Father's Name</label>
                    <input
                      type="text"
                      value={newEmployeeForm.father_name}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, father_name: e.target.value})}
                      placeholder="e.g. Richard Doe"
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Date of Birth</label>
                    <input
                      type="date"
                      value={newEmployeeForm.dob}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, dob: e.target.value})}
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Email ID</label>
                    <input
                      type="email"
                      value={newEmployeeForm.email}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, email: e.target.value})}
                      placeholder="e.g. john@macenza.com"
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Contact Number</label>
                    <input
                      type="text"
                      value={newEmployeeForm.contact_number}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, contact_number: e.target.value})}
                      placeholder="e.g. +1 555 0103"
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Role / Designation</label>
                    <input
                      type="text"
                      value={newEmployeeForm.role}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, role: e.target.value})}
                      placeholder="e.g. Fullstack Engineer"
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Department</label>
                    <input
                      type="text"
                      value={newEmployeeForm.department}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, department: e.target.value})}
                      placeholder="e.g. Engineering"
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Start Date</label>
                    <input
                      type="date"
                      value={newEmployeeForm.start_date}
                      onChange={(e) => setNewEmployeeForm({...newEmployeeForm, start_date: e.target.value})}
                      className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-primary text-white rounded-full font-black text-xs tracking-wider uppercase shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Create Employee Profile
                  </button>
                </form>
              </div>

              {/* Right Side: Employees List */}
              <div data-lenis-prevent className="xl:col-span-8 bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-8 flex flex-col gap-6 overflow-y-auto">
                <h4 className="text-xl font-black text-black flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Employees ({employees.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employees.map(emp => (
                    <div
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setEditEmployeeForm(emp);
                      }}
                      className="bg-white border border-[#BFDBFE] rounded-[2rem] p-5 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
                    >
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-black text-lg shadow-sm">
                            {emp.name ? emp.name.charAt(0).toUpperCase() : 'E'}
                          </div>
                          <div>
                            <h5 className="font-bold text-black text-base">{emp.name}</h5>
                            <p className="text-xs font-semibold text-black/50">{emp.role} • {emp.department}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEmployee(emp.id, emp.name);
                          }}
                          className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl transition-colors active:scale-90"
                          title="Delete Employee"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-black/50 font-bold uppercase mt-2 pt-2 border-t border-[#BFDBFE]/40">
                        <MapPin className="w-3.5 h-3.5 text-black/40" />
                        <span className="truncate">{emp.permanent_address || 'Address Not Provided'}</span>
                      </div>
                    </div>
                  ))}
                  {employees.length === 0 && (
                    <div className="col-span-2 p-8 text-center text-black/50 italic bg-white border border-[#BFDBFE] rounded-[2rem]">
                      No employee records found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Analytics */}
          {activeTab === 'Analytics' && (
            <div className="flex flex-col gap-8">
              {/* Analytics Top widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-6 rounded-[2rem] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase text-black/50">Application Volume</span>
                    <h4 className="text-3xl font-black text-black mt-1">+{applications.length * 15}%</h4>
                    <span className="text-xs font-semibold text-black/70 mt-1 block">Month-over-month increase</span>
                  </div>
                  <div className="p-4 bg-[#DBEAFE] rounded-2xl text-black">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>

                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-6 rounded-[2rem] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase text-black/50">Time-to-Hire Avg</span>
                    <h4 className="text-3xl font-black text-black mt-1">18 Days</h4>
                    <span className="text-xs font-semibold text-black/70 mt-1 block">Industry average is 32</span>
                  </div>
                  <div className="p-4 bg-[#DBEAFE] rounded-2xl text-black">
                    <Clock className="w-8 h-8" />
                  </div>
                </div>

                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-6 rounded-[2rem] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black uppercase text-black/50">Conversion Rate</span>
                    <h4 className="text-3xl font-black text-black mt-1">{totalApps > 0 ? ((shortlistedApps / totalApps) * 100).toFixed(0) : 0}%</h4>
                    <span className="text-xs font-semibold text-black/70 mt-1 block">Shortlisted from submissions</span>
                  </div>
                  <div className="p-4 bg-[#DBEAFE] rounded-2xl text-black">
                    <UserCheck className="w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Department Demand Visualizations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Department Demand Chart */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-8 rounded-[3rem] flex flex-col gap-6">
                  <h4 className="text-xl font-black text-black">Open Postings by Department</h4>
                  <div className="flex flex-col gap-5">
                    {['Engineering', 'Research', 'Marketing', 'Product'].map((dept, idx) => {
                      const count = jobs.filter(j => j.department && j.department.toLowerCase() === dept.toLowerCase()).length;
                      const percentage = jobs.length > 0 ? (count / jobs.length) * 100 : 0;
                      return (
                        <div key={idx} className="flex flex-col gap-2">
                          <div className="flex justify-between text-sm font-semibold">
                            <span className="text-black">{dept}</span>
                            <span className="text-black/60">{count} active roles ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-[#DBEAFE] h-4 rounded-full overflow-hidden border border-[#BFDBFE]">
                            <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Candidate Funnel Bar list */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-8 rounded-[3rem] flex flex-col gap-6">
                  <h4 className="text-xl font-black text-black">Candidate Recruitment Funnel</h4>
                  <div className="flex flex-col gap-4">
                    {[
                      { status: 'Applied', count: newApps, percentage: totalApps > 0 ? (newApps / totalApps) * 100 : 0, color: 'bg-blue-600' },
                      { status: 'Shortlisted', count: shortlistedApps, percentage: totalApps > 0 ? (shortlistedApps / totalApps) * 100 : 0, color: 'bg-indigo-600' },
                      { status: 'Interview Scheduled', count: scheduledApps, percentage: totalApps > 0 ? (scheduledApps / totalApps) * 100 : 0, color: 'bg-amber-600' },
                      { status: 'Selected', count: applications.filter(a => a.status === 'Selected').length, percentage: totalApps > 0 ? (applications.filter(a => a.status === 'Selected').length / totalApps) * 100 : 0, color: 'bg-emerald-600' },
                      { status: 'Rejected', count: rejectedApps, percentage: totalApps > 0 ? (rejectedApps / totalApps) * 100 : 0, color: 'bg-rose-600' }
                    ].map((stage, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <span className="w-36 text-xs font-black uppercase text-black/70 truncate">{stage.status}</span>
                        <div className="flex-1 bg-[#DBEAFE] h-5 rounded-full overflow-hidden border border-[#BFDBFE] relative">
                          <div className={`h-full rounded-full transition-all duration-1000 ${stage.color}`} style={{ width: `${stage.percentage}%` }}></div>
                          <span className="absolute inset-0 flex items-center pl-3 text-[10px] font-black text-black select-none">
                            {stage.count} candidates ({stage.percentage.toFixed(0)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Employee Details Modal */}
          {selectedEmployee && !isEditingEmployee && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div data-lenis-prevent className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-full flex items-center justify-center text-black font-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-2xl font-black text-black mb-6">Employee Details</h3>

                {/* Profile Header */}
                <div className="bg-white border border-[#BFDBFE] rounded-[2rem] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-black text-2xl shadow-md">
                      {selectedEmployee.name ? selectedEmployee.name.charAt(0).toUpperCase() : 'E'}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-black">{selectedEmployee.name}</h4>
                      <p className="text-sm font-semibold text-black/55">{selectedEmployee.role} in {selectedEmployee.department}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditEmployeeForm(selectedEmployee);
                      setIsEditingEmployee(true);
                    }}
                    className="px-5 py-2.5 bg-white border border-[#BFDBFE] hover:bg-[#EFF6FF] rounded-xl text-black font-bold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-all active:scale-95"
                  >
                    <Edit3 className="w-4 h-4 text-primary" /> Edit Profile
                  </button>
                </div>

                {/* Information Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Personal Details */}
                  <div className="bg-white border border-[#BFDBFE] p-6 rounded-[2rem] flex flex-col gap-3">
                    <h5 className="font-black text-black text-xs uppercase tracking-wider border-b border-[#BFDBFE] pb-2 mb-2">Personal Details</h5>
                    
                    <div className="flex justify-between items-center text-xs font-semibold py-1">
                      <span className="text-black/50">Registration No.</span>
                      <span className="text-black font-bold">{selectedEmployee.registration_no || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold py-1">
                      <span className="text-black/50">Father's Name</span>
                      <span className="text-black font-bold">{selectedEmployee.father_name || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold py-1">
                      <span className="text-black/50">Date of Birth</span>
                      <span className="text-black font-bold">{selectedEmployee.dob || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold py-1">
                      <span className="text-black/50">Aadhaar No.</span>
                      <span className="text-black font-bold">{selectedEmployee.aadhaar_no || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold py-1">
                      <span className="text-black/50">Email ID</span>
                      <span className="text-black font-bold">{selectedEmployee.email || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold py-1">
                      <span className="text-black/50">Contact No.</span>
                      <span className="text-black font-bold">{selectedEmployee.contact_number || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-semibold py-1">
                      <span className="text-black/50">Alt Phone No.</span>
                      <span className="text-black font-bold">{selectedEmployee.alt_phone || '-'}</span>
                    </div>

                    <div className="text-xs font-semibold mt-3 pt-3 border-t border-[#BFDBFE]/60">
                      <span className="text-black/50 uppercase text-[9px] tracking-wider block mb-1">Permanent Address:</span>
                      <span className="text-black font-bold block leading-relaxed">{selectedEmployee.permanent_address || 'Not Provided'}</span>
                    </div>
                    <div className="text-xs font-semibold mt-2">
                      <span className="text-black/50 uppercase text-[9px] tracking-wider block mb-1">Current Address:</span>
                      <span className="text-black font-bold block leading-relaxed">{selectedEmployee.current_address || 'Not Provided'}</span>
                    </div>
                  </div>

                  {/* Right Column Panels */}
                  <div className="flex flex-col gap-6">
                    {/* Professional Details */}
                    <div className="bg-white border border-[#BFDBFE] p-6 rounded-[2rem] flex flex-col gap-3">
                      <h5 className="font-black text-black text-xs uppercase tracking-wider border-b border-[#BFDBFE] pb-2 mb-2">Professional Details</h5>
                      <div className="flex justify-between items-center text-xs font-semibold py-1">
                        <span className="text-black/50">Start Date</span>
                        <span className="text-black font-bold">{selectedEmployee.start_date || '-'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold py-1">
                        <span className="text-black/50">Base Salary</span>
                        <span className="text-black font-bold">{selectedEmployee.salary || '-'}</span>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div className="bg-white border border-[#BFDBFE] p-6 rounded-[2rem] flex flex-col gap-3">
                      <h5 className="font-black text-black text-xs uppercase tracking-wider border-b border-[#BFDBFE] pb-2 mb-2">Bank Details</h5>
                      <div className="flex justify-between items-center text-xs font-semibold py-1">
                        <span className="text-black/50">Account No.</span>
                        <span className="text-black font-bold">{selectedEmployee.account_no || '-'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold py-1">
                        <span className="text-black/50">IFSC Detail</span>
                        <span className="text-black font-bold">{selectedEmployee.ifsc_detail || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employee Documents */}
                <div className="bg-white border border-[#BFDBFE] p-6 rounded-[2rem] flex flex-col gap-4">
                  <h5 className="font-black text-black text-xs uppercase tracking-wider border-b border-[#BFDBFE] pb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> Employee Documents
                  </h5>
                  
                  <div className="flex flex-wrap gap-3 items-center">
                    {selectedEmployee.documents && selectedEmployee.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE]/45 px-4 py-3 rounded-xl flex items-center justify-between gap-3 text-xs font-bold text-black group transition-all"
                      >
                        <a
                          href={doc.url}
                          onClick={(e) => handleDownloadResume(e, doc.url, `${selectedEmployee.name}_${doc.name}`)}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <FileText className="w-4 h-4 text-primary" />
                          <span>{doc.name}</span>
                        </a>
                        
                        <div className="flex items-center gap-1">
                          <a
                            href={doc.url}
                            onClick={(e) => handleDownloadResume(e, doc.url, `${selectedEmployee.name}_${doc.name}`)}
                            className="p-1 hover:bg-[#DBEAFE] rounded-md transition-colors text-black/60"
                            title="Download Document"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                          
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Remove document ${doc.name}?`)) {
                                const updatedDocs = selectedEmployee.documents.filter((_, dIdx) => dIdx !== idx);
                                const updatedEmp = { ...selectedEmployee, documents: updatedDocs };
                                saveEmployeeSingle(updatedEmp);
                                setSelectedEmployee(updatedEmp);
                              }
                            }}
                            className="p-1 hover:bg-rose-100 hover:text-rose-600 rounded-md transition-colors text-black/40"
                            title="Remove Document"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <label className="border-2 border-dashed border-[#BFDBFE] hover:border-primary/50 hover:bg-[#EFF6FF]/50 px-4 py-3 rounded-xl text-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer relative">
                      <Plus className="w-4 h-4" /> Upload Document
                      <input
                        type="file"
                        onChange={handleDocumentUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Edit Employee Profile Modal */}
          {isEditingEmployee && editEmployeeForm && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <form
                onSubmit={handleSaveEmployeeEdit}
                data-lenis-prevent
                className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsEditingEmployee(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-full flex items-center justify-center text-black font-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-2xl font-black text-black mb-8 border-b border-[#BFDBFE] pb-4">Edit Employee Profile</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  {/* Left Column: Personal Info */}
                  <div className="flex flex-col gap-5">
                    <h5 className="font-black text-black text-xs uppercase tracking-wider mb-2 border-b border-[#BFDBFE]/40 pb-1">Personal Info</h5>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Registration No.</label>
                      <input
                        type="text"
                        value={editEmployeeForm.registration_no}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, registration_no: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editEmployeeForm.name}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, name: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Father's Name</label>
                      <input
                        type="text"
                        value={editEmployeeForm.father_name}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, father_name: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Date of Birth</label>
                      <input
                        type="date"
                        value={editEmployeeForm.dob}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, dob: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Email ID</label>
                      <input
                        type="email"
                        value={editEmployeeForm.email}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, email: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Contact Number</label>
                      <input
                        type="text"
                        value={editEmployeeForm.contact_number}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, contact_number: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Alternative Phone No.</label>
                      <input
                        type="text"
                        value={editEmployeeForm.alt_phone}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, alt_phone: e.target.value})}
                        placeholder="e.g. +1 555 0109"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Aadhaar No.</label>
                      <input
                        type="text"
                        value={editEmployeeForm.aadhaar_no}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, aadhaar_no: e.target.value})}
                        placeholder="e.g. 1234-5678-9012"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Permanent Address</label>
                      <input
                        type="text"
                        value={editEmployeeForm.permanent_address}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, permanent_address: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Current Address</label>
                      <input
                        type="text"
                        value={editEmployeeForm.current_address}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, current_address: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  {/* Right Column: Professional & Bank */}
                  <div className="flex flex-col gap-5">
                    <h5 className="font-black text-black text-xs uppercase tracking-wider mb-2 border-b border-[#BFDBFE]/40 pb-1">Professional & Bank</h5>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Account No.</label>
                      <input
                        type="text"
                        value={editEmployeeForm.account_no}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, account_no: e.target.value})}
                        placeholder="e.g. 0987654321"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">IFSC Detail</label>
                      <input
                        type="text"
                        value={editEmployeeForm.ifsc_detail}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, ifsc_detail: e.target.value})}
                        placeholder="e.g. CHAS0001"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Role / Designation</label>
                      <input
                        type="text"
                        value={editEmployeeForm.role}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, role: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Department</label>
                      <input
                        type="text"
                        value={editEmployeeForm.department}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, department: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Start Date</label>
                      <input
                        type="date"
                        value={editEmployeeForm.start_date}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, start_date: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Salary</label>
                      <input
                        type="text"
                        value={editEmployeeForm.salary}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, salary: e.target.value})}
                        placeholder="e.g. $120,000"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-8 border-t border-[#BFDBFE]/60 pt-6">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white font-black text-sm tracking-wider uppercase py-4 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-2xl transition-all duration-300 active:scale-95"
                  >
                    SAVE CHANGES
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingEmployee(false)}
                    className="bg-white border-2 border-primary/20 hover:border-primary text-black font-black text-sm tracking-wider uppercase py-4 px-8 rounded-full transition-all duration-300 active:scale-95"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;

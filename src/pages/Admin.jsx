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
  FileSpreadsheet,
  GripVertical,
  Award,
  User,
  Banknote,
  Upload,
  PartyPopper,
  CalendarDays,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

import { supabase } from '../supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const getProfilePicture = (empName, empProfilePic) => {
    if (empProfilePic) return empProfilePic;
    
    const nameToImage = {
      "shashank shubham": "/Team/Shashank Shubham Founder & CEO.jpeg",
      "garima": "/Team/Garima CTO.png",
      "dipanshu shubham": "/Team/A Dipanshu Shubham CMO.png",
      "kavita": "/Team/A Kavita Markating.png",
      "divya ghalot": "/Team/A Divya Ghalot AI Engineer.png",
      "priyanka berwa": "/Team/Priyanka HR.png",
      "priyanka bairwa": "/Team/Priyanka HR.png",
      "piyush saini": "/Team/Piyush Saini Fullstack Developer.png",
      "neha jaiswal": "/Team/NEHA JAISWAL Fullstack Developer.png",
      "riva sha": "/Team/Riva Sha FullStack Developer.png",
      "riva shah": "/Team/Riva Sha FullStack Developer.png",
      "khushboo rawat": "/Team/A Khushboo Rawat Business Development Manager.png",
      "kushboo rawat": "/Team/A Khushboo Rawat Business Development Manager.png",
      "aman partha": "/Team/A Aman Partha Full Stack Developer.png",
      "aman pathra": "/Team/A Aman Partha Full Stack Developer.png",
      "gungun rawat": "/Team/Gungun UI UX Designer.jpeg",
      "gungun": "/Team/Gungun UI UX Designer.jpeg",
      "akshita kumawat": "/Team/Akshita Kumawat Full Stack.jpeg",
      "akshita": "/Team/Akshita Kumawat Full Stack.jpeg",
      "deepak gupta": "/Team/A Deepak Gupta Secutry Tester.png",
      "diksha bansal": "/Team/A Diksha Bansal AI ML.png",
      "kapil sharma": "/Team/A Kapil Sharma Backend Developer.png",
      "naman": "/Team/A Naman Business Developmenet.png",
      "preet meena": "/Team/A Preet Meena Markating.png",
      "payal meena": "/Team/A Payal Meena Ui Ux Designer.png",
      "santosh rathore": "/Team/A Santosh Rathore Salles.png",
      "anamika sharma": "/Team/Anamika Sharma Frontend Developer.png",
      "deepti solanki": "/Team/Deepti Solanki AI ML Engineer.png",
      "devendra singh": "/Team/Devendra Singh Backend Engineer.png",
      "kavita yadhav": "/Team/Kavita Yadhav Frontend Engineer.png",
      "kuldeep kothari": "/Team/Kuldeep kothari Cybersecurity Engineer.png",
      "preeti kumari": "/Team/Preeti UI UX Designer.png",
      "rohit": "/Team/Rohit Tester & Backend Developer.png",
      "yashika agarwal": "/Team/Yashika Agarwal Data Scientist.png",
      "divyanshi sen": "/Team/Divyanshi Sen Full Stack Developer.jpg"
    };
    
    const normalized = empName ? empName.toLowerCase().trim() : "";
    return nameToImage[normalized] || null;
  };

  // Employees states
  const [employees, setEmployees] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);

  // Finance states
  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem('macenza_finance_bills');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAddingBill, setIsAddingBill] = useState(false);
  const [newBillForm, setNewBillForm] = useState({
    billNumber: '',
    description: '',
    amount: '',
    date: '',
    pdfDataUri: ''
  });

  useEffect(() => {
    localStorage.setItem('macenza_finance_bills', JSON.stringify(bills));
  }, [bills]);

  // Event states
  const [eventPhotos, setEventPhotos] = useState(() => {
    const saved = localStorage.getItem('macenza_event_photos');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAddingEventPhoto, setIsAddingEventPhoto] = useState(false);
  const [newEventPhotoForm, setNewEventPhotoForm] = useState({
    title: '',
    date: '',
    imageDataUri: ''
  });

  useEffect(() => {
    localStorage.setItem('macenza_event_photos', JSON.stringify(eventPhotos));
  }, [eventPhotos]);

  const toggleRowSelection = (e, id) => {
    e.stopPropagation();
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(r => r !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAllRows = (e) => {
    if (selectedRows.length === employees.length && employees.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(employees.map(emp => emp.id));
    }
  };

  const exportEmployeesToCSV = () => {
    if (employees.length === 0) {
      toast.error('No employees to export');
      return;
    }
    const headers = ['Registration No.', 'Full Name', 'Father\'s Name', 'Date of Birth', 'Email ID', 'Contact Number', 'Role', 'Department', 'Start Date', 'Aadhaar No.', 'Permanent Address', 'Current Address', 'Account No.', 'IFSC Code'];
    const csvContent = [
      headers.join(','),
      ...employees.map(emp => [
        `"${emp.registration_no || ''}"`,
        `"${emp.name || ''}"`,
        `"${emp.father_name || ''}"`,
        `"${emp.dob || ''}"`,
        `"${emp.email || ''}"`,
        `"${emp.contact_number || ''}"`,
        `"${emp.role || ''}"`,
        `"${emp.department || ''}"`,
        `"${emp.start_date || ''}"`,
        `"${emp.aadhaar_no || ''}"`,
        `"${emp.permanent_address || ''}"`,
        `"${emp.current_address || ''}"`,
        `"${emp.account_no || ''}"`,
        `"${emp.ifsc_detail || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'employees_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Employees exported successfully');
  };
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);
  const [editEmployeeForm, setEditEmployeeForm] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [pendingCertNumber, setPendingCertNumber] = useState('');
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
    profile_picture: '',
    documents: []
  });

  const handleProfilePictureUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditEmployeeForm(prev => ({...prev, profile_picture: reader.result}));
        } else {
          setNewEmployeeForm(prev => ({...prev, profile_picture: reader.result}));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBillFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBillForm(prev => ({ ...prev, pdfDataUri: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload a valid PDF file.');
    }
  };

  const handleAddBill = (e) => {
    e.preventDefault();
    if (!newBillForm.billNumber || !newBillForm.description || !newBillForm.amount || !newBillForm.pdfDataUri) {
      toast.error('Please fill all required fields and upload the PDF bill.');
      return;
    }
    
    const newBill = {
      id: 'bill_' + Date.now(),
      ...newBillForm,
      createdAt: new Date().toISOString()
    };
    
    setBills([newBill, ...bills]);
    setNewBillForm({ billNumber: '', description: '', amount: '', date: '', pdfDataUri: '' });
    setIsAddingBill(false);
    toast.success('Bill uploaded successfully!');
  };

  const handleDeleteBill = (id) => {
    if (confirm('Are you sure you want to delete this bill?')) {
      setBills(bills.filter(b => b.id !== id));
      toast.success('Bill deleted successfully');
    }
  };

  const getUpcomingBirthdays = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const todayMs = today.setHours(0, 0, 0, 0);

    const upcoming = employees
      .filter(emp => emp.dob)
      .map(emp => {
        const [year, month, day] = emp.dob.split('-');
        let nextBirthday = new Date(currentYear, parseInt(month) - 1, parseInt(day));
        
        if (nextBirthday.getTime() < todayMs) {
          nextBirthday = new Date(currentYear + 1, parseInt(month) - 1, parseInt(day));
        }
        
        const daysUntil = Math.ceil((nextBirthday.getTime() - todayMs) / (1000 * 60 * 60 * 24));
        
        return {
          ...emp,
          nextBirthday,
          daysUntil
        };
      })
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(0, 6);

    return upcoming;
  };

  const handleEventPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // Compress heavy
          
          setNewEventPhotoForm(prev => ({ ...prev, imageDataUri: dataUrl }));
        };
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload a valid image file (JPG/PNG).');
    }
  };

  const handleAddEventPhoto = (e) => {
    e.preventDefault();
    if (!newEventPhotoForm.title || !newEventPhotoForm.imageDataUri) {
      toast.error('Please add a title and select a photo.');
      return;
    }
    
    const newPhoto = {
      id: 'event_' + Date.now(),
      ...newEventPhotoForm,
      createdAt: new Date().toISOString()
    };
    
    setEventPhotos([newPhoto, ...eventPhotos]);
    setNewEventPhotoForm({ title: '', date: '', imageDataUri: '' });
    setIsAddingEventPhoto(false);
    toast.success('Event photo added successfully!');
  };

  const handleDeleteEventPhoto = (id) => {
    if (confirm('Are you sure you want to delete this event photo?')) {
      setEventPhotos(eventPhotos.filter(p => p.id !== id));
      toast.success('Photo deleted');
    }
  };

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

    // Save image to localStorage if present
    if (updatedEmployee.profile_picture) {
      const savedPics = JSON.parse(localStorage.getItem('macenza_employee_pics') || '{}');
      savedPics[updatedEmployee.id] = updatedEmployee.profile_picture;
      localStorage.setItem('macenza_employee_pics', JSON.stringify(savedPics));
    }

    try {
      const { certificates, profile_picture, ...employeeData } = updatedEmployee;
      const { error } = await supabase
        .from('employees')
        .upsert(employeeData);
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
      } else {
        const orderIds = updated.map(emp => emp.id);
        localStorage.setItem('macenza_employee_order', JSON.stringify(orderIds));
      }
    } catch (err) {
      console.warn('Supabase delete exception:', err);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedRows.length} selected employees?`)) return;

    const updated = employees.filter(item => !selectedRows.includes(item.id));
    setEmployees(updated);

    if (selectedEmployee && selectedRows.includes(selectedEmployee.id)) {
      setSelectedEmployee(null);
    }
    
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .in('id', selectedRows);
      if (error) {
        toast.error('Failed to delete from database: ' + error.message);
      } else {
        const orderIds = updated.map(emp => emp.id);
        localStorage.setItem('macenza_employee_order', JSON.stringify(orderIds));
        toast.success(`Successfully deleted ${selectedRows.length} employees`);
        setSelectedRows([]);
      }
    } catch (err) {
      console.warn('Supabase delete exception:', err);
    }
  };

  const loadEmployeeCertificates = async (employeeId) => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('employee_id', employeeId);
      if (error) throw error;
      setSelectedEmployee(prev => prev && prev.id === employeeId ? { ...prev, certificates: data || [] } : prev);
    } catch (err) {
      console.warn('Failed to load certificates:', err.message);
    }
  };

  const handleUploadCertificateClick = () => {
    const certNum = prompt("Please enter the unique Certification Number:");
    if (!certNum) {
      toast.error("Certification Number is required to upload a certificate.");
      return;
    }
    setPendingCertNumber(certNum.trim().toUpperCase());
    
    const input = document.getElementById('certificate-file-input');
    if (input) {
      input.value = '';
      input.click();
    }
  };

  const handleCertificateFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedEmployee || !pendingCertNumber) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedEmployee.id}-${pendingCertNumber}-${Date.now()}.${fileExt}`;
      let publicUrl = '';

      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('employee-certs')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('employee-certs')
          .getPublicUrl(fileName);

        publicUrl = url;
      } catch (storageErr) {
        console.warn('Supabase storage upload failed, using Object URL fallback', storageErr);
        publicUrl = URL.createObjectURL(file);
      }

      const newCert = {
        id: 'cert_' + Date.now(),
        employee_id: selectedEmployee.id,
        certification_number: pendingCertNumber,
        name: file.name,
        url: publicUrl
      };

      const { error: insertError } = await supabase
        .from('certificates')
        .insert(newCert);

      if (insertError) throw insertError;

      const updatedCerts = [...(selectedEmployee.certificates || []), newCert];
      setSelectedEmployee({ ...selectedEmployee, certificates: updatedCerts });

      toast.success('Certificate uploaded and registered successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload certificate: ' + err.message);
    } finally {
      setPendingCertNumber('');
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const list = [...employees];
    const draggedItem = list[draggedIndex];
    list.splice(draggedIndex, 1);
    list.splice(index, 0, draggedItem);

    setEmployees(list);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    const orderIds = employees.map(emp => emp.id);
    localStorage.setItem('macenza_employee_order', JSON.stringify(orderIds));
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

    // Save image to localStorage if present
    if (newEmp.profile_picture) {
      const savedPics = JSON.parse(localStorage.getItem('macenza_employee_pics') || '{}');
      savedPics[newEmp.id] = newEmp.profile_picture;
      localStorage.setItem('macenza_employee_pics', JSON.stringify(savedPics));
    }

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
      profile_picture: '',
      documents: []
    });
    setIsAddingEmployee(false);

    try {
      const { profile_picture, ...employeeData } = newEmp;
      const { error } = await supabase
        .from('employees')
        .insert(employeeData);
      if (error) {
        console.warn('Failed to insert employee into Supabase:', error.message);
      } else {
        const orderIds = updated.map(emp => emp.id);
        localStorage.setItem('macenza_employee_order', JSON.stringify(orderIds));
        toast.success('Employee profile created successfully!');
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

    // Save image to localStorage if present
    if (editEmployeeForm.profile_picture) {
      const savedPics = JSON.parse(localStorage.getItem('macenza_employee_pics') || '{}');
      savedPics[editEmployeeForm.id] = editEmployeeForm.profile_picture;
      localStorage.setItem('macenza_employee_pics', JSON.stringify(savedPics));
    }

    try {
      const { certificates, profile_picture, ...employeeData } = editEmployeeForm;
      const { error } = await supabase
        .from('employees')
        .upsert(employeeData);
      if (error) {
        console.warn('Failed to update employee in Supabase:', error.message);
        toast.error('Failed to update employee: ' + error.message);
      } else {
        toast.success('Employee profile updated successfully!');
      }
    } catch (err) {
      console.warn('Supabase update exception:', err);
      toast.error('Failed to update employee: ' + err.message);
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
      toast.success('Document uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload document: ' + err.message);
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
          
          const loaded = data || [];
          const savedPics = JSON.parse(localStorage.getItem('macenza_employee_pics') || '{}');
          const loadedWithPics = loaded.map(emp => ({
            ...emp,
            profile_picture: savedPics[emp.id] || emp.profile_picture || ''
          }));

          const savedOrder = localStorage.getItem('macenza_employee_order');
          if (savedOrder) {
            try {
              const orderIds = JSON.parse(savedOrder);
              loadedWithPics.sort((a, b) => {
                const indexA = orderIds.indexOf(a.id);
                const indexB = orderIds.indexOf(b.id);
                if (indexA === -1 && indexB === -1) return 0;
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
              });
            } catch (jsonErr) {
              console.warn('Failed to parse employee sort order:', jsonErr);
            }
          }
          setEmployees(loadedWithPics);
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

  const handleForgotPassword = async () => {
    if (!email) {
      setLoginError('Please enter your email address first to reset password.');
      return;
    }
    try {
      setSigningIn(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/admin',
      });
      if (error) throw error;
      toast.success('Password reset link sent! Check your email.');
      setLoginError('');
    } catch (err) {
      console.error(err);
      setLoginError(err.message || 'Failed to send reset link.');
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
      toast.error('Error: ' + err.message);
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
      toast.error('Could not delete job: ' + err.message);
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
      toast.error('Error updating status: ' + err.message);
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
      toast.success('Recruiter notes saved!');
    } catch (err) {
      console.error(err);
      toast.error('Error saving notes: ' + err.message);
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
          <img src="/logo.svg" alt="Macenza Logo" className="w-10 h-10 object-contain rounded-2xl shadow-lg shadow-primary/20 bg-white p-1" />
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
              <div className="flex justify-end mt-1">
                <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">
                  Forgot Password?
                </button>
              </div>
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
            <img src="/logo.svg" alt="Macenza Logo" className="w-9 h-9 object-contain rounded-xl bg-white p-0.5" />
            <span className="text-xl font-black tracking-tighter text-black uppercase">MACENZA ADMIN</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2">
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: "📊" },
              { id: 'Jobs', label: 'Jobs', icon: "💼" },
              { id: 'Applications', label: 'Applications', icon: "📋" },
              { id: 'Resume Manager', label: 'Resume Manager', icon: "🔍" },
              { id: 'Employees', label: 'Employee Management', icon: <Users className="w-5 h-5" /> },
              { id: 'Finance', label: 'Finance & Bills', icon: <Banknote className="w-5 h-5" /> },
              { id: 'Events', label: 'Events & Birthdays', icon: <PartyPopper className="w-5 h-5" /> },
              { id: 'Analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 text-black/70 hover:text-black hover:bg-[#DBEAFE]/50 hover:pl-5 active:scale-95 group whitespace-nowrap"
                style={activeTab === item.id ? { backgroundColor: '#DBEAFE', color: 'black', paddingLeft: '20px', borderLeft: '4px solid #2563eb' } : {}}
              >
                <span className="text-xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                {item.label}
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

          {/* Tab: Finance */}
          {activeTab === 'Finance' && (
            <div className="flex flex-col gap-8 h-[calc(100vh-200px)]">
              {/* Add Bill Modal */}
              {isAddingBill && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddingBill(false)}>
                  <div className="bg-white rounded-[2rem] w-full max-w-xl p-8" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-black text-black">Upload New Bill</h3>
                      <button onClick={() => setIsAddingBill(false)} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <X className="w-5 h-5 text-black" />
                      </button>
                    </div>
                    <form onSubmit={handleAddBill} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Bill Number</label>
                        <input type="text" required value={newBillForm.billNumber} onChange={e => setNewBillForm({...newBillForm, billNumber: e.target.value})} className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" placeholder="e.g. INV-2026-001" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Description / Title</label>
                        <input type="text" required value={newBillForm.description} onChange={e => setNewBillForm({...newBillForm, description: e.target.value})} className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" placeholder="e.g. Server Hosting" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Amount ($)</label>
                        <input type="number" step="0.01" required value={newBillForm.amount} onChange={e => setNewBillForm({...newBillForm, amount: e.target.value})} className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" placeholder="0.00" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Date of Bill</label>
                        <input type="date" required value={newBillForm.date} onChange={e => setNewBillForm({...newBillForm, date: e.target.value})} className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Upload PDF</label>
                        <div className="relative border-2 border-dashed border-[#BFDBFE] rounded-2xl p-6 flex flex-col items-center justify-center hover:border-primary transition-colors cursor-pointer bg-blue-50/50">
                          {newBillForm.pdfDataUri ? (
                            <div className="text-emerald-600 font-bold flex items-center gap-2">
                              <Check className="w-5 h-5" /> PDF Attached Successfully
                            </div>
                          ) : (
                            <div className="text-black/60 font-semibold flex flex-col items-center gap-2">
                              <Upload className="w-6 h-6 text-primary" />
                              <span>Click to browse or drag PDF here</span>
                            </div>
                          )}
                          <input type="file" accept=".pdf" onChange={handleBillFileUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                        </div>
                      </div>
                      <button type="submit" className="mt-4 bg-primary text-white hover:bg-primary-dark w-full py-4 rounded-2xl font-black text-sm transition-colors shadow-lg shadow-primary/20">
                        Save Bill
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <div data-lenis-prevent className="flex-1 w-full bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-8 flex flex-col gap-6 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-black text-black flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-primary" /> Finance & Bills ({bills.length})
                  </h4>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setIsAddingBill(true)} className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-primary/20">
                      + Upload New Bill
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto rounded-2xl border border-[#BFDBFE] bg-white">
                  <table className="w-full text-left">
                    <thead className="bg-[#DBEAFE] sticky top-0 z-10">
                      <tr>
                        <th className="p-4 font-black text-xs text-black uppercase whitespace-nowrap border-b border-[#BFDBFE]">Bill #</th>
                        <th className="p-4 font-black text-xs text-black uppercase whitespace-nowrap border-b border-[#BFDBFE]">Date</th>
                        <th className="p-4 font-black text-xs text-black uppercase whitespace-nowrap border-b border-[#BFDBFE]">Description</th>
                        <th className="p-4 font-black text-xs text-black uppercase whitespace-nowrap border-b border-[#BFDBFE]">Amount</th>
                        <th className="p-4 font-black text-xs text-black uppercase whitespace-nowrap border-b border-[#BFDBFE] text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#BFDBFE]">
                      {bills.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-black/50 italic">
                            No bills uploaded yet.
                          </td>
                        </tr>
                      ) : (
                        bills.map((bill) => (
                          <tr key={bill.id} className="hover:bg-[#F8FAFC] transition-colors">
                            <td className="p-4 text-sm font-bold text-primary whitespace-nowrap">{bill.billNumber}</td>
                            <td className="p-4 text-sm text-black/70 whitespace-nowrap">{bill.date || '-'}</td>
                            <td className="p-4 text-sm font-bold text-black">{bill.description}</td>
                            <td className="p-4 text-sm font-black text-emerald-600 whitespace-nowrap">${parseFloat(bill.amount).toFixed(2)}</td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <a href={bill.pdfDataUri} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition-colors" title="View PDF">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                                <button onClick={() => handleDeleteBill(bill.id)} className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 flex items-center justify-center transition-colors" title="Delete">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Events */}
          {activeTab === 'Events' && (
            <div className="flex flex-col gap-8 h-[calc(100vh-200px)]">
              {/* Add Event Photo Modal */}
              {isAddingEventPhoto && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddingEventPhoto(false)}>
                  <div className="bg-white rounded-[2rem] w-full max-w-xl p-8" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-black text-black">Upload Event Photo</h3>
                      <button onClick={() => setIsAddingEventPhoto(false)} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <X className="w-5 h-5 text-black" />
                      </button>
                    </div>
                    <form onSubmit={handleAddEventPhoto} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Event Title</label>
                        <input type="text" required value={newEventPhotoForm.title} onChange={e => setNewEventPhotoForm({...newEventPhotoForm, title: e.target.value})} className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" placeholder="e.g. Annual Office Party 2026" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Event Date</label>
                        <input type="date" value={newEventPhotoForm.date} onChange={e => setNewEventPhotoForm({...newEventPhotoForm, date: e.target.value})} className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Upload Compressed Photo</label>
                        <div className="relative border-2 border-dashed border-[#BFDBFE] rounded-2xl p-6 flex flex-col items-center justify-center hover:border-primary transition-colors cursor-pointer bg-blue-50/50">
                          {newEventPhotoForm.imageDataUri ? (
                            <img src={newEventPhotoForm.imageDataUri} alt="Preview" className="h-32 object-contain rounded-lg" />
                          ) : (
                            <div className="text-black/60 font-semibold flex flex-col items-center gap-2">
                              <Camera className="w-6 h-6 text-primary" />
                              <span>Click to browse or drag JPG/PNG here</span>
                            </div>
                          )}
                          <input type="file" accept="image/*" onChange={handleEventPhotoUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                        </div>
                      </div>
                      <button type="submit" className="mt-4 bg-primary text-white hover:bg-primary-dark w-full py-4 rounded-2xl font-black text-sm transition-colors shadow-lg shadow-primary/20">
                        Save Photo
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                {/* Birthdays Column (1/3 width) */}
                <div data-lenis-prevent className="md:col-span-1 bg-gradient-to-br from-indigo-50 to-pink-50 border border-indigo-100 rounded-[3rem] p-8 flex flex-col gap-6 overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 border-b border-indigo-200/50 pb-4">
                    <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <PartyPopper className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xl font-black text-indigo-950">Upcoming Birthdays</h4>
                  </div>
                  <div className="flex-1 overflow-auto flex flex-col gap-4 pr-2">
                    {getUpcomingBirthdays().length === 0 ? (
                      <div className="text-center text-indigo-400 italic p-4">No birthdays found. Add DOB to employees.</div>
                    ) : (
                      getUpcomingBirthdays().map((emp, index) => (
                        <div key={emp.id} className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 flex items-center gap-4 hover:shadow-md transition-all">
                          <div className="w-12 h-12 bg-indigo-100 rounded-full flex flex-col items-center justify-center text-indigo-700 shrink-0">
                            <span className="text-[10px] font-bold uppercase leading-none">{emp.nextBirthday.toLocaleString('default', { month: 'short' })}</span>
                            <span className="text-lg font-black leading-none mt-0.5">{emp.nextBirthday.getDate()}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-900 truncate">{emp.name}</div>
                            <div className="text-xs text-gray-500 truncate">{emp.department || emp.role}</div>
                          </div>
                          <div className="text-right shrink-0">
                            {emp.daysUntil === 0 ? (
                              <span className="text-[10px] font-black text-pink-600 bg-pink-100 px-2 py-1 rounded-full animate-pulse tracking-wide">TODAY!</span>
                            ) : emp.daysUntil === 1 ? (
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">Tomorrow</span>
                            ) : (
                              <span className="text-xs font-bold text-gray-500">{emp.daysUntil} days</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Photo Gallery Column (2/3 width) */}
                <div data-lenis-prevent className="md:col-span-2 bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-8 flex flex-col gap-6 overflow-hidden">
                  <div className="flex justify-between items-center border-b border-[#BFDBFE]/50 pb-4">
                    <h4 className="text-xl font-black text-black flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-primary" /> Event Gallery ({eventPhotos.length})
                    </h4>
                    <button type="button" onClick={() => setIsAddingEventPhoto(true)} className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                      <Camera className="w-4 h-4" /> Upload Photo
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-auto pr-2">
                    {eventPhotos.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-black/40">
                        <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                        <p className="font-semibold text-lg">No event photos yet</p>
                        <p className="text-sm">Click the button above to upload some memories!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventPhotos.map(photo => (
                          <div key={photo.id} className="bg-white rounded-3xl overflow-hidden border border-[#BFDBFE] shadow-sm hover:shadow-xl transition-all group relative">
                            <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                              <img src={photo.imageDataUri} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <button onClick={() => handleDeleteEventPhoto(photo.id)} className="absolute top-3 right-3 w-8 h-8 bg-rose-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-rose-600 shadow-lg" title="Delete Photo">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="p-4">
                              <h5 className="font-black text-black truncate" title={photo.title}>{photo.title}</h5>
                              <p className="text-xs font-bold text-gray-500 flex items-center gap-1 mt-1">
                                <CalendarDays className="w-3 h-3" /> {photo.date ? new Date(photo.date).toLocaleDateString() : new Date(photo.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Employees Management */}
          {activeTab === 'Employees' && (
            <>
              {/* Add Employee Modal */}
              {isAddingEmployee && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddingEmployee(false)}>
                  <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-black tracking-tight">Add Employee</h3>
                        <p className="text-xs font-semibold text-black/45 uppercase tracking-wide mt-1">Create a new company record</p>
                      </div>
                      <button onClick={() => setIsAddingEmployee(false)} className="text-black/50 hover:text-black">
                         <X className="w-6 h-6" />
                      </button>
                    </div>
                    <form onSubmit={handleAddEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="col-span-full flex flex-col gap-1.5 items-center">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Profile Picture</label>
                        <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-[#BFDBFE] flex items-center justify-center overflow-hidden group cursor-pointer hover:border-primary transition-colors">
                          {newEmployeeForm.profile_picture ? (
                            <img src={newEmployeeForm.profile_picture} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-primary flex flex-col items-center">
                              <span className="text-2xl">+</span>
                            </div>
                          )}
                          <input type="file" accept="image/*" onChange={(e) => handleProfilePictureUpload(e, false)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Registration No.</label>
                        <input type="text" value={newEmployeeForm.registration_no} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, registration_no: e.target.value})} placeholder="e.g. EMP-003" className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Full Name</label>
                        <input type="text" required value={newEmployeeForm.name} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, name: e.target.value})} placeholder="e.g. John Doe" className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Father's Name</label>
                        <input type="text" value={newEmployeeForm.father_name} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, father_name: e.target.value})} placeholder="e.g. Richard Doe" className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Date of Birth</label>
                        <input type="date" value={newEmployeeForm.dob} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, dob: e.target.value})} className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Email ID</label>
                        <input type="email" value={newEmployeeForm.email} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, email: e.target.value})} placeholder="e.g. john@macenza.com" className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Contact Number</label>
                        <input type="text" value={newEmployeeForm.contact_number} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, contact_number: e.target.value})} placeholder="e.g. +1 555 0103" className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Role / Designation</label>
                        <input type="text" value={newEmployeeForm.role} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, role: e.target.value})} placeholder="e.g. Fullstack Engineer" className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Department</label>
                        <input type="text" value={newEmployeeForm.department} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, department: e.target.value})} placeholder="e.g. Engineering" className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Start Date</label>
                        <input type="date" value={newEmployeeForm.start_date} onChange={(e) => setNewEmployeeForm({...newEmployeeForm, start_date: e.target.value})} className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all" />
                      </div>
                      <button type="submit" className="md:col-span-2 w-full py-4 mt-2 bg-primary text-white rounded-full font-black text-xs tracking-wider uppercase shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
                        Create Employee Profile
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-8">
                {/* Top/Main Box: Employees List taking full width */}
                <div className="w-full bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] overflow-hidden">
                  <div className="px-8 py-6 border-b border-[#BFDBFE] flex justify-between items-center bg-white">
                    <h4 className="text-xl font-black text-black flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" /> Employees ({employees.length})
                    </h4>
                    <div className="flex gap-4">
                      {selectedRows.length > 0 && (
                        <button type="button" onClick={handleDeleteSelected} className="bg-rose-100 text-rose-600 hover:bg-rose-200 px-3 py-2 rounded-xl text-xs font-bold transition-colors">
                          <Trash2 className="w-4 h-4 inline mr-1" /> Delete Selected ({selectedRows.length})
                        </button>
                      )}
                      <button type="button" onClick={exportEmployeesToCSV} className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-2 rounded-xl text-xs font-bold transition-colors">
                        <Download className="w-4 h-4 inline mr-1" /> Export Data
                      </button>
                      <button type="button" onClick={() => setIsAddingEmployee(true)} className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-primary/20">
                        + Add Employee
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar bg-white relative">
                    <table className="w-full text-left border-collapse min-w-[1500px]">
                    <thead className="bg-[#DBEAFE] sticky top-0 z-10 border-b border-[#BFDBFE]">
                      <tr className="text-black font-bold text-xs uppercase tracking-wider">
                        <th className="px-8 py-4 whitespace-nowrap">
                          <input type="checkbox" checked={employees.length > 0 && selectedRows.length === employees.length} onChange={toggleAllRows} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                        </th>
                        <th className="px-6 py-4 whitespace-nowrap">#</th>
                        <th className="px-6 py-4 whitespace-nowrap">Pic</th>
                        <th className="px-6 py-4 whitespace-nowrap">Registration No.</th>
                        <th className="px-6 py-4 whitespace-nowrap">Full Name</th>
                        <th className="px-6 py-4 whitespace-nowrap">Father's Name</th>
                        <th className="px-6 py-4 whitespace-nowrap">Date of Birth</th>
                        <th className="px-6 py-4 whitespace-nowrap">Address (Permanent & Current)</th>
                        <th className="px-6 py-4 whitespace-nowrap">Email ID</th>
                        <th className="px-6 py-4 whitespace-nowrap">Contact Number</th>
                        <th className="px-6 py-4 whitespace-nowrap">Aadhaar No.</th>
                        <th className="px-6 py-4 whitespace-nowrap">Alternative Phone No.</th>
                        <th className="px-6 py-4 whitespace-nowrap">Account No.</th>
                        <th className="px-6 py-4 whitespace-nowrap">IFSC Code</th>
                        <th className="px-8 py-4 whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp, index) => (
                        <tr
                          key={emp.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setEditEmployeeForm(emp);
                            loadEmployeeCertificates(emp.id);
                          }}
                          className={`hover:bg-[#EFF6FF]/60 cursor-pointer transition-colors border-b border-[#BFDBFE]/50 last:border-0 text-sm font-semibold ${draggedIndex === index ? 'opacity-40 bg-gray-50' : selectedRows.includes(emp.id) ? 'bg-[#DBEAFE]' : ''}`}
                        >
                          <td className="px-8 py-5 text-sm font-black text-black/50 whitespace-nowrap">
                            <input type="checkbox" checked={selectedRows.includes(emp.id)} onChange={(e) => toggleRowSelection(e, emp.id)} onClick={(e) => e.stopPropagation()} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer" />
                          </td>
                          <td className="px-6 py-5 text-sm font-black text-black/50 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
                              {getProfilePicture(emp.name, emp.profile_picture) ? (
                                <img src={getProfilePicture(emp.name, emp.profile_picture)} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-4 h-4 text-primary/40" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm font-bold text-primary whitespace-nowrap">{emp.registration_no || '-'}</td>
                          <td className="px-6 py-5 text-sm font-bold text-black whitespace-nowrap">{emp.name || '-'}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">{emp.father_name || '-'}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">{emp.dob || '-'}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 max-w-[250px] truncate" title={`Perm: ${emp.permanent_address || 'N/A'} | Curr: ${emp.current_address || 'N/A'}`}>
                            {emp.permanent_address || 'Not Provided'}
                          </td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">{emp.email || '-'}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">{emp.contact_number || '-'}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">{emp.aadhaar_no || '-'}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">{emp.alt_phone || '-'}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">{emp.account_no || '-'}</td>
                          <td className="px-6 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">{emp.ifsc_detail || '-'}</td>
                          <td className="px-8 py-5 text-sm font-semibold text-black/70 whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEmployee(emp.id, emp.name);
                              }}
                              className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl transition-colors active:scale-90"
                              title="Delete Employee"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {employees.length === 0 && (
                        <tr>
                          <td colSpan="15" className="p-8 text-center text-black/50 italic">
                            No employee records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
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
            <div
              onClick={() => setSelectedEmployee(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
                className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[3rem] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative cursor-default"
              >
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

                {/* Employee Documents & Certifications */}
                <div className="bg-white border border-[#BFDBFE] p-6 rounded-[2rem] flex flex-col gap-4">
                  <h5 className="font-black text-black text-xs uppercase tracking-wider border-b border-[#BFDBFE] pb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> Employee Documents & Certifications
                  </h5>
                  
                  <div className="flex flex-wrap gap-3 items-center">
                    {/* General Documents */}
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

                    {/* Certificates */}
                    {selectedEmployee.certificates && selectedEmployee.certificates.map((cert, idx) => (
                      <div
                        key={'cert_' + cert.id}
                        className="bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/50 px-4 py-3 rounded-xl flex items-center justify-between gap-3 text-xs font-bold text-black group transition-all"
                      >
                        <a
                          href={cert.url}
                          onClick={(e) => handleDownloadResume(e, cert.url, `${selectedEmployee.name}_${cert.name}`)}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <Award className="w-4 h-4 text-emerald-600" />
                          <span>{cert.name} <span className="text-[10px] bg-emerald-100 border border-emerald-300 text-emerald-800 px-1.5 py-0.5 rounded font-black uppercase ml-1">{cert.certification_number}</span></span>
                        </a>
                        
                        <div className="flex items-center gap-1">
                          <a
                            href={cert.url}
                            onClick={(e) => handleDownloadResume(e, cert.url, `${selectedEmployee.name}_${cert.name}`)}
                            className="p-1 hover:bg-emerald-200 rounded-md transition-colors text-black/60"
                            title="Download Certificate"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                          
                          <button
                            type="button"
                            onClick={async () => {
                              if (confirm(`Remove certificate ${cert.name}?`)) {
                                try {
                                  const { error } = await supabase
                                    .from('certificates')
                                    .delete()
                                    .eq('id', cert.id);
                                  if (error) throw error;
                                  
                                  const updatedCerts = selectedEmployee.certificates.filter(c => c.id !== cert.id);
                                  setSelectedEmployee({ ...selectedEmployee, certificates: updatedCerts });
                                  toast.success('Certificate removed successfully!');
                                } catch (err) {
                                  toast.error('Failed to remove certificate: ' + err.message);
                                }
                              }
                            }}
                            className="p-1 hover:bg-rose-100 hover:text-rose-600 rounded-md transition-colors text-black/40"
                            title="Remove Certificate"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Action Upload Triggers */}
                    <div className="flex gap-3 items-center flex-wrap w-full mt-2 pt-2 border-t border-[#BFDBFE]/40">
                      <label className="border-2 border-dashed border-[#BFDBFE] hover:border-primary/50 hover:bg-[#EFF6FF]/50 px-4 py-3 rounded-xl text-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer relative">
                        <Plus className="w-4 h-4" /> Upload Document
                        <input
                          type="file"
                          onChange={handleDocumentUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={handleUploadCertificateClick}
                        className="border-2 border-dashed border-[#BFDBFE] hover:border-primary/50 hover:bg-[#EFF6FF]/50 px-4 py-3 rounded-xl text-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-emerald-600" /> Upload Certificate
                      </button>
                      <input
                        type="file"
                        id="certificate-file-input"
                        onChange={handleCertificateFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
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

                    <div className="flex flex-col gap-1.5 items-center mb-2">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Profile Picture</label>
                      <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-[#BFDBFE] flex items-center justify-center overflow-hidden group cursor-pointer hover:border-primary transition-colors bg-white">
                        {editEmployeeForm.profile_picture ? (
                          <img src={editEmployeeForm.profile_picture} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-primary flex flex-col items-center">
                            <span className="text-2xl">+</span>
                          </div>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => handleProfilePictureUpload(e, true)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Registration No.</label>
                      <input
                        type="text"
                        value={editEmployeeForm.registration_no || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, registration_no: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        value={editEmployeeForm.name || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, name: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Father's Name</label>
                      <input
                        type="text"
                        value={editEmployeeForm.father_name || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, father_name: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Date of Birth</label>
                      <input
                        type="date"
                        value={editEmployeeForm.dob || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, dob: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Email ID</label>
                      <input
                        type="email"
                        value={editEmployeeForm.email || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, email: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Contact Number</label>
                      <input
                        type="text"
                        value={editEmployeeForm.contact_number || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, contact_number: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Alternative Phone No.</label>
                      <input
                        type="text"
                        value={editEmployeeForm.alt_phone || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, alt_phone: e.target.value})}
                        placeholder="e.g. +1 555 0109"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Aadhaar No.</label>
                      <input
                        type="text"
                        value={editEmployeeForm.aadhaar_no || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, aadhaar_no: e.target.value})}
                        placeholder="e.g. 1234-5678-9012"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Permanent Address</label>
                      <input
                        type="text"
                        value={editEmployeeForm.permanent_address || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, permanent_address: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Current Address</label>
                      <input
                        type="text"
                        value={editEmployeeForm.current_address || ''}
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
                        value={editEmployeeForm.account_no || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, account_no: e.target.value})}
                        placeholder="e.g. 0987654321"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">IFSC Detail</label>
                      <input
                        type="text"
                        value={editEmployeeForm.ifsc_detail || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, ifsc_detail: e.target.value})}
                        placeholder="e.g. CHAS0001"
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Role / Designation</label>
                      <input
                        type="text"
                        value={editEmployeeForm.role || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, role: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Department</label>
                      <input
                        type="text"
                        value={editEmployeeForm.department || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, department: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Start Date</label>
                      <input
                        type="date"
                        value={editEmployeeForm.start_date || ''}
                        onChange={(e) => setEditEmployeeForm({...editEmployeeForm, start_date: e.target.value})}
                        className="bg-white border border-[#BFDBFE] p-3.5 rounded-2xl text-black font-semibold text-sm outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-black/60 tracking-wider">Salary</label>
                      <input
                        type="text"
                        value={editEmployeeForm.salary || ''}
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
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar theme="colored" />
    </div>
  );
};

export default Admin;

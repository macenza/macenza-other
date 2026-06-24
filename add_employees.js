import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the .env file from the project root
const envPath = path.resolve(__dirname, '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');

let supabaseUrl = '';
let supabaseKey = '';

envFile.split('\n').forEach(line => {
  if (line.startsWith('VITE_SUPABASE_URL=')) {
    supabaseUrl = line.split('=')[1].trim();
  }
  if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) {
    supabaseKey = line.split('=')[1].trim();
  }
});

const supabase = createClient(supabaseUrl, supabaseKey);

const employees = [
  { registration_no: 'MAC/RG/001', name: 'Tejas Mishra', father_name: 'Anil Kumar Mishra', dob: '2004-02-16', permanent_address: 'Hardoi, Uttar Pradesh', email: 'tejasmishra72@gmail.com', contact_number: '6268926355', aadhaar_no: '9498 7892 2106', alt_phone: '', account_no: '342104000174794', ifsc_detail: 'IBKL0000342' },
  { registration_no: 'MAC/RG/002', name: 'Aman Pathra', father_name: 'Mahendra Kumar Pathra', dob: '2002-08-04', permanent_address: 'Behind mayo college dhola bhata ajmer', email: 'amanpathra17@gmail.com', contact_number: '9079773606', aadhaar_no: '449327255368', alt_phone: '9269252174', account_no: '322101509896', ifsc_detail: 'ICIC0003221' },
  { registration_no: 'MAC/RG/003', name: 'Abhishek Singh', father_name: 'Mr. Ajeet Singh', dob: '2005-01-15', permanent_address: '449, durga nagar, Bareilly', email: 'abhisheksinghdev5@gmail.com', contact_number: '7086456245', aadhaar_no: '449327255368', alt_phone: '6395135860', account_no: '41308377962', ifsc_detail: 'SBIN0016725' },
  { registration_no: 'MAC/RG/004', name: 'Kushboo Rawat', father_name: 'Mr Ghirdhari singh', dob: '2006-08-03', permanent_address: 'idga Colony vaishali nagar , Ajmer', email: 'khushboorawat9521@gmail.com', contact_number: '7340184637', aadhaar_no: '631695016212', alt_phone: '9521285036', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/005', name: 'Riva shah', father_name: 'Rajendra kumar shah', dob: '2005-09-07', permanent_address: 'MD Colony Gandhinagar Ajmer', email: 'rivashah795@gmail.com', contact_number: '9427150278', aadhaar_no: '453771270297', alt_phone: '9998929401', account_no: '118009495505', ifsc_detail: 'GSCB0BK0013' },
  { registration_no: 'MAC/RG/006', name: 'Manan Sehgal', father_name: 'Mr. Vishal Sehgal', dob: '2005-10-01', permanent_address: 'FF-2, F Block, Milan Earth, Rajnagar Extension, Ghaziabad, Uttar Pradesh. / 2051C, Near Goel Cold Store, Barara, Ambala, Haryana, 122201', email: 'manansehgal97@gmail.com', contact_number: '7701920069', aadhaar_no: '9615 3154 9445', alt_phone: '9729999929', account_no: '43388758720', ifsc_detail: 'SBIN0016604' },
  { registration_no: 'MAC/RG/007', name: 'Akarsh Shukla', father_name: 'Mr. Sunil Kumar Shukla', dob: '2005-02-14', permanent_address: 'Maal godam road, Palla kalan , Lakhimpur kheri, Uttar Pradesh / Dasna, Ghaziabad', email: 'akarshshukla20002005@gmail.com', contact_number: '8756422957', aadhaar_no: '390994977613', alt_phone: '9651691311', account_no: '34030100009199', ifsc_detail: 'BARBOPALIAK' },
  { registration_no: 'MAC/RG/008', name: 'Lavish Bharti', father_name: 'Mr. Ravinder kumar', dob: '2005-01-20', permanent_address: 'Achpal ghari pilkhuwa / Hapur 245304', email: '586lavishbharti@gmail.com', contact_number: '7417146766', aadhaar_no: '417964433778', alt_phone: '9654893212', account_no: '41952834204', ifsc_detail: 'SBIN0001481' },
  { registration_no: 'MAC/RG/009', name: 'Krishti Mittal', father_name: 'Amresh kumar', dob: '2005-09-26', permanent_address: 'Bulandshahr / Ghaziabad', email: 'krishtimittal26@gmail.com', contact_number: '8273393848', aadhaar_no: '618870773356', alt_phone: '9058664001', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/010', name: 'Khushi Kashyap', father_name: 'Vinod Kashyap', dob: '2005-10-10', permanent_address: 'Krishna Ganj, Pilkhuwa, Ghaziabad, Uttar Pradesh', email: 'khushikashyapcgi2004@gmail.com', contact_number: '9389061296', aadhaar_no: '727362428121', alt_phone: '9389061296', account_no: '37090100013185', ifsc_detail: 'BARB0PILAKH' },
  { registration_no: 'MAC/RG/011', name: 'Aarushi Tyagi', father_name: 'Jayaveer Tyagi', dob: '2007-11-06', permanent_address: 'Village Dattiyana District Hapur', email: 'aarushityagi06@gmail.com', contact_number: '7906015395', aadhaar_no: '6147 8233 0446', alt_phone: '6398801343', account_no: '2756001700109853', ifsc_detail: 'PUNB0275600' },
  { registration_no: 'MAC/RG/012', name: 'Sneha Vats', father_name: 'Atul kumar Sharma', dob: '2006-10-23', permanent_address: 'Hno. 105/144 pipal wali gali guldhar 2 sec 23 Sanjay nagar Ghaziabad', email: 'vatssneha69@gmail.com', contact_number: '8851596998', aadhaar_no: '510048564988', alt_phone: '7289975410', account_no: '42553843971', ifsc_detail: 'SBIN0012964' },
  { registration_no: 'MAC/RG/013', name: 'Adarsh Opalkar', father_name: 'Ganesh', dob: '2004-02-02', permanent_address: 'Hanuman mandir road, shri nagar, nanded, maharastra', email: 'adarshopalkar02@gmail.com', contact_number: '9119524103', aadhaar_no: '4305 5789 4295', alt_phone: '9403532603', account_no: '41277644025', ifsc_detail: 'SBIN0020452' },
  { registration_no: 'MAC/RG/014', name: 'Monika Sharma', father_name: 'Sanjay Sharma', dob: '2003-06-06', permanent_address: 'Hno. 2655 sector 7a faridabad, haryana', email: 'monicaa.shrama@gmail.com', contact_number: '7428481359', aadhaar_no: '758618150415', alt_phone: '9266566561', account_no: '42932458428', ifsc_detail: 'SBIN0016107' },
  { registration_no: 'MAC/RG/015', name: 'Manoj Kumar', father_name: 'Ramdarash', dob: null, permanent_address: 'Vill Sihabara Gorakhpur & current Engineering College. MMMUT Gorakhpur', email: 'manojkumarmmmut@gmail.com', contact_number: '8382832716', aadhaar_no: '985076043292', alt_phone: '9650825739', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/016', name: 'Mohan Kumar Indala', father_name: 'Sun Babu Indala', dob: '2025-11-08', permanent_address: '53-20-21/3, chaitanya Nagar, maddilapalem, Visakhapatnam', email: 'indalamohankumar@gmail.com', contact_number: '7780123277', aadhaar_no: '331606829691', alt_phone: '9640324034', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/017', name: 'Khushboo kumari', father_name: 'Ranjeet roy', dob: '2025-03-22', permanent_address: 'Mithapur busstand patna bihar', email: 'khushbookumari23074@gmail.com', contact_number: '7857023438', aadhaar_no: '681081995036', alt_phone: '9065412494', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/018', name: 'Ritik kumar', father_name: 'Surendra Kumar', dob: '2003-06-16', permanent_address: 'East Tej Pratap Nagar, Vrindavan Colony, Road No. 2, Patna - 800002, Bihar', email: 'ritikkumar7123@gmail.com', contact_number: '7004572737', aadhaar_no: '547432382905', alt_phone: '7004572737', account_no: '41535768059', ifsc_detail: 'SBIN0009003' },
  { registration_no: 'MAC/RG/019', name: 'Prachi Patel', father_name: 'Manoj Kumar', dob: '2003-05-08', permanent_address: 'Salapur Road Madhoganj Hardoi / Madan Mohan Malaviya University of Technology Kunraghat Gorakhpur', email: 'myselfprachipatel@gmail.com', contact_number: '9580527280', aadhaar_no: '888479061049', alt_phone: '9648833069', account_no: '41338059172', ifsc_detail: 'SBIN0012330' },
  { registration_no: 'MAC/RG/020', name: 'Priyanka Bairwa', father_name: 'Rajkuamar Bairwa', dob: '2003-08-15', permanent_address: 'gulab badi rajakoti school', email: 'bairwapriyanka715@gmail.com', contact_number: '7878240311', aadhaar_no: '355447187581', alt_phone: '9875739017(Sis)', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/021', name: 'Divya Gahlot', father_name: 'Rakesh Gahlot', dob: '2024-08-04', permanent_address: 'Ajmer Road Beawar', email: 'gahlotdivya81@gmail.com', contact_number: '9087627112', aadhaar_no: '785569020255', alt_phone: '7728043237(Mom)', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/022', name: 'Piyush Saini', father_name: 'virendra anudiya', dob: '2004-05-29', permanent_address: 'mali mohla,kalyani pura,ajmer', email: 'piyushsaini01@outlook.com', contact_number: '6377800585', aadhaar_no: '814693926024', alt_phone: '8209085757(FATHER)', account_no: '50100553834970', ifsc_detail: 'HDFC0006929' },
  { registration_no: 'MAC/RG/023', name: 'NEHA JAISWAL', father_name: '', dob: null, permanent_address: '', email: 'nehajaiswal694@gmail.com', contact_number: '9026328642', aadhaar_no: '', alt_phone: '', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/024', name: 'GUNGUN', father_name: 'rakesh singh', dob: '2005-10-11', permanent_address: 'near ram dev mandir panatpura', email: 'gungunrawatajmer@gmail.com', contact_number: '8233852995', aadhaar_no: '488455000000', alt_phone: '9351823525', account_no: '37215435301', ifsc_detail: 'SBIN0032367' },
  { registration_no: 'MAC/RG/025', name: 'AKSHITA', father_name: 'Jagdish Kumawat', dob: '2005-09-24', permanent_address: 'near shiv pinnacle , Vaishali nagar', email: 'akshitakumawat11@gmail.com', contact_number: '8233852995', aadhaar_no: '2235 7514 2288', alt_phone: '9079072247', account_no: '7627000000000000', ifsc_detail: 'PUNB0762700' },
  { registration_no: 'MAC/RG/026', name: 'varun', father_name: 'Jagdish Chandra Pandey', dob: '2004-03-27', permanent_address: '130, Parwana Nagar, Bareilly, U.P', email: 'varun.pandey.ps@gmail.com', contact_number: '7456 998 900', aadhaar_no: '', alt_phone: '91988 84058', account_no: '', ifsc_detail: '' },
  { registration_no: 'MAC/RG/027', name: 'Divyanshi Sen', father_name: '', dob: null, permanent_address: '', email: 'divyanshi@macenza.com', contact_number: '', aadhaar_no: '', alt_phone: '', account_no: '', ifsc_detail: '', profile_picture: '/Team/Divyanshi Sen Full Stack Developer.jpg', role: 'Full Stack Developer', department: 'Engineering' }
];

async function addEmployees() {
  console.log(`Starting to insert ${employees.length} employees...`);
  let added = 0;
  for (const emp of employees) {
    const newEmpData = {
      ...emp,
      id: 'emp_' + Date.now() + Math.floor(Math.random() * 1000), // Generate a unique ID
      role: 'Employee', // default role
      department: 'General' // default department
    };
    
    // Remove dob if it is null
    if (!newEmpData.dob) {
      delete newEmpData.dob;
    }

    const { error } = await supabase
      .from('employees')
      .insert([newEmpData]);
      
    if (error) {
      console.error(`Failed to add ${emp.name}:`, error.message);
    } else {
      console.log(`Successfully added ${emp.name}`);
      added++;
    }
  }
  console.log(`Finished adding ${added} employees.`);
}

addEmployees();

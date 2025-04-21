// export const mockEmployees = [
//     {
//       id: 'emp-1',
//       firstName: 'John',
//       lastName: 'Smith',
//       email: 'john.smith@example.com',
//       phone: '555-0101',
//       position: 'CEO',
//       department: 'Executive',
//       salary: '200000',
//       salaryType: 'annual',
//       hireDate: '2015-06-15',
//       managerId: '',
//       employmentType: 'full-time',
//       address: '123 Main St, Anytown, USA',
//       skills: ['Leadership', 'Strategy', 'Finance'],
//       hasBonus: true,
//       bonusAmount: '25000',
//       bonusDescription: 'Signing bonus'
//     },
//     {
//       id: 'emp-2',
//       firstName: 'Sarah',
//       lastName: 'Johnson',
//       email: 'sarah.j@example.com',
//       phone: '555-0102',
//       position: 'HR Manager',
//       department: 'Human Resources',
//       salary: '95000',
//       salaryType: 'annual',
//       hireDate: '2018-03-22',
//       managerId: 'emp-1',
//       employmentType: 'full-time',
//       address: '456 Oak Ave, Somewhere, USA',
//       skills: ['Recruiting', 'Employee Relations', 'Benefits']
//     },
//     {
//       id: 'emp-3',
//       firstName: 'Michael',
//       lastName: 'Williams',
//       email: 'michael.w@example.com',
//       phone: '555-0103',
//       position: 'Sales Manager',
//       department: 'Sales',
//       salary: '110000',
//       salaryType: 'annual',
//       hireDate: '2017-11-05',
//       managerId: 'emp-1',
//       employmentType: 'full-time',
//       address: '789 Pine Rd, Nowhere, USA',
//       skills: ['Sales', 'Negotiation', 'CRM']
//     },
//     {
//       id: 'emp-4',
//       firstName: 'Emily',
//       lastName: 'Brown',
//       email: 'emily.b@example.com',
//       phone: '555-0104',
//       position: 'Marketing Specialist',
//       department: 'Marketing',
//       salary: '75000',
//       salaryType: 'annual',
//       hireDate: '2019-08-14',
//       managerId: 'emp-1',
//       employmentType: 'full-time',
//       address: '321 Elm Blvd, Anywhere, USA',
//       skills: ['Digital Marketing', 'SEO', 'Content Creation']
//     },
//     {
//       id: 'emp-5',
//       firstName: 'David',
//       lastName: 'Jones',
//       email: 'david.j@example.com',
//       phone: '555-0105',
//       position: 'Sales Representative',
//       department: 'Sales',
//       salary: '65000',
//       salaryType: 'annual',
//       hireDate: '2020-02-18',
//       managerId: 'emp-3',
//       employmentType: 'full-time',
//       address: '654 Cedar Ln, Somewhere, USA',
//       skills: ['Customer Service', 'Product Knowledge', 'Cold Calling']
//     },
//     {
//       id: 'emp-6',
//       firstName: 'Jessica',
//       lastName: 'Garcia',
//       email: 'jessica.g@example.com',
//       phone: '555-0106',
//       position: 'HR Assistant',
//       department: 'Human Resources',
//       salary: '50000',
//       salaryType: 'annual',
//       hireDate: '2021-05-30',
//       managerId: 'emp-2',
//       employmentType: 'full-time',
//       address: '987 Maple Dr, Nowhere, USA',
//       skills: ['Onboarding', 'Administration', 'Scheduling']
//     },
//     {
//       id: 'emp-7',
//       firstName: 'Robert',
//       lastName: 'Miller',
//       email: 'robert.m@example.com',
//       phone: '555-0107',
//       position: 'IT Manager',
//       department: 'IT',
//       salary: '120000',
//       salaryType: 'annual',
//       hireDate: '2016-09-12',
//       managerId: 'emp-1',
//       employmentType: 'full-time',
//       address: '135 Walnut St, Anytown, USA',
//       skills: ['Networking', 'Security', 'System Administration']
//     },
//     {
//       id: 'emp-8',
//       firstName: 'Jennifer',
//       lastName: 'Davis',
//       email: 'jennifer.d@example.com',
//       phone: '555-0108',
//       position: 'Software Engineer',
//       department: 'IT',
//       salary: '105000',
//       salaryType: 'annual',
//       hireDate: '2019-04-25',
//       managerId: 'emp-7',
//       employmentType: 'full-time',
//       address: '246 Birch Ave, Anywhere, USA',
//       skills: ['JavaScript', 'React', 'Node.js']
//     },
//     {
//       id: 'emp-9',
//       firstName: 'Linda',
//       lastName: 'Clark',
//       email: 'linda.c@example.com',
//       phone: '555-0109',
//       position: 'CTO',
//       department: 'Technology',
//       salary: '190000',
//       salaryType: 'annual',
//       hireDate: '2016-02-01',
//       managerId: 'emp-1',
//       employmentType: 'full-time',
//       address: '159 Oak Circle, Tech City, USA',
//       skills: ['Tech Strategy', 'Architecture', 'Leadership']
//     },
//     {
//       id: 'emp-10',
//       firstName: 'Brian',
//       lastName: 'Lee',
//       email: 'brian.l@example.com',
//       phone: '555-0110',
//       position: 'CFO',
//       department: 'Finance',
//       salary: '185000',
//       salaryType: 'annual',
//       hireDate: '2016-05-11',
//       managerId: 'emp-1',
//       employmentType: 'full-time',
//       address: '753 Willow Dr, FinTown, USA',
//       skills: ['Accounting', 'Forecasting', 'Budgeting']
//     },
//     {
//       id: 'emp-11',
//       firstName: 'Sophia',
//       lastName: 'Taylor',
//       email: 'sophia.t@example.com',
//       phone: '555-0111',
//       position: 'Director',
//       department: 'Marketing',
//       salary: '140000',
//       salaryType: 'annual',
//       hireDate: '2017-07-21',
//       managerId: 'emp-1',
//       employmentType: 'full-time',
//       address: '864 Spruce Blvd, Anywhere, USA',
//       skills: ['Brand Management', 'Leadership', 'Analytics']
//     },
//     {
//       id: 'emp-12',
//       firstName: 'Kevin',
//       lastName: 'White',
//       email: 'kevin.w@example.com',
//       phone: '555-0112',
//       position: 'Product Manager',
//       department: 'Product',
//       salary: '125000',
//       salaryType: 'annual',
//       hireDate: '2019-09-18',
//       managerId: 'emp-9',
//       employmentType: 'full-time',
//       address: '398 Aspen St, Productville, USA',
//       skills: ['Agile', 'Scrum', 'Stakeholder Communication']
//     },
//     {
//       id: 'emp-13',
//       firstName: 'Anna',
//       lastName: 'Martinez',
//       email: 'anna.m@example.com',
//       phone: '555-0113',
//       position: 'Senior Software Engineer',
//       department: 'Engineering',
//       salary: '115000',
//       salaryType: 'annual',
//       hireDate: '2018-12-05',
//       managerId: 'emp-9',
//       employmentType: 'full-time',
//       address: '982 Cypress Ln, Devtown, USA',
//       skills: ['Java', 'System Design', 'Microservices']
//     },
//     {
//       id: 'emp-14',
//       firstName: 'Tom',
//       lastName: 'Anderson',
//       email: 'tom.a@example.com',
//       phone: '555-0114',
//       position: 'UX Designer',
//       department: 'Design',
//       salary: '90000',
//       salaryType: 'annual',
//       hireDate: '2021-06-22',
//       managerId: 'emp-12',
//       employmentType: 'full-time',
//       address: '333 Elm St, Designtown, USA',
//       skills: ['Wireframing', 'User Research', 'Figma']
//     }
//   ];
  
//   export const mockTree = [{
//     id: 'emp-1',
//     name: 'John Smith',
//     position: 'CEO',
//     children: [
//       {
//         id: 'emp-2',
//         name: 'Sarah Johnson',
//         position: 'HR Manager',
//         children: [
//           {
//             id: 'emp-6',
//             name: 'Jessica Garcia',
//             position: 'HR Assistant',
//             children: []
//           }
//         ]
//       },
//       {
//         id: 'emp-3',
//         name: 'Michael Williams',
//         position: 'Sales Manager',
//         children: [
//           {
//             id: 'emp-5',
//             name: 'David Jones',
//             position: 'Sales Representative',
//             children: []
//           }
//         ]
//       },
//       {
//         id: 'emp-7',
//         name: 'Robert Miller',
//         position: 'IT Manager',
//         children: [
//           {
//             id: 'emp-8',
//             name: 'Jennifer Davis',
//             position: 'Software Engineer',
//             children: []
//           }
//         ]
//       },
//       {
//         id: 'emp-4',
//         name: 'Emily Brown',
//         position: 'Marketing Specialist',
//         children: []
//       },
//       {
//         id: 'emp-9',
//         name: 'Linda Clark',
//         position: 'CTO',
//         children: [
//           {
//             id: 'emp-12',
//             name: 'Kevin White',
//             position: 'Product Manager',
//             children: [
//               {
//                 id: 'emp-14',
//                 name: 'Tom Anderson',
//                 position: 'UX Designer',
//                 children: []
//               }
//             ]
//           },
//           {
//             id: 'emp-13',
//             name: 'Anna Martinez',
//             position: 'Senior Software Engineer',
//             children: []
//           }
//         ]
//       },
//       {
//         id: 'emp-10',
//         name: 'Brian Lee',
//         position: 'CFO',
//         children: []
//       },
//       {
//         id: 'emp-11',
//         name: 'Sophia Taylor',
//         position: 'Director',
//         children: []
//       }
//     ]
//   }];




export const mockEmployees = [
  {
    id: 'emp-1',
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'aarav.sharma@example.com',
    phone: '555-0101',
    position: 'CEO',
    department: 'Executive',
    salary: '200000',
    salaryType: 'annual',
    hireDate: '2015-06-15',
    managerId: '',
    employmentType: 'full-time',
    address: '123 Main St, Mumbai, India',
    skills: ['Leadership', 'Strategy', 'Finance'],
    hasBonus: true,
    bonusAmount: '25000',
    bonusDescription: 'Signing bonus'
  },
  {
    id: 'emp-2',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@example.com',
    phone: '555-0102',
    position: 'HR Manager',
    department: 'Human Resources',
    salary: '95000',
    salaryType: 'annual',
    hireDate: '2018-03-22',
    managerId: 'emp-1',
    employmentType: 'full-time',
    address: '456 Oak Ave, Bangalore, India',
    skills: ['Recruiting', 'Employee Relations', 'Benefits']
  },
  {
    id: 'emp-3',
    firstName: 'Rahul',
    lastName: 'Singh',
    email: 'rahul.singh@example.com',
    phone: '555-0103',
    position: 'Sales Manager',
    department: 'Sales',
    salary: '110000',
    salaryType: 'annual',
    hireDate: '2017-11-05',
    managerId: 'emp-1',
    employmentType: 'full-time',
    address: '789 Pine Rd, Delhi, India',
    skills: ['Sales', 'Negotiation', 'CRM']
  },
  {
    id: 'emp-4',
    firstName: 'Ananya',
    lastName: 'Gupta',
    email: 'ananya.gupta@example.com',
    phone: '555-0104',
    position: 'Marketing Specialist',
    department: 'Marketing',
    salary: '75000',
    salaryType: 'annual',
    hireDate: '2019-08-14',
    managerId: 'emp-1',
    employmentType: 'full-time',
    address: '321 Elm Blvd, Hyderabad, India',
    skills: ['Digital Marketing', 'SEO', 'Content Creation']
  },
  {
    id: 'emp-5',
    firstName: 'Vikram',
    lastName: 'Joshi',
    email: 'vikram.joshi@example.com',
    phone: '555-0105',
    position: 'Sales Representative',
    department: 'Sales',
    salary: '65000',
    salaryType: 'annual',
    hireDate: '2020-02-18',
    managerId: 'emp-3',
    employmentType: 'full-time',
    address: '654 Cedar Ln, Pune, India',
    skills: ['Customer Service', 'Product Knowledge', 'Cold Calling']
  },
  {
    id: 'emp-6',
    firstName: 'Neha',
    lastName: 'Reddy',
    email: 'neha.reddy@example.com',
    phone: '555-0106',
    position: 'HR Assistant',
    department: 'Human Resources',
    salary: '50000',
    salaryType: 'annual',
    hireDate: '2021-05-30',
    managerId: 'emp-2',
    employmentType: 'full-time',
    address: '987 Maple Dr, Chennai, India',
    skills: ['Onboarding', 'Administration', 'Scheduling']
  },
  {
    id: 'emp-7',
    firstName: 'Arjun',
    lastName: 'Kumar',
    email: 'arjun.kumar@example.com',
    phone: '555-0107',
    position: 'IT Manager',
    department: 'IT',
    salary: '120000',
    salaryType: 'annual',
    hireDate: '2016-09-12',
    managerId: 'emp-1',
    employmentType: 'full-time',
    address: '135 Walnut St, Gurgaon, India',
    skills: ['Networking', 'Security', 'System Administration']
  },
  {
    id: 'emp-8',
    firstName: 'Divya',
    lastName: 'Iyer',
    email: 'divya.iyer@example.com',
    phone: '555-0108',
    position: 'Software Engineer',
    department: 'IT',
    salary: '105000',
    salaryType: 'annual',
    hireDate: '2019-04-25',
    managerId: 'emp-7',
    employmentType: 'full-time',
    address: '246 Birch Ave, Noida, India',
    skills: ['JavaScript', 'React', 'Node.js']
  },
  {
    id: 'emp-9',
    firstName: 'Aditi',
    lastName: 'Desai',
    email: 'aditi.desai@example.com',
    phone: '555-0109',
    position: 'CTO',
    department: 'Technology',
    salary: '190000',
    salaryType: 'annual',
    hireDate: '2016-02-01',
    managerId: 'emp-1',
    employmentType: 'full-time',
    address: '159 Oak Circle, Bengaluru, India',
    skills: ['Tech Strategy', 'Architecture', 'Leadership']
  },
  {
    id: 'emp-10',
    firstName: 'Rohan',
    lastName: 'Mehta',
    email: 'rohan.mehta@example.com',
    phone: '555-0110',
    position: 'CFO',
    department: 'Finance',
    salary: '185000',
    salaryType: 'annual',
    hireDate: '2016-05-11',
    managerId: 'emp-1',
    employmentType: 'full-time',
    address: '753 Willow Dr, Mumbai, India',
    skills: ['Accounting', 'Forecasting', 'Budgeting']
  },
  {
    id: 'emp-11',
    firstName: 'Ishaan',
    lastName: 'Choudhary',
    email: 'ishaan.choudhary@example.com',
    phone: '555-0111',
    position: 'Director',
    department: 'Marketing',
    salary: '140000',
    salaryType: 'annual',
    hireDate: '2017-07-21',
    managerId: 'emp-1',
    employmentType: 'full-time',
    address: '864 Spruce Blvd, Kolkata, India',
    skills: ['Brand Management', 'Leadership', 'Analytics']
  },
  {
    id: 'emp-12',
    firstName: 'Kavya',
    lastName: 'Nair',
    email: 'kavya.nair@example.com',
    phone: '555-0112',
    position: 'Product Manager',
    department: 'Product',
    salary: '125000',
    salaryType: 'annual',
    hireDate: '2019-09-18',
    managerId: 'emp-9',
    employmentType: 'full-time',
    address: '398 Aspen St, Hyderabad, India',
    skills: ['Agile', 'Scrum', 'Stakeholder Communication']
  },
  {
    id: 'emp-13',
    firstName: 'Kabir',
    lastName: 'Malhotra',
    email: 'kabir.malhotra@example.com',
    phone: '555-0113',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    salary: '115000',
    salaryType: 'annual',
    hireDate: '2018-12-05',
    managerId: 'emp-9',
    employmentType: 'full-time',
    address: '982 Cypress Ln, Pune, India',
    skills: ['Java', 'System Design', 'Microservices']
  },
  {
    id: 'emp-14',
    firstName: 'Anika',
    lastName: 'Saxena',
    email: 'anika.saxena@example.com',
    phone: '555-0114',
    position: 'UX Designer',
    department: 'Design',
    salary: '90000',
    salaryType: 'annual',
    hireDate: '2021-06-22',
    managerId: 'emp-12',
    employmentType: 'full-time',
    address: '333 Elm St, Ahmedabad, India',
    skills: ['Wireframing', 'User Research', 'Figma']
  }
];

export const mockTree = [{
  id: 'emp-1',
  name: 'Aarav Sharma',
  position: 'CEO',
  children: [
    {
      id: 'emp-2',
      name: 'Priya Patel',
      position: 'HR Manager',
      children: [
        {
          id: 'emp-6',
          name: 'Neha Reddy',
          position: 'HR Assistant',
          children: []
        }
      ]
    },
    {
      id: 'emp-3',
      name: 'Rahul Singh',
      position: 'Sales Manager',
      children: [
        {
          id: 'emp-5',
          name: 'Vikram Joshi',
          position: 'Sales Representative',
          children: []
        }
      ]
    },
    {
      id: 'emp-7',
      name: 'Arjun Kumar',
      position: 'IT Manager',
      children: [
        {
          id: 'emp-8',
          name: 'Divya Iyer',
          position: 'Software Engineer',
          children: []
        }
      ]
    },
    {
      id: 'emp-4',
      name: 'Ananya Gupta',
      position: 'Marketing Specialist',
      children: []
    },
    {
      id: 'emp-9',
      name: 'Aditi Desai',
      position: 'CTO',
      children: [
        {
          id: 'emp-12',
          name: 'Kavya Nair',
          position: 'Product Manager',
          children: [
            {
              id: 'emp-14',
              name: 'Anika Saxena',
              position: 'UX Designer',
              children: []
            }
          ]
        },
        {
          id: 'emp-13',
          name: 'Kabir Malhotra',
          position: 'Senior Software Engineer',
          children: []
        }
      ]
    },
    {
      id: 'emp-10',
      name: 'Rohan Mehta',
      position: 'CFO',
      children: []
    },
    {
      id: 'emp-11',
      name: 'Ishaan Choudhary',
      position: 'Director',
      children: []
    }
  ]
}];
export const mockEmployees = [
    {
      id: 'emp-1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '555-0101',
      position: 'CEO',
      department: 'Executive',
      salary: '200000',
      salaryType: 'annual',
      hireDate: '2015-06-15',
      managerId: '',
      employmentType: 'full-time',
      address: '123 Main St, Anytown, USA',
      skills: ['Leadership', 'Strategy', 'Finance'],
      hasBonus: true,
      bonusAmount: '25000',
      bonusDescription: 'Signing bonus'
    },
    {
      id: 'emp-2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@example.com',
      phone: '555-0102',
      position: 'HR Manager',
      department: 'Human Resources',
      salary: '95000',
      salaryType: 'annual',
      hireDate: '2018-03-22',
      managerId: 'emp-1',
      employmentType: 'full-time',
      address: '456 Oak Ave, Somewhere, USA',
      skills: ['Recruiting', 'Employee Relations', 'Benefits']
    },
    {
      id: 'emp-3',
      firstName: 'Michael',
      lastName: 'Williams',
      email: 'michael.w@example.com',
      phone: '555-0103',
      position: 'Sales Manager',
      department: 'Sales',
      salary: '110000',
      salaryType: 'annual',
      hireDate: '2017-11-05',
      managerId: 'emp-1',
      employmentType: 'full-time',
      address: '789 Pine Rd, Nowhere, USA',
      skills: ['Sales', 'Negotiation', 'CRM']
    },
    {
      id: 'emp-4',
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.b@example.com',
      phone: '555-0104',
      position: 'Marketing Specialist',
      department: 'Marketing',
      salary: '75000',
      salaryType: 'annual',
      hireDate: '2019-08-14',
      managerId: 'emp-1',
      employmentType: 'full-time',
      address: '321 Elm Blvd, Anywhere, USA',
      skills: ['Digital Marketing', 'SEO', 'Content Creation']
    },
    {
      id: 'emp-5',
      firstName: 'David',
      lastName: 'Jones',
      email: 'david.j@example.com',
      phone: '555-0105',
      position: 'Sales Representative',
      department: 'Sales',
      salary: '65000',
      salaryType: 'annual',
      hireDate: '2020-02-18',
      managerId: 'emp-3',
      employmentType: 'full-time',
      address: '654 Cedar Ln, Somewhere, USA',
      skills: ['Customer Service', 'Product Knowledge', 'Cold Calling']
    },
    {
      id: 'emp-6',
      firstName: 'Jessica',
      lastName: 'Garcia',
      email: 'jessica.g@example.com',
      phone: '555-0106',
      position: 'HR Assistant',
      department: 'Human Resources',
      salary: '50000',
      salaryType: 'annual',
      hireDate: '2021-05-30',
      managerId: 'emp-2',
      employmentType: 'full-time',
      address: '987 Maple Dr, Nowhere, USA',
      skills: ['Onboarding', 'Administration', 'Scheduling']
    },
    {
      id: 'emp-7',
      firstName: 'Robert',
      lastName: 'Miller',
      email: 'robert.m@example.com',
      phone: '555-0107',
      position: 'IT Manager',
      department: 'IT',
      salary: '120000',
      salaryType: 'annual',
      hireDate: '2016-09-12',
      managerId: 'emp-1',
      employmentType: 'full-time',
      address: '135 Walnut St, Anytown, USA',
      skills: ['Networking', 'Security', 'System Administration']
    },
    {
      id: 'emp-8',
      firstName: 'Jennifer',
      lastName: 'Davis',
      email: 'jennifer.d@example.com',
      phone: '555-0108',
      position: 'Software Engineer',
      department: 'IT',
      salary: '105000',
      salaryType: 'annual',
      hireDate: '2019-04-25',
      managerId: 'emp-7',
      employmentType: 'full-time',
      address: '246 Birch Ave, Anywhere, USA',
      skills: ['JavaScript', 'React', 'Node.js']
    }
  ];
  
  export const mockTree = [
    {
      id: 'emp-1',
      name: 'John Smith',
      position: 'CEO',
      children: [
        {
          id: 'emp-2',
          name: 'Sarah Johnson',
          position: 'HR Manager',
          children: [
            {
              id: 'emp-6',
              name: 'Jessica Garcia',
              position: 'HR Assistant',
              children: []
            }
          ]
        },
        {
          id: 'emp-3',
          name: 'Michael Williams',
          position: 'Sales Manager',
          children: [
            {
              id: 'emp-5',
              name: 'David Jones',
              position: 'Sales Representative',
              children: []
            }
          ]
        },
        {
          id: 'emp-7',
          name: 'Robert Miller',
          position: 'IT Manager',
          children: [
            {
              id: 'emp-8',
              name: 'Jennifer Davis',
              position: 'Software Engineer',
              children: []
            }
          ]
        },
        {
          id: 'emp-4',
          name: 'Emily Brown',
          position: 'Marketing Specialist',
          children: []
        }
      ]
    }
  ];
// src/data/studentData.js
export const studentsData = [
    {
      id: "1",
      name: "Sumit Chandora",
      email: "chandorasumit1245@gmail.com",
      class: "10A",
      rollNumber: "001",
      attendance: [
        { date: "2024-01-15", status: "present", subject: "Mathematics" },
        { date: "2024-01-15", status: "present", subject: "Physics" },
        { date: "2024-01-16", status: "absent", subject: "Mathematics" },
        { date: "2024-01-16", status: "present", subject: "Chemistry" },
        { date: "2024-01-17", status: "present", subject: "Mathematics" },
      ],
      marks: [
        { subject: "Mathematics", marks: 85, totalMarks: 100 },
        { subject: "Physics", marks: 78, totalMarks: 100 },
        { subject: "Chemistry", marks: 92, totalMarks: 100 },
      ],
      assignments: [
        { id: "a1", title: "Algebra Problems", subject: "Mathematics", status: "submitted" },
        { id: "a2", title: "Physics Lab Report", subject: "Physics", status: "submitted" },
        { id: "a3", title: "Chemical Reactions Essay", subject: "Chemistry", status: "pending" },
      ],
    },
    {
      id: "2",
      name: "Anil Sharma",
      email: "sharmaAnil32@gmail.com",
      class: "10A",
      rollNumber: "002",
      attendance: [ { date: "2024-01-17", status: "present", subject: "Mathematics" } ],
      marks: [ { subject: "Mathematics", marks: 72, totalMarks: 100 } ],
      assignments: [ { id: "b1", title: "Algebra Problems", subject: "Mathematics", status: "submitted" } ],
    },
    {
      id: "3",
      name: "Rohit Agarwal",
      email: "rohit922@gmail.com",
      class: "10B",
      rollNumber: "003",
      attendance: [ { date: "2024-01-17", status: "present", subject: "Mathematics" } ],
      marks: [ { subject: "Mathematics", marks: 95, totalMarks: 100 } ],
      assignments: [ { id: "c1", title: "Algebra Problems", subject: "Mathematics", status: "submitted" } ],
    },
    {
      id: "4",
      name: "Janvi Mathur",
      email: "janvimathur331@gmail.com",
      class: "10A",
      rollNumber: "004",
      attendance: [ { date: "2024-01-17", status: "late", subject: "Mathematics" } ],
      marks: [ { subject: "Mathematics", marks: 68, totalMarks: 100 } ],
      assignments: [ { id: "d1", title: "Algebra Problems", subject: "Mathematics", status: "late" } ],
    },
    {
      id: "5",
      name: "Prachi Sharma",
      email: "prachi142@gmail.com",
      class: "10B",
      rollNumber: "005",
      attendance: [ { date: "2024-01-17", status: "present", subject: "Mathematics" } ],
      marks: [ { subject: "Mathematics", marks: 88, totalMarks: 100 } ],
      assignments: [ { id: "e1", title: "Algebra Problems", subject: "Mathematics", status: "submitted" } ],
    },
  ];
  
  export const initialAnnouncements = [
    {
      id: "1",
      title: "Mid-term Exam Schedule",
      message: "Mid-term examinations will begin from January 25th. Please check your individual schedules.",
      date: "2024-01-18",
      priority: "high",
      recipients: "all",
    },
    {
      id: "2",
      title: "Science Fair Registration",
      message: "Registration for the annual science fair is now open. Deadline: January 30th.",
      date: "2024-01-17",
      priority: "medium",
      recipients: "10A, 10B",
    }
  ];
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { name, cohort, course, status, date_joined, last_login } = req.body;
    if (!name || !cohort || !course) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const student = await prisma.student.create({
      data: {
        name,
        cohort,
        course,
        last_login: last_login ? new Date(last_login) : new Date(),
        date_joined: date_joined ? new Date(date_joined) : new Date(),
        status: status === "true" ? true : false,
      },
    });
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id },
    });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, cohort, course, status, last_login, date_joined } = req.body;
  try {
    const student = await prisma.student.update({
      where: { id },
      data: {
        name,
        cohort,
        course,
        status: status === "true" ? true : false,
        last_login: last_login ? new Date(last_login) : new Date(),
        date_joined: date_joined ? new Date(date_joined) : new Date(),
      },
    });
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Student not found" });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Student not found" });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};

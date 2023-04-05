const Student = require('../db/model/student');
const Category = require('../db/model/category');

exports.getStudent = async (req, res) => {
    let filter = {}
    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(',')
        }
    } else {
        console.log('no cat')
    }
    const students = await Student.find(filter).populate('category');
    res.send(students);

}
exports.getStudentByCatergory = async (req, res) => {
    let filter = {}
    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(',')
        }
        const students = await Student.find(filter).populate('category');
        res.send(students);
    } else {
        console.log('no cat')
    }

}

exports.postStudent = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(500).json({
                error: 'invalid category'
            })

        }
        const {
            studentId
        } = req.body;
        const {
            name
        } = req.body;
        const {
            dob
        } = req.body;
        const {
            course
        } = req.body;
        const {
            duration
        } = req.body;
        const {
            passingyear
        } = req.body;

        const image = 'http://localhost:3000/pics/' + req.file.filename;

        const student = new Student({
            studentId,
            name,
            category: req.body.category,
            dob,
            course,
            passingyear,
            duration,
            image
        })

        const studentData = await student.save();
        res.status(200).json(studentData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
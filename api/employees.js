const express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const employeesRouter = express.Router();

employeesRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM Employee WHERE is_current_employee = 1`, (err, rows) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({employees: rows})
        }
    })
})

employeesRouter.post('/', (req, res, next) => {
    const name = req.body.employee.name;
    const position = req.body.employee.position;
    const wage = req.body.employee.wage;
    const sql = `INSERT INTO Employee (name, position, wage)
    VALUES ($name, $position, $wage)`;
    const values = {
        $name: name,
        $position: position,
        $wage: wage
    };

    if (!name || !position || !wage) {
        return res.sendStatus(400);
    }

    db.run(sql, values, function(err) {
        if (err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Employee where id = ${this.lastID}`, (err, row) => {
                if (err) {
                    next(err);
                } else {
                    res.status(201).json({employee: row});
                }
            });
        }
    })
})

module.exports = employeesRouter;
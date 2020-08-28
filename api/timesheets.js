const express = require('express');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const timesheetsRouter = express.Router({mergeParams: true});

// Params

// /api/timesheets
timesheetsRouter.get('/', (req, res, next) => {
    const sql = `SELECT * FROM Timesheet WHERE employee_id = $employeeId`;
    const values = {$employeeId: req.params.employeeId};

    db.all(sql, values, (err, rows) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({timesheets: rows});
        }
    })
})

module.exports = timesheetsRouter;
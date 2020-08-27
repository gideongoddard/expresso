const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    `Server is listening on PORT: ${PORT}.\nCtrl + C to cancel.`;
})

module.exports = app;
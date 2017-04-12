var pg = require('pg');
var conString = "postgres://localhost:5432/UDPT_PT1";

var client = new pg.Client(conString);
client.connect();


var query = client.query("SELECT * FROM NguoiDung");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    console.log(JSON.stringify(result.rows, null, "    "));
    client.end();
});

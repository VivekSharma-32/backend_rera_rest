const dbConfig = require("../config/dbconfig");

// const user = async (req, res) => {
//   try {
//     const result = await dbConfig.query("SELECT * FROM user_login limit 10");
//     console.log(result.rows);
//   } catch (err) {
//     console.error("Error executing query", err.stack);
//     res.status(500).json({ error: "Database query failed" });
//   }
// };

const getAllProjects = async (req, res) => {
  try {
    const data = await dbConfig.query(
      "SELECT tbl_completion_status.temp_project_id, tbl_completion_status.applicant_type, project_status_master.status_desc, project_parta.fname,project_parta.phone_mob, project_parta.email FROM tbl_completion_status INNER JOIN project_status_master ON tbl_completion_status.status_code = project_status_master.status_code INNER JOIN project_parta ON tbl_completion_status.temp_project_id = project_parta.temp_project_id"
    );
    const result = data.rows;
    return res.status(200).send({
      success: true,
      message: "Data fetched successfully!",
      count: result.length,
      projects: result,
    });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({
      success: false,
      error: "Database query failed",
    });
  }
};

const getSingleProject = async (req, res) => {
  try {
    let { temp_project_id } = req.body; // Parse as integer with radix 10
    // temp_project_id = parseInt(temp_project_id);
    const query =
      "SELECT * FROM tbl_completion_status WHERE temp_project_id = $1";
    const values = [temp_project_id];

    const data = await dbConfig.query(query, values);
    const result = data.rows;

    if (result.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No data found!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Data fetched successfully!",
      data: result[0], // Return single record
    });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Database query failed" });
  }
};

const getAllProjectsBySearch = async (req, res) => {
  try {
    const { search } = req.query; // Get the query parameter from the request
    let sqlQuery =
      "SELECT tbl_completion_status.temp_project_id, tbl_completion_status.applicant_type, project_status_master.status_desc, project_parta.fname, project_parta.phone_mob, project_parta.email " +
      "FROM tbl_completion_status " +
      "INNER JOIN project_status_master ON tbl_completion_status.status_code = project_status_master.status_code " +
      "INNER JOIN project_parta ON tbl_completion_status.temp_project_id = project_parta.temp_project_id";

    // Add a WHERE clause if a query parameter is provided
    if (search) {
      sqlQuery +=
        " WHERE LOWER(project_parta.fname) LIKE $1 OR " +
        "LOWER(project_parta.email) LIKE $1 OR " +
        "LOWER(project_status_master.status_desc) LIKE $1 OR " +
        "CAST(project_parta.phone_mob AS TEXT) LIKE $1";
    }

    const values = search ? [`%${search.toLowerCase()}%`] : []; // Use parameterized queries to prevent SQL injection

    const data = await dbConfig.query(sqlQuery, values);
    const result = data.rows;

    return res.status(200).send({
      success: true,
      message: "Data fetched successfully!",
      count: result.length,
      projects: result,
    });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({
      success: false,
      error: "Database query failed",
    });
  }
};

module.exports = { getAllProjects, getSingleProject, getAllProjectsBySearch };

const dbConfig = require("../config/dbconfig");

const getAllAgents = async (req, res) => {
  try {
    const data = await dbConfig.query(
      "SELECT tbl_agent_details.agent_name, tbl_agent_details.email, tbl_agent_details.phone_number, project_status_master.status_desc FROM agent_completion_status INNER JOIN project_status_master ON agent_completion_status.status_code = project_status_master.status_code INNER JOIN tbl_agent_details ON agent_completion_status.temp_agent_id = tbl_agent_details.temp_agent_id"
    );
    const result = data.rows;
    return res.status(200).send({
      success: true,
      message: "Agent Details Fetched!!!",
      count: result.length,
      agents: result,
    });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({
      success: false,
      error: "Database query failed",
    });
  }
};

module.exports = { getAllAgents };

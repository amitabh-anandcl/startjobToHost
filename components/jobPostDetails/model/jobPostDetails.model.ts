import connection from "../../../config/dbConfig";

export class JobPostDetailsModel {
  public async addUpdateJobPostDetails(data: any) {
    try {
      var sql =
        "CALL sp_addUpdateJobPostDetails(?,?,?,?,?,?,?,?,?,?,?,?,@o_status,@o_maxId);select @o_status,@o_maxId";

      return new Promise((resolve, reject) => {
        //console.log;
        connection.query(
          sql,
          [
            data.JOBID,
            data.EMPLOYERID,
            data.JOBTITLE,
            data.LOCATION,
            data.JOBTYPEID,
            data.EXPERIENCERANGE,
            data.JOBDESCRIPTION,
            data.CTCBUDGET,
            data.JOBPOSITIONS,
            data.INDUSTRY,
            data.FUNCTION,
            data.JOBPOSTDATE,
          ],
          (err: any, result: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  }
  public async getJobPostDetails(data: any) {
    try {
      var sql = "CALL sp_getJobPostDetails(?,?)";

      return new Promise((resolve, reject) => {
        connection.query(
          sql,
          [data.JOBID, data.EMPID],
          (err: any, result: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (err) {
      throw err;
    }
  }

  public async getAllJobPostDetailsList() {
    try {
      var sql = "CALL sp_getAllJobPostDetailsList()";

      return new Promise((resolve, reject) => {
        connection.query(sql, [], (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }

  public async getJobTypesDetailsList() {
    try {
      var sql = "CALL sp_getJobTypesDetailsList()";

      return new Promise((resolve, reject) => {
        connection.query(sql, [], (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }
}

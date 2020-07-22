import connection from "../../../config/dbConfig";

export class EmployerDetailsModel {
  public async getEmployerDetailsByEmployerId(data: any) {
    try {
      var sql = "CALL sp_getEmployerDetailsByEmployerId(?)";

      return new Promise((resolve, reject) => {
        connection.query(sql, [data.EMPID], (err: any, result: any) => {
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

  public async getAllEmployerDetailsList() {
    try {
      var sql = "CALL sp_getAllEmployerDetailsList()";

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

  public async registerEmployer(data: any) {
    try {
      var sql = "CALL sp_registerEmployer(?,?,?,?,?,?,?,?,?,?,?,@s); select @s";

      return new Promise((resolve, reject) => {
        connection.query(
          sql,
          [
            data.EMPID,
            data.EMPLOYERMAILID,
            data.EMPLOYERPASSWORD,
            data.EMPLOYERNAME,
            data.EMPLOYERURL,
            data.EMPLOYERADDRESS,
            data.EMPLOYERLOGOFILE,
            data.EMPLOYERDESCRIPTION,
            data.EMPLOYERSTRENGTH,
            data.EMPLOYERYEARINC,
            data.EMPLOYERFUNDS,
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

  public async employerLogin(data: any) {
    try {
      var sql = "CALL sp_employerLogin(?,?,@o_status); select @o_status";

      return new Promise((resolve, reject) => {
        connection.query(
          sql,
          [data.EMPLOYERMAILID, data.EMPLOYERPASSWORD],

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
}
